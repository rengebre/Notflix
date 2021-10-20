$(document).ready(function() {

  // HELPER FUNCTIONS
  /******************************/

  // convert special character ' for titles coming to/from the database Direction (type string) = to || from
  const convertApostrophe = function(string, direction) {
    if (direction === "to") {
      return string.replace("'", '&#39;');
    }

    return string.replace('&#39;', "'");
  };

  // change the poster image on the page.
  const changePosterImage = function(posterObj) {
    let { poster, img } = posterObj;

    //remove existing poster
    $('#movie-poster img').remove();

    // if the poster image link doesn't exist, use the img one (smaller but :shrug:)
    if (!poster || poster === 'N/A') {
      poster = img;
    }

    const $posterImg = $(`<img src="${poster}" alt="Movie Poster"></img>`);

    // Append the new image object to the poster-div
    $('#movie-poster').append($posterImg);
  };

  // fetch the next image for this session
  const fetchNextImage = function() {
    const $posterCount = $('#session-count');
    let posterCountVal = Number($posterCount.text());
    const sessionCode = $('a.session-code').text();

    // AJAX get request for the next image data
    $.ajax({
      url: '/sessions/next',
      method: "GET",
      data: { code: sessionCode, count: posterCountVal + 1 }
    }).then((data) => {
      changePosterImage(data);

      //update the movie title
      $('#movie-title').text(`${convertApostrophe(data.title, 'from')}`);
      //Increment the page counter
      $posterCount.text(++posterCountVal);
    })
  }

  // update db with user choices on videos
  const updateDBCounts = function($this) {
    const data = { code: $('a.session-code').text() }

    if ($this.is($('button.check'))) {
      data.title = convertApostrophe($('#movie-title').text(), 'to');
    }

    $.ajax({
      url: '/sessions/update-session-counter',
      method: "POST",
      data: data
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // EVENT LISTENERS
  /************************************/

  //on x button click get next image
  $('button.x').on("click", function() {
    console.log("fetch - x");
    fetchNextImage();
    updateDBCounts($(this));
  })

    // on check button click, update session counts, movie_session likes
  $('button.check').on("click", function() {
    console.log("fetch-click")
    fetchNextImage();
    updateDBCounts($(this));
  })
})
