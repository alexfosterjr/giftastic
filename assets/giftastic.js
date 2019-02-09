
var sports = ["Tom Brady", "Red Sox", "Golf", "Happy Gilmore"];

function makeButtons() {
    $("#buttonBox").empty();

    for (i = 0; i < sports.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("sportsButton");
        newButton.attr("data-topic", sports[i]);
        newButton.text(sports[i])
        $("#buttonBox").append(newButton);
        console.log(sports[i])
    } 
}

makeButtons();

$("#addTopic").on("click", function(event){

    event.preventDefault();
    topicInput = ($("#topicInput").val());
    sports.push(topicInput)

    makeButtons();

});

function imageMove(){
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
}



$(document).on("click", ".sportsButton", function(event){

    $("#gifHolder").empty();

    var topic = $(this).attr("data-topic");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {

              var gifDiv = $("<div>")
              var rating = results[i].rating;
              var showRating = $("<p>").text("Rating: " + rating);
              var image = $("<img>");
              var image = $("<img>");
              var imgOrig = response.data[i].images.original.url;
              var imgStatus = response.data[i].images.original_still.url;

              image.attr("src", imgStatus).attr("data-still", imgStatus);
              image.attr("data-animate", imgOrig).attr("data-state", "still");
            image.attr("src", results[i].images.fixed_height.url);
              gifDiv.append(showRating);
              gifDiv.append(image);
              $("#gifHolder").prepend(gifDiv);
            }
        imageMove();
        });


});











