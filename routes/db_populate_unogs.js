require("dotenv").config();
const axios = require("axios").default;

// let options = {
//   method: 'GET',
//   url: 'https://unogsng.p.rapidapi.com/search',
//   params: {
//     start_year: '1972',
//     limit: '100',
//     subtitle: 'english',
//     countrylist: '33',
//     country_andorunique: 'or',
//     end_year: '2021'
//   },
//   headers: {
//     'x-rapidapi-host': process.env.API_HOST_UNOGSNG,
//     'x-rapidapi-key': process.env.API_KEY_UNOGSNG
//   }
// }
// let db_index = 0;

const populateTableWithUnogsData = function(unogsDataArray, table, db, promiseArray) {
  table = (table === "movie") ? "movies" : table;

  unogsDataArray.forEach((elem) => {
    queryParams = [
      elem.id,
      elem.avgrating,
      elem.imdbid,
      elem.imdbrating,
      elem.img,
      elem.nfid,
      elem.poster,
      elem.runtime,
      elem.synopsis,
      elem.title,
      elem.titledate,
      elem.top250,
      elem.top250tv,
      elem.year
    ];

    if (promiseArray) {
      promiseArray.push(db.query(`
      INSERT INTO ${table} (unogs_id, avgrating, imdbid, imdbrating, img, nfid, poster, runtime, synopsis, title, titledate, top250, top250tv, year)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      ON CONFLICT (unogs_id) DO UPDATE
        SET unogs_id = EXCLUDED.unogs_id
      RETURNING id;`, queryParams))
    } else {
      db.query(`INSERT INTO ${table} (unogs_id, avgrating, imdbid, imdbrating, img, nfid, poster, runtime, synopsis, title, titledate, top250, top250tv, year)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      ON CONFLICT (unogs_id) DO UPDATE
        SET unogs_id = EXCLUDED.unogs_id
      RETURNING id;`, queryParams)
    }
    });
}

const fetchUnogsTotal = function(db, dataType) {
  // options.params.type = dataType;
  // options.params.offset = '0';

  //Unogs API fetch parameters
  const options = {
    method: 'GET',
    url: 'https://unogsng.p.rapidapi.com/search',
    params: {
      type: dataType,
      start_year: '1972',
      limit: '100',
      subtitle: 'english',
      countrylist: '33',
      country_andorunique: 'or',
      offset: '0',
      end_year: '2021'
    },
    headers: {
      'x-rapidapi-host': process.env.API_HOST_UNOGSNG,
      'x-rapidapi-key': process.env.API_KEY_UNOGSNG
    }
  };

  // Fetch Unogs API data
  axios.request(options).then(function (response) {
    const totalObjects = response.data.total; // -> 3962 /100 -> 39.62 -> 40 - 1 -> 39.
    console.log(totalObjects, Math.ceil(totalObjects / 100) - 1);
    populateTableWithUnogsData(response.data.results, dataType, db);
    // console.log(Math.ceil(totalObjects / 100) - 1);
    for (let i = 1; i < Math.ceil(totalObjects / 100); i++) {
      fetchUnogsData(db, i * 100, dataType);
    }
  }).catch(function (error) {
    console.error(error);
  });
};

const fetchUnogsData = function(db, offset, dataType) {
  //Unogs API fetch parameters
  const options = {
    method: 'GET',
    url: 'https://unogsng.p.rapidapi.com/search',
    params: {
      type: dataType,
      start_year: '1972',
      limit: '100',
      subtitle: 'english',
      countrylist: '33',
      country_andorunique: 'or',
      offset: `${offset}`,
      end_year: '2021'
    },
    headers: {
      'x-rapidapi-host': process.env.API_HOST_UNOGSNG,
      'x-rapidapi-key': process.env.API_KEY_UNOGSNG
    }
  };

  // Fetch Unogs API data
  axios.request(options).then(function (response) {
    // console.log("retrieved unogs data\n", response.data);
    // console.log(response.data.total);
    populateTableWithUnogsData(response.data.results, dataType, db);

  }).catch(function (error) {
    console.error(error);
  });
}

// Fetch the genre data from unogs
const fetchUnogsGenreData = function(db, res) {
  var options = {
    method: 'GET',
    url: 'https://unogsng.p.rapidapi.com/genres',
    headers: {
      'x-rapidapi-host': process.env.API_HOST_UNOGSNG,
      'x-rapidapi-key': process.env.API_KEY_UNOGSNG
    }
  };

  axios.request(options).then(function (response) {
    response.data.results.forEach((elem) => {
      const queryParams = [elem.genre, elem.netflixid];
      // console.log(response.data);
      db.query(`
      INSERT INTO genres (genre, netflixid) VALUES ($1, $2) ON CONFLICT DO NOTHING`, queryParams)
    });
  }).then(() => {
    res.status(200).send("Uploaded API data");
  }).catch(function (error) {
    console.error(error);
  });
}

module.exports = {
  fetchUnogsTotal,
  fetchUnogsGenreData,
  populateTableWithUnogsData
}
