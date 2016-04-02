var Twitter = require('twitter');  // from Twitter npm
 
var client = new Twitter({
  consumer_key: 'm7QljXPn17vsjZ5oyAu5TDVZ6',
  consumer_secret: 'DHlK3QarRP4v94QL0BUXF62Jn5x7q44vMSFHTJoPNbCFMFU7t4',
  access_token_key: '709115368967634946-fgzVhaVm8Dm3OL2PJK8Af5BKABGXsGJ',
  access_token_secret: 'VkERUvQ34grq8vnSFF2JstW5Vti1ofZMcPLYQHk1rc9AY'
});

client.post('statuses/update', {status: 'I am tweeting'},  function(error, tweet, response){
  if(error) throw error;
  console.log(tweet);  // Tweet body. 
  console.log(response);  // Raw response object. 
});

// api-3.0.js?id=header-quote,footer-quote
// &formatter=format_quote

var myNewURL = "http://www.apilayer.net/api/live?access_key=35e392214ea77ebc196ea8b070a60eb8&currencies=EUR,GBP&format=1";

	// this request call gets JSON data in response to a request to the url
	request(myNewURL, function (error, response, body){  // request is the var request id'd above; response is what the API gives me back, body is my JSON data
		//console.log(body);  // for testing purposes
 		var convertObject = JSON.parse(body);  // body is string returned, JSON parses into an object
		// console.log(convertObject + ' ' + convertObject.quotes.USDGBP);  // more testing