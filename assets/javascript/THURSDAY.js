//Begin js when page has loaded

$(document).ready(function(){

    ///////////recipe api////////

    var appKey = "app_key=238477868c4e70b18cc712bf9f08d051";
    var appId = "app_id=813ea76d";
    var query = "q=";
    var userInput = "";
    var edamam = "https://api.edamam.com/search?";
    $(".carousel").carousel();

    var proxy = "https://cors-anywhere.herokuapp.com/";
    var queryURL = proxy + edamam + appKey + "&" + appId + "&" + query + userInput;
    //function to search API based on user input

    ///nutrition api///


    var queryURL2 = proxy + "https://api.edamam.com/api/food-database/parser?";

    var appKey2 = "app_key=656882bac9a4cc33b9815962ecf9d629";

    var appId2 = "app_id=ecf75094";

    var query2 = "ingr=";


///////////////



    function RecipeQuery(queryURL){
        console.log(queryURL);
        $("#search").empty();

        var tempUserinput = $("#searchInput").val().trim();
            // The AJAX function uses the queryURL and GETS the JSON data associated with it.

///nutrition ajax///
            
             $.ajax({
                  url: queryURL2 + "&" + appId2 + "&" + appKey2 + "&" + query2 + tempUserinput,
                  method: "GET"
                }).done(function(response) {
                  console.log(response.hints)
                }).fail(function(error) {
                  console.log(error)
                });

/////////////////////////
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(userRecipe) {
                var recipes = userRecipe.hits;
                
                // Loop through and provide recipe objects and create html tags in which to inbed
                for (var i = 0; i < recipes.length; i++) {
                    console.log(recipes[i])
                    //This is the looped through recipes
                    var recipeObject = recipes[i];
                    
                    //Now we add an a tag and a class
                    var newItem = $("<a>");
                    newItem.addClass("carousel-item");
                    newItem.attr("href", "#one");
                    newItem.append("<a id= 'a" + i + "'></a>");
                    $("#a" + i).html(recipes[i]);
                    // now we make a recipe image
                    var recipeImage = $("<img>")
                    recipeImage.attr("src", recipeObject.recipe.image);
                    //and tie it to the carousel-item class with the label at the bottom
                    newItem.append(recipeImage);
                    newItem.append(recipeObject.recipe.label);
                    //finally grab the carousel and attach the image and label
                    $(".carousel").append(newItem);
                    //recipe name and image to put in carousel
                    console.log(
                        recipeObject.recipe.label,
                        recipeObject.recipe.image,
                        recipeObject.recipe.ingredients,
                        recipeObject.recipe.totalNutrients,
                        recipeObject.recipe.calories,
                        recipeObject.recipe.url
                    ); 
                    for(var j = 0; j < recipes.length; j++){
                        $(".carousel-item").on("dblclick", function(){
                            console.log("clicked");
                            
                        })
                    }
                    //information to be put on third page:
                    console.log(
                        userRecipe.hits[i].recipe.ingredientLines,
                        userRecipe.hits[i].recipe.dietLabels,
                        userRecipe.hits[i].recipe.healthLabels,
                        userRecipe.hits[i].recipe.totalDaily,
                        userRecipe.hits[i].recipe.totalNutrients,
                        userRecipe.hits[i].recipe.url
                    );
                }
                if ($(".carousel").hasClass('initialized')){
                    $(".carousel").removeClass('initialized')
                }
                $(".carousel").carousel();
        });
    };


    var config = {
        apiKey: "AIzaSyD851L3syf6upbQE45naR6eyoR5RgsjM-A",
        authDomain: "allofolives.firebaseapp.com",
        databaseURL: "https://allofolives.firebaseio.com",
        projectId: "allofolives",
        storageBucket: "allofolives.appspot.com",
        messagingSenderId: "660668013130"
      };
      firebase.initializeApp(config);

      var recipeData = firebase.database();

////////////////


    $(document).on("click","a", function(event) {
        event.preventDefault();
        $(".carousel").empty();
        $("#putRecipeContentHere").empty();
        var searchTerm = $("#searchInput").val().trim();
        // console.log($(".searchInput"));
        // console.log(searchTerm);
        var searchURL = queryURL + searchTerm;

        var RecipeHold = {
            name: searchTerm,
        }


        //uploads data to the database
        recipeData.ref().push(RecipeHold);


        //firebase add here
        RecipeQuery(searchURL);
    });
///////////////////////////////////////////////////////////////////////////////
    $(".carousel").carousel({
        dist:0,
        shift:0,
        padding:20,
        interval: 1000
    });
    
    $(".secondPageContent").hide();
    $(".thirdPageContent").hide();
    
    $("#button").click(function() {
        secondPage();
        
    });
    function secondPage(){
        $(".firstPageContent").hide();
        $(".thirdPageContent").hide();
        $(".secondPageContent").show();
    };
    function thirdPage(){
        $(".firstPageContent").hide();
        $(".thirdPageContent").hide();
        $(".secondPageContent").show();
    };
    // $('.carousel').carousel('next');
    // $('.carousel').carousel('next', 2); // Move next n times.
    $(".carousel").dblclick(function() {
        console.log("hi");
        $(".firstPageContent").hide();
        $(".secondPageContent").hide();
        $(".thirdPageContent").show();
        
    });
    
    $("#secondPageButton").click(function() {
        $(".carousel").reload();
        //AJAX for user query
        //Need To Reload Carousel==========
        // $(".firstPageContent").hide();
        // $(".thirdPageContent").hide();
        // $(".secondPageContent").show();
    });
    $("#thirdPageButton").click(function() {
        thirdPage();
        //AJAX for user query
        // $(".firstPageContent").hide();
        // $(".thirdPageContent").hide();
        // $(".secondPageContent").show();
    });
});