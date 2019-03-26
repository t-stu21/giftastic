$(document).ready(function(){

  
  //initial array of tv shows
  var topics = ["Sports", "Movies", "Video Games", "Lifestyle", "Fashion"]
  gifDisplay = " "
  
  
  
  //render buttons from contents of the array
  function renderButtons() {
  
  //the buttons duplicate without this 
  $("#topics").empty();
  
  
  for (var i=0; i < topics.length; i++) {
  
  //adding our buttons 
  var a = $('<button>');
  
  a.addClass('topics');
  
  
  a.attr('data-name', topics[i]);
  
  a.text(topics[i]);
  
  $("#topics").append(a);
  }
  
  $("#search-bar").focus();
  
  }
  
  renderButtons();
  
 
  //taking value of search bar and creating a button for it when search button is clicked
  $("#search-button").on('click', function() {
  
  
  event.preventDefault();
  
 
  var gif = $("#search-bar").val().trim(); 
  
  
  topics.push(gif);
  
  
  renderButtons();
  
  });
  
  //running our ajax call -- creating a div element and a rating element 
    $(document).on('click', 'button',  function() {
      
        $('#display-gifs').empty(); 
            var $search = $(this).attr('data-name');		
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $search + "&api_key=uo6ntc2f2mOnL3GxNaJQTVt2NOmjGaXd"; //query api url and public key
            console.log(queryURL); 
  
          
            $.ajax({
                    url: queryURL,
                    method: 'GET'
                })
          
                .done(function(response) {
                    console.log(response);
         
                    var results = response.data;
            
                    for (var i = 0; i < results.length; i++) {
            
                    var gifDiv = $('<div class="item">');
           
                    var rating = results[i].rating;
            
              var rateElement = $('<p>').text("Rating: " + rating);
          
              var giffy = $('<img>');
        
                giffy.attr('src', results[i].images.fixed_height_still.url)
                            .attr('data-still', results[i].images.fixed_height_still.url)
                            .attr('data-animate', results[i].images.fixed_height.url)
                            .attr('data-state', "still")
                            .addClass("showImage");
         
                        gifDiv.append(rateElement)
                            .append(giffy);	                    
  
                    	  
                        $('#display-gifs').prepend(gifDiv);
                    }
  
                });
        });
  
  
  
  //animate the gif when they are clicked
    $(document).on('click', '.showImage',  function() {
  
        var state = $(this).data('state');
      
        if (state == "still") {
            console.log("still image works");
        
            $(this).attr('src', $(this).data('animate'))
                   .data('state', 'animate');
        } else {
      
            console.log("animated image works");
            $(this).attr('src', $(this).data('still'))
                   .data('state', 'still');               
        }
  
    });
  
  });
