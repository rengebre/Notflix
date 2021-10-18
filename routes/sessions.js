const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // /sessions/id -> POST: Form data after creating a session
  router.post('/', (req, res) => {
    console.log(req.body);
  });

  // /sessions/ -> GET: get the sessions page
  router.get('/:id', (req, res) => {
    res.status(200).send("we're routed");
  });

  // /sessions/ -> GET (AJAX) get the next image
  // router.get('')

  return router;
};
