$(document).ready(function() {
  // execute on load
  $('form.results-button').hide();
  $('input.results-button').css('pointer-events', 'none');

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
    sessionTotal = Number($('#session-total').text().split('/')[1]);

    // AJAX get request for the next image data
    $.ajax({
      url: '/sessions/next',
      method: "GET",
      data: { code: sessionCode, count: posterCountVal + 1 }
    }).then((data) => {
      //Check if we are on the last
      if (++posterCountVal > sessionTotal) {
        const $waitingGIF = $('<iframe src="https://giphy.com/embed/VJBd91kUU5FJtcDUvL" width="480" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>')
        $waitingGIF.css('pointer-events', 'none');

        $('form.results-button').show();
        $('div.poster-options, div.current-poster, #movie-title').hide();
        $('#movie-poster img').remove();
        $('#movie-poster').append($waitingGIF);

        return;
      }

      // if (Object.keys(data).length) {
        changePosterImage(data);

        //update the movie title
        $('#movie-title').text(`${convertApostrophe(data.title, 'from')}`);

        //Increment the page counter
        $posterCount.text(posterCountVal);
      // }

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
    fetchNextImage();
    updateDBCounts($(this));
  })

  // on check button click, update session counts, movie_session likes
  $('button.check').on("click", function() {
    fetchNextImage();
    updateDBCounts($(this));
  })

  // Interval for setting the button for the link to results page
  let resultButtonActionChange = setInterval(() => {
    sessionCode = $('a.session-code').text();
    $.ajax({
      url: `${sessionCode}/fetch-votes`,
      method: 'GET'
    })
    .then((votes) => {
      const { votes_needed, votes_computed } = votes;

      if (votes_computed >= votes_needed) {

        $('input.results-button').css('pointer-events', 'auto');
        $('input.results-button').attr('value', 'Click to see results!');
        return clearInterval(resultButtonActionChange);
      }
    })
  }, 3000);
})
