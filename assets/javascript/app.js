// Event listener for all buttons on the page
$(document).ready(function() {
  function addReactions(results) {
    for (var i = 0; i < results.length; i++) {
      var reactionDiv = $('<div class="item ">');
      // Storing the result item's rating
      var rating = results[i].rating;
      var p = $('<p class="label label-primary">').text('Rating: ' + rating);
  
      var reactionImage = $('<img>').attr('class', 'gif-img');
  
      reactionImage.attr('src', results[i].images.fixed_height_still.url);
      reactionImage.attr('data-still', results[i].images.fixed_height_still.url);
      reactionImage.attr('data-animate', results[i].images.fixed_height.url);

  
      reactionDiv.append(p);
      reactionDiv.append(reactionImage);
      $('#gif-session').prepend(reactionDiv);
    }
  
    $('.gif-img').on('click', function() {
      var state = $(this).attr('data-state');
      console.log(this);
  
      if (state === "still") {
        $(this).attr("src", $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
    });
  }
  
  $('button').on('click', function() {
    var reaction = $(this).attr('data-reaction');
  
    // URL to search Giphy and use my key
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + reaction + '&api_key=vtjUS2jV3LGvRhDLCRUbjEugc31AW6GY&limit=10';
  
    // AJAX call
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      // Store an array of results in the results variable
      var results = response.data;
  
      addReactions(results);
    });
  });
  
  // Search from Giphy
  $('#submit-btn').on('click', function(event) {
    var searchBtn = $('#gif-input').val();
    event.preventDefault();

  
  // Create new button to that emotion
  var newReactionBtn = $('<button>')
      .attr('class', 'btn btn-primary')
      .attr('data-reaction', 'searchInput')
      .html(searchBtn);
  
  $('#reactions').append(newReactionBtn);
  
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + searchBtn + '&api_key=vtjUS2jV3LGvRhDLCRUbjEugc31AW6GY&limit=10';
  
  $.ajax({
      url: queryURL,
      method: 'GET'
      }).done(function(response) {
          var results = response.data;
  
      addReactions(results);
      });
      $('#gif-input ').val(' ');
          return false;
  });
});