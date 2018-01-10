require('dotenv').config();

//variable to store key file
var keys = require('./keys');

//variables to store packages
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');


//code required to import key.js
var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

//function for pulling 20 tweets from twitter api
function showTweets() {
    console.log("Here are your tweets: ")
    var params = { screen_name: 'eusEJ1', count: 5 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++)
                console.log(tweets[i].text);
        }
    });
}

//ALL FUNCTIONS----------------------------
// pulls artist name
var artistName = function (artist) {
    return artist.name;
};

var songSearch = function (songInput) {
    if (songInput === undefined) {
        songInput = "not found!"
    }

    // function for searching for song
    spotify.search(
        {
            type: 'track',
            query: songInput
        },
        function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            // Do something with 'data'   
            var songInfo = data.tracks.items;


            for (var i = 0; i < songs.length; i++) {

                // console.log(songInfo);
                console.log(i);
                console.log("Artist:" + songInfo[i].album.artists[0].name);
                console.log("Song:" + songInfo[i].name);
                console.log("Preview link:" + songInfo[i].preview_url);
                console.log("Album:" + songInfo[i].album.name);
            }
        }
    );
};

//function for searching omdb movie
var searchMovie = function () {
    console.log("result: ")
    //api call for movie title search
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // for error
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Release Year: " + JSON.parse(body).Year);
        }
    });
}

//switch method
var choose = function (caseData, functionData) {
    switch (userInput) {
        case 'tweets':
            console.log("\n twitter fired! \n");
            showTweets();
            break;
        case 'spotify':
            console.log("\n spotify fired! \n");
            searchSong();
            break;
        case 'movie':
            console.log("\n ombd fired! \n");
            searchMovie();
        case 'do':
            console.log("\n doThis fired! \n");
    }
};

//function for running the function being called on in

//runs the stuff
runStuff(process.argv[2], process.argv[3])