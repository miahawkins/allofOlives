//Begin js when page has loaded
$(document).ready(function(){
    var appKey = "app_key=238477868c4e70b18cc712bf9f08d051";
    var appId = "app_id=813ea76d";
    var query = "q=";
    var userInput = "";
    var edamam = "https://api.edamam.com/search?";
    $(".carousel").carousel();
    var queryURL = edamam + appKey + "&" + appId + "&" + query + userInput;

    //function to search API based on user input
    function RecipeQuery(queryURL){
        console.log(queryURL);

        $("#search").empty();


            // The AJAX function uses the queryURL and GETS the JSON data associated with it.
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(userRecipe) {
                var recipes = userRecipe.hits;
                
                // Loop through and provide recipe objects and create html tags in which to inbed
                for (var i = 0; i < recipes.length; i++) {

                    console.log(userRecipe.hits[i])
                    var recipeObject = userRecipe.hits[i];

                    
                    var newItem = $("<a>");
                    newItem.addClass("carousel-item");
                    newItem.attr("href", "#one");

                    var recipeImage = $("<img>")
                    recipeImage.attr("src", userRecipe.hits[i].recipe.image);

                    newItem.append(recipeImage);
                    newItem.append(userRecipe.hits[i].recipe.label);

                    $(".carousel").append(newItem);

                    //recipe name and image to put in carousel
                    console.log(
                        userRecipe.hits[i].recipe.label,
                        userRecipe.hits[i].recipe.image
                    ); 
                    
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

    $(document).on("click","a", function(event) {

        event.preventDefault();
        $(".carousel").empty();
        $("#putRecipeContentHere").empty();
        var searchTerm = $("#searchInput").val().trim();
        // console.log($(".searchInput"));
        // console.log(searchTerm);
        var searchURL = queryURL + searchTerm;

    
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

    $("input").keypress(function(event){
        if(event.which === 13){
            secondPage();
        }
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
    $("img").on("click", function() {
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