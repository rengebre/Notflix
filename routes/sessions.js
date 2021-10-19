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

  // /sessions/id -> POST: Form data after creating a session
  router.post('/', (req, res) => {

    const reqBody = req.body;

    const poolSize = reqBody['num-options'];
    const participants = reqBody['num-participants'];

    const votesNeeded = poolSize * participants;

    const code = helperFunctions.generateRandomString();

    db.query(`INSERT INTO sessions (code, votes_needed) VALUES ('${code}', '${votesNeeded}');`);

    const currentSessionId = db.query(`SELECT id FROM sessions WHERE code='${code}';`);

    let counter = poolSize;
    while (counter) {
      counter --;

      const movieId = helperFunctions.getRandomMovieId();

      db.query(`SELECT * FROM movies WHERE id=${movieId};`)
        .then(data => {
          console.log("data.rows", data.rows);
          db.query(
            `INSERT INTO movie_sessions(movies_id, session_id)
            VALUES ('${movieId}', '${currentSessionId}');`
          );
        })
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
