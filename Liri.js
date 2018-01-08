require('dotenv').config();

//variable to store key file
var keys = require('./keys');

//variables to store packages
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');

//variables for holding api search parameters
var userInput = process.argv[2];
var movieInput = process.argv[3];
var songInput = "";
var movieName = "";

//loops for using more than one word searches
//spotify
for (i = 3; i < process.argv.length; i++)
 songInput += process.argv[i] + "+"
//ombd
for (var i = 2; i < userInput.length; i++) {

  if (i > 2 && i < userInput.length) {

    movieName = movieName + "+" + userInput[i];

  }

  else {

    movieName += userInput[i];

  }
}


    //code required to import key.js
var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

//function for pulling 20 tweets from twitter api
function showTweets() {
    console.log("Here are your tweets: ")
    var params = { screen_name: 'eusEJ1', count: 5};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++)
                console.log(tweets[i].text);
        }
    });
}


//function for searching spotify song 
function searchSong() {
    console.log("result: ")
    spotify.search({ type: 'track', query: songInput}, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
     
        // Do something with 'data'   
        var songInfo = response.tracks.items[0];
  
        // console.log(songInfo);
  console.log("Artist:", songInfo.album.artists[0].name);
  console.log("Song:", songInfo.name);
  console.log("Preview link:", songInfo.preview_url);
  console.log("Album:", songInfo.album.name);
    });
}

//function for searching omdb movie
function searchMovie() {
    console.log("result: ")
    //api call for movie title search
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// for error
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Release Year: " + JSON.parse(body).Year);
  }
});
}

//switch method
switch(userInput) {
    case 'my-tweets':
        console.log("\n twitter fired! \n");
        showTweets();
        break;
    case 'spotify':
        console.log("\n spotify fired! \n");
        searchSong();
        break;
    case 'movie-this':
        console.log("\n ombd fired! \n");
        searchMovie();
    case 'do-what-it-says':
        console.log("\n doThis fired! \n");
}  