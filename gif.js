var shows = ["Family Guy", "Friends", "Parks and Recreation", "Silicon Valley", "Game of Thrones", "Veep", "South Park", "Boy Meets World"];

function renderButtons() {
    $("#buttons-view").empty();

    for(var i=0; i < shows.length; i++) {

        var a = $("<button>");
        a.addClass("tvShow");
        a.attr("data-name", shows[i]);
        a.text(shows[i]);
        $("#buttons-view").append(a);
    }
}

function clearSearch() {
    $("#gif-input").clear();
}

$("#add-show").on("click", function(event) {
    event.preventDefault();

    var show = $("#gif-input").val().trim();
    shows.push(show);

    renderButtons();
    clearSearch()
})

renderButtons();