// load .env data into process.env
require("dotenv").config();

const axios = require("axios").default;

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
  //Unogs API fetch parameters
  const options = {
    method: 'GET',
    url: 'https://unogsng.p.rapidapi.com/search',
    params: {
      type: 'movie',
      start_year: '1972',
      limit: '100',
      subtitle: 'english',
      countrylist: '33',
      country_andorunique: 'or',
      offset: '100',
      end_year: '2021'
    },
    headers: {
      'x-rapidapi-host': process.env.API_HOST_UNOGSNG,
      'x-rapidapi-key': process.env.API_KEY_UNOGSNG
    }
  };

  // Fetch Unogs API data
  // axios.request(options).then(function (response) {
  //   console.log(response.data.results);
  //   let dataArray = response.data.results;
  //   dataArray.forEach((elem) => {
  //     queryParams = [
  //       elem.id,
  //       elem.avgrating,
  //       elem.clist,
  //       elem.imdbid,
  //       elem.imdbrating,
  //       elem.img,
  //       elem.nfid,
  //       elem.poster,
  //       elem.runtime,
  //       elem.synopsis,
  //       elem.title,
  //       elem.titledate,
  //       elem.top250,
  //       elem.top250tv,
  //       elem.year
  //     ];

  //     db.query(`INSERT INTO movies (unogs_id, avgrating, clist, imdbid, imdbrating, img, nfid, poster, runtime, synopsis, title, titledate, top250, top250tv, year) VALUES (
  //       $1,
  //       $2,
  //       $3,
  //       $4,
  //       $5,
  //       $6,
  //       $7,
  //       $8,
  //       $9,
  //       $10,
  //       $11,
  //       $12,
  //       $13,
  //       $14,
  //       $15
  //     ) ON CONFLICT DO NOTHING;`, queryParams)
  //   });
  // }).catch(function (error) {
  //   console.error(error);
  // });
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
