// Client facing scripts here

$(document).ready(function() {
  $(".forms-container").hide();

  $(".button").on("click", function() {

    $(".button").hide();
    $(".description").hide();

    $(".forms-container").show();
  })
});
