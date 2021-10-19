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

    db.query(`INSERT INTO sessions (code, votes_needed) VALUES ('${code}', '${votesNeeded}') RETURNING sessions.id;`)
    .then((data) => {
     const currentSessionId = data.rows[0].id;
     return currentSessionId;
    })
    .then((sessionId) => {

    })

    // const currentSessionId = db.query(`SELECT id FROM sessions WHERE code='${code}';`);

    // let counter = poolSize;
    // while (counter) {
    //   counter --;

    //   const movieId = helperFunctions.getRandomMovieId();
    //   console.log(movieId, typeof movieId);

    //   db.query(`SELECT * FROM movies WHERE id=${movieId};`)
    //     .then(data => {
    //       console.log("data.rows", data.rows);
    //       console.log(typeof currentSessionId);
    //       // db.query(
    //       //   `INSERT INTO movie_sessions(movies_id, session_id)
    //       //   VALUES ('${movieId}', '${currentSessionId}');`
    //       // );
    //     })
    // }
    res.send("form submitted");
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
    db.query(`SELECT poster, img FROM movies WHERE title LIKE '%ama%';`).then((data) => {
      console.log(data.rows);
    })
  });

  // /sessions/:code -> GET the sessions page associated with the given code
  router.get("/:code", (req, res) => {
    db
      .query(`
        SELECT sessions.id, sessions.code, session_size, movies.poster, movies.img
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
