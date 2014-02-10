/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
// usernames and passwords have been hidden :P
var db = monk('mongodb://<username>:<password>@<database_id>.mongolab.com:63218/teach');
// using mongojs to run mongo shell command (for search)
var mongojs = require('mongojs');
var db1 = mongojs('mongodb://<username>:<password>@<database_id>.mongolab.com:63218/teach');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// get from url and render appropriate page or function
app.get('/', routes.index);	
app.get('/search',routes.search);
app.get('/paragraph',routes.paragraph);
app.post('/addcontent', routes.addcontent(db));
app.get('/searchresult', routes.searchresult(db1));


// server creation
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
