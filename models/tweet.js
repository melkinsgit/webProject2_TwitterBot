// model for Tweet

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tweetSchema = new Schema ({
	tweetText : String,
	mapPhrase : String	
});

var Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;