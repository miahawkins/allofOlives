
//begin js when page has loaded
$(document).ready(function(){

	var appKey = "app_key=238477868c4e70b18cc712bf9f08d051";
    var appId = "app_id=813ea76d";
    var query = "q=";
    var userInput = "";
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
		console.log(queryURL);
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
	          
	      });
	};
  
	RecipeQuery(queryURL);


	$(document).on("click",".PageButton", function(event) {
		event.preventDefault();

		$(".putRecipeContentHere").empty();
		var searchTerm = $(".search:visible").val().trim();
		console.log($(".search:visible"));
		console.log(searchTerm);
		var searchURL = queryURL + searchTerm;

		RecipeQuery(queryURL);


	});



	$(".parallax").parallax();

	$(".carousel").carousel();
	//upon refreshing page hide the trivia and results content
	$(".secondPageContent").hide();
	$(".thirdPageContent").hide();

	
	$("#firstPageButton").click(function() {

		//AJAX for user query

		$(".firstPageContent").hide();
		$(".thirdPageContent").hide();

		$(".secondPageContent").show();


	});

	$("img").click(function() {

		$(".firstPageContent").hide();
		$(".secondPageContent").hide();

		$(".thirdPageContent").show();
		
		//AJAX for recipe

		
	});
	
	$("#secondPageButton").click(function() {

		//AJAX for user query

		$(".firstPageContent").hide();
		$(".thirdPageContent").hide();

		$(".secondPageContent").show();
	});

	$("#thirdPageButton").click(function() {

		//AJAX for user query

		$(".firstPageContent").hide();
		$(".thirdPageContent").hide();

		$(".secondPageContent").show();
	});

}); //end of doc .on ready function







