
//begin js when page has loaded
$(document).ready(function(){



	$(".carousel").carousel();
	//upon refreshing page hide the trivia and results content
	$(".secondPageContent").hide();
	$(".thirdPageContent").hide();

	
	$("#firstPageButton").click(function() {

		//AJAX for user query

		$(".firstPageContent").hide();
		$(".thirdPageContent").hide();

		$(".secondPageContent").show();

		userInput = $(".userInput").val().trim();

	});

	$("img").click(function() {

		$(".firstPageContent").hide();
		$(".secondPageContent").hide();

		$(".thirdPageContent").show();
		
		//AJAX for recipe

		function displayRecipe() {
			$(".recipes");
		};
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
});