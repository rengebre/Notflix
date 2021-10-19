// Client facing scripts here

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
    const inputData = $('#movie-input').val().toLowerCase();
    $.get('/api/movie-search', { inputData }, (data) => {

      loadedMovies = data.map(movie => movie.title)

    })

    for (let movie of loadedMovies) {

      if (movie.toLowerCase().includes(inputData)) {
        console.log(movie)
        let suggestions = document.getElementById("suggestions");
        let movieSuggestion = document.createElement("option");
        movieSuggestion.value = movie;
        suggestions.appendChild(movieSuggestion);
        // console.log("suggestions", suggestions)
        // console.log("moviesuggestion", movieSuggestion)
      }
    }

  })

});
