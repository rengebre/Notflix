const express = require('express');
const router  = express.Router();

const helperFunctions = require("./helper_functions");

module.exports = (db) => {
  router.get("/test", (req, res) => {
    // Hard code poster/session info in right now, fix this later once we have sessions working in the db
    templateVars = {
      session_size: 26,
      initial_poster:{
        poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        img: "https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABaqOk9gIL2AhavJ5YauNUyT_jgDiyV5l9nYWEnWSYArhgsxQod55rZQ4IXV4mZzWXOq6PEKVfVSNZ7FpdTsTFsnPuQ.jpg?r=7d5"
      }
    };

    res.render("sessions", templateVars);
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

  // /sessions/ -> GET: get the sessions page
  router.get('/:id', (req, res) => {
    res.status(200).send("we're routed");
  });


  return router;
};
