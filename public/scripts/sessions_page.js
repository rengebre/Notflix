const testData = [
  {
    poster: null,
    img: 'https://occ-0-4039-1500.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABdC_8Uc_0DTe2qJWjlftnO9jwm1Yf6t-KbDXrxU1kaL17JqYow8YWLfiQW5OmTMSfTn3aE3iVlv4SCXfM58RCebF4A.jpg?r=1e0'
  },
  {
    poster: 'https://m.media-amazon.com/images/M/MV5BMjI5ZmJlNTAtYjJlNy00Y2M1LWE4NWItZTFjZjg0MTAzMDAwXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_SX300.jpg',
    img: 'https://occ-0-487-1722.1.nflxso.net/dnm/api/v6/1lcgfy_NA26l7dfd356LqCUdNPM/AAAABek0CFOXUvD2_MnkrG273Ofy2pmCeeYBKiyUtGp_0jG8ZZAxH2TCfTMOC68hMoGvC24JYhXUPixuHDXRFqJyuf6FY0fqtt38QH1vCB1QlRhQxKA.jpg?r=e69'
  },
  {
    poster: null,
    img: 'https://occ-0-768-769.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABeX42SDP6lhFJ9r_zKKfKGWEY7UNjN5p563M4CNhp4j0mi3cByKkPHMGsKq92nBcN875HZaGAcIB6jEQirkLrwj30g.jpg?r=f89'
  },
  {
    poster: null,
    img: 'https://occ-0-2705-2706.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABbtcTWKpjMF5uvSwA5ShGgJyrVEB7ZvTCf6WpdiHqY2pvH4tes9B5coz2xMecsX1EEogMc2WemwpssvS6euBRnmdZQ.jpg?r=5a0'
  },
  {
    poster: '',
    img: 'https://occ-0-3174-32.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABTs-hvdWcSOY51QCH7UJEuU49SLlHxNPwCIZxzf8pPxljYjZu8kTDgaufnLKa4LHZiyiC2aRn0CCxQL5_0oICUydCw.jpg?r=773'
  },
  {
    poster: 'https://m.media-amazon.com/images/M/MV5BMTM5MjIwNDAwMl5BMl5BanBnXkFtZTcwNzQyOTY0OA@@._V1_SX300.jpg',
    img: 'https://occ-0-2851-1432.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABcVUaXXVsVk3gA0vrMFFWgBJGTG_r-LUZ9V1E4bTQjcZVTRjwAEZn-Z3r7dUJsa6G4RlkdA-Wma6AwYRAX6LFPyokw.jpg?r=45c'
  },
  {
    poster: 'https://m.media-amazon.com/images/M/MV5BNjU1ODNkNjUtNzMyMy00YWRjLTg5ODItMmQzNTIyNWZhMTg4XkEyXkFqcGdeQXVyNzI0NzQyNTk@._V1_SX300.jpg',
    img: 'https://occ-0-2851-41.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABf_Zh16MU_W_up_Gmp5CX3CkZTFnnXNiJ53IjhVUcO23rbc67CH_vmWKu90Y4VJL-l1N7i3GD9KasEZukqQNyW0qVw.jpg?r=8a7'
  },
  {
    poster: 'https://m.media-amazon.com/images/M/MV5BOThkZjMyMGYtMDNjNy00NjcwLTk1NmEtZmQwYTliMmM4YjBhXkEyXkFqcGdeQXVyMzM4NjcxOTc@._V1_SX300.jpg',
    img: 'http://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABcqo5U-Frv4qaDhnFLr_9yLPXZT3hw2nWI5lmDJexoFL5M-V1ycgrfu84KfLj6C5W2G4w8RVb8toUslOx2VQs79Icg.jpg?r=e29'
  },
  {
    poster: 'N/A',
    img: 'https://occ-0-2717-360.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABejvQ9V48-ozwPJ_LKkLfgiOlpKnO5_l8pPPSV7GlK_LukLEqBG3EU05b1pN2jaoPJxbrgFxfo6m1tDwnk-bej_1-w.jpg?r=7bf'
  },
  {
    poster: null,
    img: 'https://occ-0-38-41.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABTwb84Wxuk8phcGic6HbCL3KMryPLtqw2pdFAnR-LxIWCcyYXZnyKsEJ57iCYK5050AHvtbD7tIWkZe4xXmJZSl7CjI52KMec_ysvbq0wt-y-TzoLcMlwX1LfJM.jpg?r=be8'
  },
  {
    poster: 'N/A',
    img: 'https://occ-0-2717-360.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABZf1bqXN8_hPiGXoPlMl83WiWzV2fgNOIBTgQNTtk8_k2mMvHARxGMFbnSsPjsX3x7i0-RalJdUyE6ErAub7-5sCwYQ-YIqgQ2I0SRZoh8t_ksJXZrnsNAE0TNxPlTD1_uGmbzbWm7BsIehTME7aqQw_1KS7cDJZEPxRTku_ljQv2f2bCY21Tg.jpg?r=ac6'
  },
  {
    poster: 'https://m.media-amazon.com/images/M/MV5BY2ZjMWI2YzItNmUzZC00ZTM5LTlmOTctMTYxMjljOWFjNmQxXkEyXkFqcGdeQXVyNzQxMDIyMzU@._V1_SX300.jpg',
    img: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABSfrGZbQXjUNBDPkr7Oj6AefnqnjcRhXGG2QSoj-zLGk-DBMeo-WNl_NF9E1keWPdZF7IG7Xnlr_pbwpFsARhrrrYg.jpg?r=e25'
  },
  {
    poster: null,
    img: 'http://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABZg0eTBdqcUokkOc1e_ogVeO3Hice5otp9jEseZ0asWyVrzVDCZWFUPnnzF2gq_rWMFAYFR2dKdh2OZ8VLpoApZW9w3x3tEglzvxrlzcIuNNLnQCaiOvwTUjCHQ.jpg?r=062'
  },
  {
    poster: 'https://m.media-amazon.com/images/M/MV5BMmNjZWQzOTAtNGVhMC00ZTQ2LTllNmMtYmEyY2ZiM2MyMDQzXkEyXkFqcGdeQXVyMTcyMDgxNQ@@._V1_SX300.jpg',
    img: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABZs49cpx5DIw277wpTa9Qb4jRT5iGPZO9DRWlpDOwnasw_2n-OEoBYl9tn4MFkIOsI7JscYfdt-oifdZXzhUXnBUGtvsuUMqRx-4Qx7Vg-tLKEJxTb7ErDCcTzk.jpg?r=616'
  },
  {
    poster: 'https://m.media-amazon.com/images/M/MV5BOTJlZjJmNDYtNWViOS00YTg1LTk5ODQtYzUyODExZTkxMTAzXkEyXkFqcGdeQXVyMzYxOTQ3MDg@._V1_SX300.jpg',
    img: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABdkAm0IWz8_pGFXivVLXBDtzMTeUdWz9LMXtFbRmOnnNw1In44x2B9MmSptNLgTTuwmoIQOuxIxIb5F5kyZmh8gQPw.jpg?r=ca2'
  },
  {
    poster: null,
    img: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABSLtRIpFgKJNbHd2LaWxQwhEOWbCEAgrVI84EEYpBK0Ixx1OH72G53eVqT-q8LFTTyNaINCA_mAh-qInkw7bwcnNpQ.jpg?r=ea0'
  },
  {
    poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZmQ3NDc1NGYtMTkzOC00MTUzLTgyNjYtZDM2MmU3M2M2M2Y1XkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_SX300.jpg',
    img: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABWDsB6acZ13cAbtdiFSyO11HsJrXMkgsWCkIat534wCcSF7e0Nie6j0YUDixzJ3EiaUwCR7JkxFgokSIxRQwVJjzsA.jpg?r=534'
  },
  {
    poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BM2E3OGZiZjgtMDYzYy00OWIzLTlmZDItOWEwYWE5MjdmMWFjL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg',
    img: 'http://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABZlRm94drn-n3UV9cO_a1YvcwkzHofbklPNmlCaK4ZclRbk2bTRhAiTKD9vsNFK4jmg1ukpVIorDsh3fICJ4OvcCvw.jpg?r=cd0'
  },
  {
    poster: 'https://m.media-amazon.com/images/M/MV5BMjA1MTc0Mjc4Ml5BMl5BanBnXkFtZTgwNjU5Nzk4NjE@._V1_SX300.jpg',
    img: 'https://occ-0-2773-2774.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABdHoiUK1c4AV3XldNGHXjgSAMsM_JANjI77hdFeqwQF7ILKSdLRIpTnYz5Kz9g2MjnMIgSCCHlgYhYmgpW_ikCVW2A.jpg?r=954'
  },
  {
    poster: 'N/A',
    img: 'http://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABe7zaq3G8GhFLxqoZjDe5_87WNMmkV6l_rB_Eu-q1ccJM7WpVpY-wno_MTomt6tqcJmIFrObAtlREtYYUOl5YTzRqJZwnWlUEfWpmjP08s5gy99txtFWBg7XNYQ.jpg?r=2db'
  },
  {
    poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTlkYTI1ZWItZmFmMy00MjA0LWEwZDItYTAwYzI3MGVhNjFlXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg',
    img: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABf1KGPDbyMsbp-dr5OOt6m0brdAGP9I1D38QpE7VIkYQt4KvUtyooh0yVZB6bEGhD847gzGneRhKy3BMuD-n3_Zqtw.jpg?r=925'
  },
  {
    poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxNDY5NjA5NV5BMl5BanBnXkFtZTgwNjcyMTk5NjE@._V1_SX300.jpg',
    img: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABRjklnozmT0TbJ5hsuhDQrsZgkTbtZrhlHIfco1eDM_UM0CeMCd0dX0TWe8UVMe1z7PDLUa08Tx8VAnsjZDMiH5nyw.jpg?r=e1e'
  },
  {
    poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjQyNDY0MjQ0Ml5BMl5BanBnXkFtZTgwMjEzMTQxNDM@._V1_SX300.jpg',
    img: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABTWxpzSa2QBY7Jp-kvyaGuHDDqKqDT2HlEYWpGqEUBWBKRUPZhFxoplOx7HLa0uSQYuaWJSPBxEVPfx_EYCyykzzM0w9DlVXF_-q7aDIiyapL2X4D0wZe30OpeQ.jpg?r=ca0'
  },
  {
    poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYWQ3ZjQ3YTYtODI2Ni00ZTZlLTlkMzktMDRkNTIzOWFjNjAxXkEyXkFqcGdeQXVyNDcyMjQ4MzU@._V1_SX300.jpg',
    img: 'https://occ-0-2773-2774.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABct3vC9ud3cBmQrk26CCoRSXYoK60AKucWSluEHRxdRYyNjw8hZSRPNjaKbyorpQn7qYNPm-nhhBarjiP8SFFlMhXQ.jpg?r=430'
  },
  {
    poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjE2MTgxZWYtMzVmMy00NjY0LWJkMjktZWE4OTYyOGI2MTUzXkEyXkFqcGdeQXVyNTE2MzU4OTA@._V1_SX300.jpg',
    img: 'https://occ-0-299-1001.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABepnGQc51KXDy5wCCQ1JGUMz_vpcz3adaf7bMD_XRwEBZ5e49Ag7dLqr6xtU44rYhoFkZ0Yfyc74U8XJrflslg4LeQ.jpg?r=a92'
  },
  {
    poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMDdlYWI3YWMtZmNhMC00NzZhLWI2ZWMtNjZmZDE2ZDYzMzRmXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg',
    img: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABfrj7RFbHecMqKN2DKYqtqQM3nRju_uO1ciddvh6ZNdWRrVMBPmlVMbjPyiRRIHur2wrF4ORSh2ukCe9cDJCeh7VB5x5wtfoy9VRtnHcEoHSF-fbCAH9T3NDSu8.jpg?r=c55'
  }
]


$(document).ready(function() {
  $('button.x').on("click", function() {
    const $moviePosterDiv = $('#movie-poster');
    const $posterCount = $('#session-count');
    let posterCountVal = Number($posterCount.text());
    console.log(posterCountVal, typeof posterCountVal);

    $('#movie-poster img').remove();

    if (!testData[posterCountVal].poster || testData[posterCountVal].poster === 'N/A') {
      const $posterImg = $(`<img src="${testData[posterCountVal].img}" alt="Movie Poster"></img>`);
      $moviePosterDiv.append($posterImg);
    } else {
      const $posterImg = $(`<img src="${testData[posterCountVal].poster}" alt="Movie Poster"></img>`);
      $moviePosterDiv.append($posterImg);
    }


    $posterCount.text(++posterCountVal);
     console.log(testData.length);


    // console.log(data);
    // $.ajax({
    //   url: '/sessions/next',
    //   method: "GET",
    //   data: { data }
    // }).then((data) => {
    //   console.log("OK");
    // })
  })
})
