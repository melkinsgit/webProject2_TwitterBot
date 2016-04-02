var Twitter = require('twitter');  // from Twitter npm
 
var client = new Twitter({
  consumer_key: 'm7QljXPn17vsjZ5oyAu5TDVZ6',
  consumer_secret: 'DHlK3QarRP4v94QL0BUXF62Jn5x7q44vMSFHTJoPNbCFMFU7t4',
  access_token_key: '709115368967634946-fgzVhaVm8Dm3OL2PJK8Af5BKABGXsGJ',
  access_token_secret: 'VkERUvQ34grq8vnSFF2JstW5Vti1ofZMcPLYQHk1rc9AY'
});

client.post('statuses/update', {status: 'It is march'},  function(error, tweet, response){
	if(error) 
		{
			throw error;
			console.log("an error was thrown");
		}
	console.log("should have posted");
	console.log(tweet);  // Tweet body 
	// var responseOjbect = JSON.parse(response);
	console.log(responseOjbect.body);
});