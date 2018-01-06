require('dotenv').config();

//variables to require packages
var keys = require('./keys');
var fs = require('fs');
var twitter = require('twitter');




var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);