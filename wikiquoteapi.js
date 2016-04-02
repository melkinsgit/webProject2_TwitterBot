var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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

// jsonfm - pretty format

// var WikiquoteApi = (function() {

var wqa = {};

var wikiUrl = "https://en.wikipedia.org/w/api.php";

var titles = "mark twain";  // for parameter in queryTitles
	
// ____________________________________________________________

// ajax request
// based on the following json format; some specific var vals made generic in <>
/*
		{
			"batchcomplete": "",
			"query": {
				"pages": {
					"<pages id>": {
						"pageid": <page num>,
						"ns": 0,
						"title": "<quoted person>",
						"contentmodel": "wikitext",
						"pagelanguage": "en",
						"pagelanguagehtmlcode": "en",
						"pagelanguagedir": "ltr",
						"touched": "2016-03-26T00:39:55Z",
						"lastrevid": 711292166,
						"length": 132520
					}
				}
			}
		}
*/

/* got this from github: https://github.com/natetyler/wikiquotes-api/blob/master/wikiquote-api.js - it mimics the info about the API query that searches for the Main Page (https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json) from the wiki API page and the following search for Albert Einstein page on wikiquotes from the wiki API sandbox (https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&prop=info&titles=Albert+Einstein) */

// wqa.queryTitles = function (titles, success, error) {
	
	// // use the wikiUrl var estd above; 
	// $ajax({
		// url: wikiUrl,
		// dataType: "json",
		// data: {
			// format: "json",
			// action: "query",
			// redirects: "",
			// titles: titles
		// }, 
		// success: function (result, status) {
			// var pages = result.query.pages
			// console.log(pages.pageid);
			
		// },
		// error : function () {} 

	// });  // end ajax
	
// // };  // end query titles fn

wqa.openSearch = function(titles, success, error) {
    $.ajax({
      url: wikiUrl,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "opensearch",
        namespace: 0,
        suggest: "",
        search: titles
      },

      success: function(result, status){
        success(result[1]);
      },
      error: function(xhr, result, status){
        error("Error with opensearch for " + titles);
      }
    });
  };


// ____________________________________________________________


// ____________________________________________________________


// ____________________________________________________________

	// return wqa;
} () );  // end wiki api def
//https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json

//https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&titles=Albert+Einstein



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