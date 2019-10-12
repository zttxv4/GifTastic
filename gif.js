// Create an array of shows that will appear when the page is opened

var shows = ["Family Guy", "Friends", "Parks and Recreation", "Silicon Valley", "Game of Thrones", "Veep", "South Park", "Boy Meets World"];

// function that adds the show button to the buttons view
function renderButtons() {
    $("#buttons-view").empty();

    for(var i=0; i < shows.length; i++) {

        var a = $('<button type="button" class="btn btn-outline-success">');
        a.addClass("tvShow"); 
        a.attr("data-name", shows[i]);
        a.text(shows[i]);
        $("#buttons-view").append(a);
    }
    
}

// add the new show to the buttons view when it is submitted by the user
$("#add-show").on("click", function(event) {
    event.preventDefault();

    var show = $("#gif-input").val().trim();
    shows.push(show);

    renderButtons();
    
})

renderButtons();

// display the 10 gifs when a show button is clicked

$(document).on("click", "button", "tvShow", function(){
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=NrZ2Zn4ESx0Zekep4OLKFB6YSgdiuK7b&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        
        var results = response.data;

        for (var i=0; i < results.length; i++) {
            
            var showDiv = $("<div class='show'>");
            var p = $("<p>").text("Rated: " + results[i].rating);
            var showGif = $("<img>");
            showGif.attr("src", results[i].images.fixed_height_still.url);
            showGif.attr("class", "gif");
            showGif.attr("data-still", results[i].images.fixed_height_still.url);
            showGif.attr("data-animate", results[i].images.fixed_height.url);
            showGif.attr("data-state", "still")
            showDiv.append(p);
            showDiv.append(showGif);

            $("#gifs-here").prepend(showDiv)
            
        }
    })
})

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still"); 
    }
})

    
