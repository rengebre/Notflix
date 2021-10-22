const express = require('express');
const router  = express.Router();
const helperFunctions = require("./helper_functions");
const axios = require('axios').default;
const { populateTableWithUnogsData } = require('./db_populate_unogs');
require("dotenv").config();

module.exports = (db) => {

  // /sessions/ -> POST: Form data after creating a session
  router.post('/', (req, res) => {
    //pull in form data from webpage and populate variables we will need
    const reqBody = req.body;
    // console.log(reqBody);

    let sessionSize = Number(reqBody['num-options']);
    const participants = Number(reqBody['num-participants']);
    const votesNeeded = sessionSize * participants;
    const code = helperFunctions.generateRandomString();
    const selectedMovies = reqBody['movie-names'];

    // Generate random orderBy to make movie list randomization better
    const orderByOptions = [
      'date',
      'dateDesc',
      'rating',
      'title',
      'runtime',
      'filmyear',
      'filmyearDesc'
    ]

    let randOptionsIndex = Math.floor((Math.random() * orderByOptions.length));

    const orderBy = orderByOptions[randOptionsIndex];


    // Declare default search options for unogs api
    let options = {
      method: 'GET',
      url: 'https://unogsng.p.rapidapi.com/search',
      params: {
        type: 'movie',
        start_year: '1972',
        orderby: orderBy,
        audiosubtitle_andor: 'and',
        limit: '1',
        subtitle: 'english',
        countrylist: '33',
        audio: 'english',
        country_andorunique: 'or',
        offset: '0',
        end_year: String(new Date().getFullYear())
      },
      headers: {
        'x-rapidapi-host': process.env.API_HOST_UNOGSNG,
        'x-rapidapi-key': process.env.API_KEY_UNOGSNG
      }
    };

    // Get genre list from all selections, if the list exists populate
    if(reqBody.genres) {
      let genreList;
      if (Array.isArray(reqBody.genres)) {
        genreList = reqBody.genres.join(', ');
      } else {
        genreList = reqBody.genres;
      }

      options.params.genrelist = genreList;
    }

    // Call API twice, once to find the number of items in the list, then again to populate db with movies, create sessions row and create movie_sessions row

    const movieIDLookupPromiseArray = [];
    if (selectedMovies) {
      if (Array.isArray(selectedMovies)) {
        sessionSize -= selectedMovies.length;
        selectedMovies.forEach((elem) => {
          const queryParams = [
            helperFunctions.decoderToDB(elem)
          ]
          movieIDLookupPromiseArray
            .push(db.query(`SELECT id FROM movies WHERE title=$1 ORDER BY CASE WHEN imdbrating IS NULL THEN 1 ELSE 0 END, imdbrating DESC LIMIT 1;`, queryParams));
        });
      } else {
        sessionSize--;
        const queryParams = [helperFunctions.decoderToDB(selectedMovies)];
        movieIDLookupPromiseArray
            .push(db.query(`SELECT id FROM movies WHERE title=$1 ORDER BY CASE WHEN imdbrating IS NULL THEN 1 ELSE 0 END, imdbrating DESC LIMIT 1;`, queryParams));
      }
    }

    const insertRandomLocationInArray = function(array, insertArray) {
      let arrayLength = array.length;
      insertArray.forEach((elem) => {
        let randomNum = Math.floor(Math.random()*(arrayLength + 1));
        array.splice(randomNum, 0, elem);
        arrayLength = array.length;
      })

      return array;
    };

    Promise.all(movieIDLookupPromiseArray).then((movieIDPromiseReturnArray) => {

      axios.request(options).then((movie) => {
          const searchTotal = movie.data.total;

          //set the search limit to be max session size
          options.params.limit = String(sessionSize);

          //Generate random offset for the search
          options.params.offset = String(helperFunctions.generateRandomSearchOffset(searchTotal, sessionSize));

          axios.request(options).then((movieList) => {
              // console.log(response.data.results.length);
              const promiseArray = [];
              const searchListArray = movieList.data.results;

              // populate movie data into movies table in db (will not duplicate)
              populateTableWithUnogsData(searchListArray, 'movie', db, promiseArray);

              Promise.all(promiseArray).then((returnArray) => {
                  console.log('Finished movie table update');
                  returnArray = helperFunctions.insertRandomLocationInArray(returnArray, movieIDPromiseReturnArray);

                  // Create entry in sessions table
                  db
                    .query(`INSERT INTO sessions (code, votes_needed, participants, session_size) VALUES ('${code}', '${votesNeeded}', '${participants}', '${sessionSize + movieIDPromiseReturnArray.length}') RETURNING sessions.id;`)
                    .then((session_id) => {
                        const currentSession = session_id.rows[0].id;
                        returnArray.forEach((elem) => {
                            const currentMoviesId = elem.rows[0].id;
                            db
                            .query(`INSERT INTO movie_sessions(movies_id, session_id)
                              VALUES ('${currentMoviesId}', '${currentSession}');`)
                          })

                          res.json({ code });
                        })

                    }).catch((err) => {
                        console.log(err);
                      });
      }).catch(function (error) {
          console.error(error);
          res.status(500).send("something is wrong with specific search :(");
        });

      })
      .catch(function (error) {
          console.error(error);
          res.status(500).send("something is wrong with total search :(");
        });
    })
  });

  // /sessions/movies -> GET: load movies for autocomplete
  router.get('/movies', (req, res) => {
      db.query(`SELECT title FROM movies;`)
    .then(result => {
      res.json(result.rows);
    });
  });

  // /sessions/next -> GET (AJAX) get the next image
  router.get('/next', (req, res) => {
    const { count, code } = req.query;
    console.log(count, code);
    db
      .query(`
        SELECT poster, img, title
        FROM movie_sessions
        JOIN sessions ON sessions.id = session_id
        JOIN movies ON movies.id = movies_id
        WHERE sessions.code = $1
        ORDER BY movie_sessions.id
        LIMIT $2;
      `, [code, count])
      .then((images) => {
        // console.log(images.rows);
        if (!images.rows[count - 1]) {
          return res.json({});
        }
        res.json(images.rows[count - 1])
      });
  });

  router.post('/update-session-counter', (req, res) => {
    const { code, title } = req.body;
    db
      .query(`
      UPDATE sessions
      SET votes_computed = 1 + (
        SELECT votes_computed FROM sessions WHERE code=$1
        )
      WHERE code=$1
      RETURNING votes_computed;
      `, [code])
      .then((result) => {
        if (title) {
          db
          .query(`
            UPDATE movie_sessions
            SET likes = 1 + (
              SELECT likes FROM movie_sessions
              JOIN movies ON movies.id = movies_id
              JOIN sessions ON sessions.id = session_id
              WHERE title = $1 AND code = $2
              )
            WHERE movies_id = (SELECT id FROM movies WHERE title = $1)
            RETURNING likes;
            `, [title, code])
            .then((result) => {
              res.json({ message: 'clicked check'});
            })
            .catch((err) => {
              console.log("error handling update query 2:", err);
            })
        } else {
          res.json({ message: 'clicked x'})
        }
      })
      .catch((err) => {
        console.log("error handling update query 1:", err);
      })
  });

  // fetch votes_computed to check against votes_needed, to determine when the session has ended
  router.get('/:code/fetch-votes', (req, res) => {
    db
      .query(`
      SELECT votes_needed, votes_computed
      FROM sessions
      WHERE code=$1;
      `, [req.params.code])
      .then((votes) => {
        res.json(votes.rows[0]);
      })
  });

  // /sessions/:code -> GET the sessions page associated with the given code
  router.get('/:code', (req, res) => {
    db
      .query(`
        SELECT sessions.id, sessions.code, session_size, movies.poster, movies.img, movies.title
        FROM movie_sessions
        JOIN sessions ON sessions.id = session_id
        JOIN movies ON movies.id = movies_id
        WHERE sessions.code = $1
        ORDER BY movie_sessions.id
        LIMIT 1;
      `, [req.params.code])
      .then((data) => {

        //Make sure link has a correct session code
        if (data.rows.length === 0) {
          res.status(404).send("This session does not exist you fool");
          return;
        }

        templateVars = data.rows[0];
        templateVars.title = helperFunctions.decoder(templateVars.title);
        res.render("sessions", templateVars);
      })
  });

  // sessions/:code/results
  router.get("/:code/results", (req, res) => {
    const code = req.params['code'];

    db.query(`
    SELECT * FROM movie_sessions
    JOIN sessions ON sessions.id = session_id
    JOIN movies ON movies.id = movie_sessions.movies_id
    GROUP BY movie_sessions.id, sessions.id, movies.id
    HAVING sessions.code = '${code}'
    AND movie_sessions.likes = (SELECT MAX(movie_sessions.likes)
    FROM movie_sessions
    JOIN sessions ON sessions.id = movie_sessions.session_id
    WHERE sessions.code = '${code}');
    `)
    .then((result) => {
      const winnersArray = result.rows;

      // console.log("winnersArray", winnersArray)

      for (let movieObj of winnersArray) {
        movieObj.title = helperFunctions.decoder(movieObj.title)
      }

      const templateVars = { code, winnersArray }

      // console.log("----here------", templateVars)
      res.render("results", templateVars);
    })
    .catch(err =>
      console.log(err.message))

  })

  return router;
};
