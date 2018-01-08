require('dotenv').config();

//variable to store key file
var keys = require('./keys');

//variables to store packages
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');

//argv stuff
var userInput = process.argv[2];

var searchInput = "";

for (i = 3; i < process.argv.length; i++)
    searchInput += process.argv[i] + "+"

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
    spotify.search({ type: 'track', query: searchInput}, function(err, data) {
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

//switch method
switch(userInput) {
    case 'my-tweets':
        console.log("\n twitter fired! \n");
        showTweets();
        break;
    case 'spotify-this-song':
        console.log("\n spotify fired! \n");
        searchSong();
        break;
    case 'movie-this':
        console.log("\n ombd fired! \n");
        //searchOmbd();
    case 'do-what-it-says':
        console.log("\n doThis fired! \n");
}