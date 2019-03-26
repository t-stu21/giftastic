//GLOBAL VARIABLES

var $gifArea = $("#display-gifs")
var $rating = $("#rating")
var $search = $("#search-bar").val()
var topics = ["Sports", "Athletes", "Movies", "Video Games"];



$(document).ready( function() {


  //Append topics into buttons 
function appendButtons(){
  for (var i=0; i < topics.length; i++) {
    $("#topics-button").append("<button type='button' id='search-button' class='btn btn-primary text-center' value=' " + topics[i] + "'> " + topics[i] + "</button>")
  }
}
  // putting the ajax search in a function


  $("#search-button").on('click', function(){
         
      $.ajax({
     url: "https://api.giphy.com/v1/gifs/search?q=" + $search + "&api_key=uo6ntc2f2mOnL3GxNaJQTVt2NOmjGaXd",
      method: "GET"
   })
     .then(function(response) {
       gifDisplay(response);
       appendButtons();
       console.log(response);
       
     }) 
    })


function gifDisplay() {
       
  console.log(response);
  
  var search = $("search-bar").val().trim();
       
       
       for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="image" style= "width:250px; height:250px">';
            image = '<div class="col-md-4">' + image + "</div>";
        $('#display-gifs').append(image);
       }
     

     

}
        
    
        
       
      });



