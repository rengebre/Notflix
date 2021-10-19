/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // movie-search endpoint ("/api/movie-search")
  router.get("/movie-search", (req, res) => {
    const searchData = decodeURIComponent(req.url.split('?')[1]);
    // console.log(searchData);
    db.query(`SELECT title FROM movies WHERE UPPER(title) LIKE UPPER($1) LIMIT 5`, [`${searchData}%`])
      .then(result => {
        // res.json(result.rows);
        res.json(result.rows);
      });
    // db.query(`SELECT * FROM movies WHERE name LIKE;`)
    //   .then(movie => {
    //     res.json(movie.rows);
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  });

  // genre-search endpoint ("/api/genre-search")
  router.get("/genre-search", (req, res) => {
    // db.query(``)
  })

  return router;
};
