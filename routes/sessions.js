const express = require('express');
const router  = express.Router();
const helperFunctions = require("./helper_functions");
module.exports = (db) => {

  // /sessions/ -> POST: Form data after creating a session
  router.post('/', (req, res) => {
    const reqBody = req.body;

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
      .then(() => {
        res.json({ code });
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
        .then(() => {
          res.json({ code });
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
        .then(() => {
          res.json({ code });
        })
      }
    }

    // res.send("form submitted");
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
              WHERE title = $1
              )
              WHERE movies_id = (SELECT id FROM movies WHERE title = $1)
              RETURNING likes;
            `, [title])
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
        res.render("sessions", templateVars);
      })
  });

  return router;
};
