// Client facing scripts here

// const helperFunctions = require("../../routes/helper_functions");

const decoder = function(string) {
  string = string.replace("&#39;", "'");
  return string;
}

$(document).ready(function() {
  $(".forms-container").hide();

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

  let loadedMovies = [];
  $('#movie-input').on("keyup", () => {
    const inputData = $('#movie-input').val();

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
        let suggestions = document.getElementById("suggestions");
        let movieSuggestion = document.createElement("option");
        movieSuggestion.value = movie;
        suggestions.appendChild(movieSuggestion);

      }
    })
  })
});
