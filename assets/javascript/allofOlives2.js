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

                    console.log(recipes[i])
                    //This is the looped through recipes
                    var recipeObject = recipes[i];
                    
                    //Now we add an a tag and a class
                    var recipeURL = recipeObject.recipe.url;
                    var newItem = $("<a>");
                    newItem.addClass("carousel-item");
                    newItem.attr("target", "_blank");
                    newItem.attr("href", recipeURL);
                    newItem.attr("id", "id-" + i);


                    // now we make a recipe image
                    var recipeImage = $("<img>")
                    recipeImage.attr("src", recipeObject.recipe.image);

                    //and tie it to the carousel-item class with the label at the bottom
                    newItem.append(recipeImage);
                    var title = recipeObject.recipe.label
                    var pOne = $("<p>").html("<a" + " href =" + recipeURL + " target='_blank' >" + title + "</a>");
                    newItem.prepend(pOne);

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



                        $(".carousel").on("dblclick", ".carousel-item>img", function(){
                            console.log('clicked')
                                $(".firstPageContent").hide();
                                $(".secondPageContent").hide();
                                $(".thirdPageContent").show();



                        
                        })
            
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



                $("p").on("dblclick", "a", function(){
                    // window.location.href = this.recipeURL;
                    
                    $( this ).attr( 'target', '_blank' );

                    window.open($(this).attr("href"));


                });



                if ($(".carousel").hasClass('initialized')){
                    $(".carousel").removeClass('initialized')
                }

                $(".carousel").carousel();
        });

    };

    $(document).on("click", function(event) {

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

    $(document).on("keyup", function(event){
        if(event.keyCode === 13){

        event.preventDefault();
        $(".carousel").empty();
        $("#putRecipeContentHere").empty();
        var searchTerm = $("#searchInput").val().trim();
        // console.log($(".searchInput"));
        // console.log(searchTerm);
        var searchURL = queryURL + searchTerm;

        //firebase add here
        RecipeQuery(searchURL);
        secondPage();

        }
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
    // $(".carousel").dblclick(function() {
    //     $(".firstPageContent").hide();
    //     $(".secondPageContent").hide();
    //     $(".thirdPageContent").show();
        
    // });
    
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