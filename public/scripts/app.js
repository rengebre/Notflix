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
    // const inputData = $('#movie-input').val().toLowerCase();
    const inputData = $('#movie-input').val();
    // $.get('/api/movie-search', { inputData }, (data) => {

    //   loadedMovies = data.map(movie => movie.title)

    // })
    // console.log(inputData);

    $.ajax({
      url: '/api/movie-search',
      method: 'GET',
      data: inputData
    }).then((result) => {
      console.log(result);
    });

  //   for (let movie of loadedMovies) {

  //     if (movie.toLowerCase().includes(inputData)) {
  //       console.log(movie)
  //       let suggestions = document.getElementById("suggestions");
  //       let movieSuggestion = document.createElement("option");
  //       movieSuggestion.value = movie;
  //       suggestions.appendChild(movieSuggestion);
  //       // console.log("suggestions", suggestions)
  //       // console.log("moviesuggestion", movieSuggestion)
  //     }
  //   }

  })
});
