// //creates firebase link


// var allofOlives = new Firebase("https://allofolives.firebaseio.com/");

// // This variable will be pre-programmed with our authentication key

// var authKey ="app_key=238477868c4e70b18cc712bf9f08d051";

// var app_id="app_id=813ea76d";

// var query="q=";

// var userinput = "";

// query = "" + userinput;

// // queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// // the user hits the search button
// var queryURLBase = "https://api.edamam.com/search?" + authKey + "&" + app_id + "&" + query;


 $(document).ready(function(){
      $('.carousel').carousel();
    //   alert("hi");
    //   $(".secondPageContent").hide();
    // $(".thirdPageContent").hide();
    // //upon clicking search
    // $(".btn").click(function() {
    //     //show trivia questions
    //     $(".secondPageContent").show();
    });

//var allofOlives = new Firebase("https://allofolives.firebaseio.com/");
// This variable will be pre-programmed with our authentication key
    var appKey = "app_key=238477868c4e70b18cc712bf9f08d051";
    var appId = "app_id=813ea76d";
    var query = "q=";
    var userInput = "cheese"
    var edamam = "https://api.edamam.com/search?";

    
    
    // Performing GET requests to the OMDB API and logging the responses to the console
    // $.ajax({
    //   url: queryURLBase + appKey + "&" + appId + "&" + query + userInput,
    //   method: "GET"
    // }).done(function(response) {
    //   //console.log(response);
    // });
    var queryURL = edamam + appKey + "&" + appId + "&" + query + userInput;
//var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
//authKey + "&q=";
    
// ---------------------------------------------------------
//on click functions//
//function to search API based on user input//
function RecipeQuery(queryURL){
    $("#search").empty();
    // The AJAX function uses the queryURL and GETS the JSON data associated with it.
    // The data then gets stored in the variable called: "NYTData"
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(userRecipe) {
          var recipes = userRecipe.hits;
            // Logging the URL so we have access to it for troubleshooting
              console.log("------------------------------------");
              console.log(userRecipe);
              console.log("------------------------------------");
            
      // Loop through and provide the correct number of articles
         for (var i = 0; i < recipes.length; i++) {
          console.log(userRecipe.hits[i])
         }
          //$("#search").append(div);
      })
    }
  
RecipeQuery(queryURL);