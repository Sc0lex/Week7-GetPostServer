/**********************************************************
 * Joel Adriance
 * 2-25-2017
 * CS290 - Get / Post Server
 *
 * A very simple server that handles Post and Get requests, 
 * displaying the content of the request on the page. Code
 * is adapted from provided samples as was allowed per the
 * the assignment directions.
 **********************************************************/

 // Init express
var express = require('express');
var app = express();

// Init template handling
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Init message parser
var bodyParser = require('body-parser');
// Handle both urlencoded and json encoded post message data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', 5542);

// Read the get message and display its contents
app.get('/',function(req,res){
	var context = {};
	context.requestData = [];
	context.requestType = "GET";
  
	for (var p in req.query){
		context.requestData.push({'name':p,'value':req.query[p]})
	}

	res.render('response', context);
});

// Read the post message and display its contents
app.post('/', function(req,res){
	var context = {};
	context.requestData = [];
	context.requestType = "POST";
	
	for (var p in req.body){
		context.requestData.push({'name':p,'value':req.body[p]})
	}

	res.render('response', context);
});

// Handle request to unknown page
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

// Handle execution errors
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

// Report successful start up when the port is open
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
