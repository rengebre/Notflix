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

    db.query(`SELECT title FROM movies WHERE UPPER(title) LIKE UPPER($1) LIMIT 7`, [`${searchData}%`])
      .then(result => {
        res.json(result.rows);

      });
  });

  // search-result endpoint ("/api/search-result")
  router.post("/search-result", (req, res) => {
    let movieTitle = req.body["search"];

    movieTitle = movieTitle.replace("'", "&#39;");

    db.query(`SELECT title FROM movies WHERE UPPER(title) LIKE UPPER($1)`,[`${movieTitle}`])
      .then(result => {
        res.json(result.rows);
        console.log(result.rows)
      })
      .then(res => {
        // console.log("here?", res)
      })
  })

  // genre-search endpoint ("/api/genre-search")
  router.get("/genre-search", (req, res) => {
    // db.query(``)
  })

  return router;
};
