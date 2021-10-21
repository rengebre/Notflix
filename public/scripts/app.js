// Client facing scripts here

// const helperFunctions = require("../../routes/helper_functions");

const decoder = function(string) {
  string = string.replace("&#39;", "'");
  return string;
}

$(document).ready(function() {
  // Hide elements on page load
  $(".forms-container").hide();
  $("#go-to-session").hide();

  $(".button").on("click", function() {
    $(".button").hide();
    $(".description").hide();

    $(".forms-container").show();
  });

  $(".cancel-button").on("click", function() {
    $(".forms-container").hide();

    $(".button").show();
    $(".description").show();
  });

  // autocomplete on search input
  let loadedMovies = [];
  $('#movie-input').on("keyup", () => {
    const inputData = $('#movie-input').val();

    let suggestions = document.getElementById("suggestions");
    $("#suggestions").empty()

    $.ajax({
      url: '/api/movie-search',
      method: 'GET',
      data: inputData
    }).then((result) => {
      return loadedMovies = result.map(movie => movie.title);

    }).then((moviesArray) => {
      return moviesArray = moviesArray.map(movie => decoder(movie));

    }).then((res) => {
      for (let movie of res) {
        let movieSuggestion = document.createElement("option");
        movieSuggestion.value = movie;
        suggestions.appendChild(movieSuggestion);

      }
    })
  })


  //generating DOM structure for selected movie
  const createMovieElement = function (data) {
    const trimData = data.replace(/\s+/g, '')

    const $movie = $(`
    <div id='${trimData}'>
    <li class='pre-selected-movies'>${data}
    <i class="fa-solid fa-ban ${trimData}"></i>
    </li>
    </div>
    `);

    return $movie;
  };

  //function to append to the DOM
  const appendMovie = function(movie) {
    $("#movies-container").append(createMovieElement(movie))
  }

  // submit movie from movie search
  $("#search-form").submit(function(event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api/search-result',
      data: $(this).serialize()
    })
    .then((res) => {
      // console.log(res)
      let title = res[0]["title"];
      $('#movie-input').val("");
      appendMovie(title);

      // delete from selected
      const titleWithoutSpaces = title.replace(/\s+/g, '');
      $(`.${titleWithoutSpaces}`).on("click", () => {
        $(`#${titleWithoutSpaces}`).empty();
      })
    })
  })

  //collect preselected movies and send to backend
  $("#filter-form").submit(function(event) {
    event.preventDefault();

    const formData = $(this).serializeArray();
    console.log("formdata------------------------", formData)

    let preSelectedMovies = Object.values($('.pre-selected-movies')).forEach((movie, index, array) => {
      // console.log("index", index)
      if (index < array.length - 2) {

        formData.push({
          name: "movie-names",
          value: movie.innerText.trim()
        })

      }
    });

    console.log("formdata", formData)
    $.ajax({
      type: 'POST',
      url: '/sessions/',
      data: formData
    })
    .then((sessionCode) => {
      const $startSessionButton = $('#go-to-session');
      $startSessionButton.attr('action', `/sessions/${sessionCode.code}`);

      $('div.buttons').hide();
      $startSessionButton.show();
    })
  })



})
