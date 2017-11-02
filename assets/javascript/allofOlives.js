//creates firebase link

var allofOlives = new Firebase("https://allofolives.firebaseio.com/");

// This variable will be pre-programmed with our authentication key

var authKey ="app_key=238477868c4e70b18cc712bf9f08d051";

var app_id="app_id=813ea76d";

var query="q=";

var userinput = "";

query = "" + userinput;

// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// the user hits the search button
var queryURLBase = "https://api.edamam.com/search?" + authKey + "&" + app_id + "&" + query;


