const express = require('express');
const router  = express.Router();

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
    if (!reqBody["num-options"]) {
      console.log('test');
    }
    console.log(req.body);
    res.send("form submitted");
  });

  // /sessions/ -> GET: get the sessions page
  router.get('/:id', (req, res) => {
    res.status(200).send("we're routed");
  });


  return router;
};
