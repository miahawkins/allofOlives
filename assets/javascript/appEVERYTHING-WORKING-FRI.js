//Begin js when page has loaded
$(document).ready(function(){
    //recipe api/////////////////////////////////////////////
    var appKey = "app_key=238477868c4e70b18cc712bf9f08d051";
    var appId = "app_id=813ea76d";
    var query = "q=";
    var userInput = "";
    var edamam = "https://api.edamam.com/search?";
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var queryURL = edamam + appKey + "&" + appId + "&" + query + userInput;
    //nutrition api/////////////////////////////////////////////////////
    var queryURL2 = proxy + "https://api.edamam.com/api/food-database/parser?";
    var appKey2 = "app_key=656882bac9a4cc33b9815962ecf9d629";
    var appId2 = "app_id=ecf75094";
    var query2 = "ingr=";
    //////////////////////////////////////////////////////////////////////
    //function to search both APIs based on user input
    function RecipeQuery(queryURL){
        console.log(queryURL);
        $("#search").empty();
        var tempUserinput = $("#searchInput").val().trim();
            
    //nutrition AJAX//////////////////////////////////////////////////////
        $.ajax({
            url: queryURL2 + "&" + appId2 + "&" + appKey2 + "&" + query2 + tempUserinput,
            method: "GET"
        }).done(function(response) {
            var nutrition = response.hints;

            for (var j = 0; j < nutrition.length; j++) {

                var nutritionInfoDiv = $("<div>");
                nutritionInfoDiv.addClass("putNutritionContentHere");
                nutritionInfoDiv.append(nutrition[j].food.label);

                $("#putRecipeContentHere").append(nutritionInfoDiv);
            }
             
        }).fail(function(error) {
             console.log(error)
        });   
    //recipe AJAX/////////////////////////////////////////////////////////   
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(userRecipe) {
                var recipes = userRecipe.hits;
                
                // Loop through and provide recipe objects and create html tags in which to inbed
                for (var i = 0; i < recipes.length; i++) {
                    console.log(recipes[i])
                    //Looped through recipes
                    var recipeObject = recipes[i];
                    
                    //Add an a tag and attributes
                    var recipeURL = recipeObject.recipe.url;
                    var newItem = $("<a>");
                    newItem.addClass("carousel-item");
                    newItem.attr("target", "_blank");
                    newItem.attr("href", recipeURL);
                    newItem.attr("id", "id-" + i);
                    //Create recipe image
                    var recipeImage = $("<img>")
                    recipeImage.attr("src", recipeObject.recipe.image);
                    //Tie it to the carousel-item class with the Recipe Name at the bottom
                    newItem.append(recipeImage);
                    var title = recipeObject.recipe.label
                    var pOne = $("<p>").html("<a" + " href =" + recipeURL + " target='_blank' >" + title + "</a>");
                    newItem.prepend(pOne);
                    //Grab the carousel and attach the image and Recipe Name
                    $(".carousel").append(newItem);
                        $(".carousel").on("dblclick", function(){
                                $(".firstPageContent").hide();
                                $(".secondPageContent").hide();
                                $(".thirdPageContent").show();
                        
                        }) //No semicolon needed here
            
                    console.log(userRecipe.hits[i].recipe.label);
                }
                //When p tag is clicked, opens new tab to url link
                $("p").on("dblclick", "a", function(){
                    $( this ).attr( 'target', '_blank' );
                    window.open($(this).attr("href"));
                });

                //to dynamically initialize carousel with jQuery for Materialize
                if ($(".carousel").hasClass('initialized')){
                    $(".carousel").removeClass('initialized')
                }
                $(".carousel").carousel();
        });
    };
////////////////////////firebase////////////////////////////
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
///////////////////////////////////////////////////////////////
    
    //When button is clicked, user input will be stored in firebase and two AJAX calls will be made (RecipeQuery function)
    $(document).on("click", function(event) {
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
        recipeData.ref().push(RecipeHold);
        RecipeQuery(searchURL);
    });
    //When user presses "enter", the same function will run as if they clicked the button
    $(document).on("keyup", function(event){
        if(event.keyCode === 13){
        event.preventDefault();
        $(".carousel").empty();
        $("#putRecipeContentHere").empty();
        var searchTerm = $("#searchInput").val().trim();
      
        var RecipeHold = {
            name: searchTerm,
        }
        recipeData.ref().push(RecipeHold);
        var searchURL = queryURL + searchTerm;
        
        RecipeQuery(searchURL);
        secondPage();
        }
    });
//Page Naviagation///////////////////////////////////////////////////////////////////
    //orient carousel
    $(".carousel").carousel({
        dist:0,
        shift:0,
        padding:20,
        interval: 1000
    });
    //upon page load
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
    
    $("#secondPageButton").click(function() {
        $(".carousel").reload();
       
    });
    $("#thirdPageButton").click(function() {
        thirdPage();
    });
});//end