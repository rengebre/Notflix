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
  router.post("/movie-search", (req, res) => {

    db.query(`SELECT * FROM movies WHERE name LIKE;`)
      .then(movie => {
        res.json(movie.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // genre-search endpoint ("/api/genre-search")
  router.get("/genre-search", (req, res) => {
    // db.query(``)
  })

  return router;
};
