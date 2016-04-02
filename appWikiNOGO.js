// Twitter Bot app called twitterapp.js 
// primarily from express then nmp install - wiki quotes attempt
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var Twitter = require('twitter');  // from Twitter npm
 
var client = new Twitter({
  consumer_key: 'm7QljXPn17vsjZ5oyAu5TDVZ6',
  consumer_secret: 'DHlK3QarRP4v94QL0BUXF62Jn5x7q44vMSFHTJoPNbCFMFU7t4',
  access_token_key: '709115368967634946-fgzVhaVm8Dm3OL2PJK8Af5BKABGXsGJ',
  access_token_secret: 'VkERUvQ34grq8vnSFF2JstW5Vti1ofZMcPLYQHk1rc9AY'
});
 
var params = {screen_name: 'writtenspoken'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    // console.log(tweets);
  }
});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// base URL for wiki
var wikiURL = "https://en.wikipedia.org/w/api.php";

// title to search - writer Mark Twain
var titles = "mark twain";  // for parameter in queryTitles

// Data for first pass query
// action=query&titles=mark+twain&prop=revisions&rvprop=content&format=json
var queryParam1 = {
format: "json",
action: "query",
prop: "revisions",
rvprop: "content",
titles: titles
};



// Searching for JSON first pass
request( {uri :wikiURL, qs: queryParam1} , function(error, apod_response, body){
	console.log(body);
	var nb = JSON.parse(body);
	var page = nb.query.pages;
	var pagesomething = Object.keys(page);
	console.log(pagesomething);
	var pageid = page;
	var blah = pageid[pagesomething];
	console.log(pageid[pagesomething]);
	console.log(blah.revisions);
    // 200 is OK
    if (!error && apod_response.statusCode == 200){
      //Have a response from APOD. Process and use to provide response to our client.
      apodJSON = JSON.parse(body);  // turn into JSON object
	  // console.log(body);
	  var JSONarr = body.split(",");
	  var pagesArr = JSONarr[3].split(":");
	  
	  var queryParam2 = {
		format: "json",
		action: "parse",
		prop: "sections",
		pageid: pagesArr[3]
		}
		
		request( {uri :wikiURL, qs: queryParam2} , function(error, apod_response, body){
			if (!error && apod_response.statusCode == 200){
				var JSONarr2 = body.split(",");
				for (var sect in JSONarr2){
					console.log(sect + ' ' + JSONarr2[sect]);
				}
				
				/*
				var sectionArray = [];
				var sections = result.parse.sections;
				for(var s in sections) {
					var splitNum = sections[s].number.split('.');
					if(splitNum.length > 1 && splitNum[0] === "1") {
						sectionArray.push(sections[s].index);
					}
				}
				*/	
				var sectionArray = [];
				var pagesArr2 = JSONarr2[2].split(':');
				for (var page in pagesArr2){
				}
			}
			
			else {
			  //Log error info to console and render generic error page.
			  console.log("Error in JSON request: " + error);
			  console.log(apod_response);
			  res.render('apodError');
			}
			
		});
    }

    else {
      //Log error info to console and render generic error page.
      console.log("Error in JSON request: " + error);
      console.log(apod_response);
      res.render('apodError');
    }

});

// this is from the npm Twitter Node Module
// POST
// Post a tweet to Twitter; NOTE - posting the same status more than once will result in error
// client.post('statuses/update', {status: 'new status for 3/29' + Date.now()},  function(error, tweet, response){
	// if(error) 
		// {
			// console.log("an error was thrown");
			// console.log(error);
			// throw error;
		// }
	// console.log("should have posted");
	// console.log(response);  // Tweet body
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
