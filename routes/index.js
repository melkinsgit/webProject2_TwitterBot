// WeatherBot index.js

var express = require('express');
var router = express.Router();

var Tweet = require('../models/tweet.js')

/* GET home page. */
router.get('/', function(req, res, next) {
	
	Tweet.find(function (err, tweetDocs){
	if (err) {return (err);}
	res.render('index', { title: 'WeatherBot' , tweets: tweetDocs, error: req.flash('error')});
	});
});

module.exports = router;
