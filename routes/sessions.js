const express = require('express');
const router  = express.Router();
const helperFunctions = require("./helper_functions");
module.exports = (db) => {
  router.get("/test", (req, res) => {
    res.render("sessions");
  });

  // /sessions/ -> GET (AJAX) get the next image
  router.get('/next', (req, res) => {
    db.query(`SELECT poster, img FROM movies WHERE title LIKE '%ama%';`).then((data) => {
      console.log(data.rows);
    })
  });

  // /sessions/ -> POST: Form data after creating a session
  router.post('/', (req, res) => {
    const reqBody = req.body;
    // console.log("aaaaaaaaaa", reqBody['movie-names'])


    const poolSize = Number(reqBody['num-options']);
    const participants = Number(reqBody['num-participants']);
    const votesNeeded = poolSize * participants;
    const code = helperFunctions.generateRandomString();


    let randomPick = 0;

    if (!reqBody['movie-names']) {
      randomPick = poolSize;

      db.query(`INSERT INTO sessions (code, votes_needed, participants, session_size) VALUES ('${code}', '${votesNeeded}', '${participants}', '${poolSize}') RETURNING sessions.id;`)
      .then((data) => {
       const currentSessionId = data.rows[0].id;
       return currentSessionId;
      })
      .then((sessionId) => {
        let counter = randomPick;

        while (counter) {
          counter --;

          const movieId = helperFunctions.getRandomMovieId();

          db.query(
            `INSERT INTO movie_sessions(movies_id, session_id)
            VALUES ('${movieId}', '${sessionId}');`
            );
        }
      })

    } else {
      if (Array.isArray(reqBody['movie-names'])) {
        randomPick = poolSize - reqBody['movie-names'].length;

        db.query(`INSERT INTO sessions (code, votes_needed, participants, session_size) VALUES ('${code}', '${votesNeeded}', '${participants}', '${poolSize}') RETURNING sessions.id;`)
        .then((data) => {
         const currentSessionId = data.rows[0].id;
         return currentSessionId;
        })
        .then((sessionId) => {
          let counter = randomPick;

          while (counter) {
            counter --;
            const movieId = helperFunctions.getRandomMovieId();

            db.query(
              `INSERT INTO movie_sessions(movies_id, session_id)
              VALUES ('${movieId}', '${sessionId}');`
              );
          }

          const movieTitles = reqBody['movie-names']

          for (let movie of movieTitles) {
            db.query(`SELECT id FROM movies WHERE UPPER(title) like UPPER($1)`, [movie])
            .then(result => {
              // console.log("----sdfsdg--------", result.rows[0]['id'])
              return result.rows[0]['id'];
            })
            .then(movieId => {
              db.query(`
                INSERT INTO movie_sessions(movies_id, session_id)
                VALUES ('${movieId}', '${sessionId}');
              `)
            })
          }
        })

      } else {
        randomPick = poolSize - 1;

        db.query(`INSERT INTO sessions (code, votes_needed, participants, session_size) VALUES ('${code}', '${votesNeeded}', '${participants}', '${poolSize}') RETURNING sessions.id;`)
        .then((data) => {
         const currentSessionId = data.rows[0].id;
         return currentSessionId;
        })
        .then((sessionId) => {
          let counter = randomPick;

          while (counter) {
            counter --;
            const movieId = helperFunctions.getRandomMovieId();

            db.query(
              `INSERT INTO movie_sessions(movies_id, session_id)
              VALUES ('${movieId}', '${sessionId}');`
              );
          }

          const movieTitle = reqBody['movie-names']
          db.query(`SELECT id FROM movies WHERE UPPER(title) like UPPER($1)`, [movieTitle])
          .then(result => {
            // console.log("--------------", result.rows[0]['id'])
            return result.rows[0]['id'];
          })
          .then(movieId => {
            db.query(`
              INSERT INTO movie_sessions(movies_id, session_id)
              VALUES ('${movieId}', '${sessionId}');
            `)
          })
        })
      }
    }

    res.send("form submitted");
  });

  // /sessions/movies -> GET: load movies for autocomplete
  router.get('/movies', (req, res) => {
    db.query(`SELECT title FROM movies;`)
      .then(result => {
        res.json(result.rows);
      });
  });
  // /sessions/ -> GET: get the sessions page
  router.get('/:id', (req, res) => {
    res.status(200).send("we're routed");
  });
  return router;
};
