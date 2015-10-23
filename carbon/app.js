/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

var express = require('express');
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var multer = require('multer');
var request = require('request');
var methodOverride = require('method-override');
var morgan = require('morgan');
var unirest = require('unirest');

var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

var appEnv = cfenv.getAppEnv();
var server = app.listen(appEnv.port, function() {
  console.log('***********************************');
  console.log('listening:', appEnv.url);
  console.log('***********************************');
});

module.exports = server;

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

app.get('/locations', function(req, res){
  var o = {
    uri: 'http://ca-101-chyld-nitrogen.mybluemix.net/locations',
    method: 'get',
    json: true
  };

  request(o, function(err, response, body){
    res.send(body);
  });
});

app.post('/text', function(req, res){
  var o = {
    uri: 'http://ca-101-chyld-nitrogen.mybluemix.net/text',
    method: 'post',
    json: true,
    body: req.body
  };

  request(o, function(err, response, body){
    res.send(body);
  });
});

app.post('/locations', function(req, res){
  var o = {
    uri: 'http://ca-101-chyld-nitrogen.mybluemix.net/locations',
    method: 'post',
    json: true,
    body: req.body
  };

  request(o, function(err, response, body){
    res.send(body);
  });
});

app.get('/', function(req, res){
  res.render('home');
});

app.get('/tracker', function(req, res){
  res.render('tracker');
});

app.get('/people', function(req, res){
  var o = {
    uri: 'http://ca-101-chyld-nitrogen.mybluemix.net/people',
    method: 'get',
    json: true
  };

  request(o, function(err, response, body){
    res.locals.people = body;
    res.render('people');
  });
});

app.post('/people', function(req, res){
  var o = {
    uri: 'http://ca-101-chyld-nitrogen.mybluemix.net/people',
    method: 'post',
    json: true,
    body: req.body
  };

  request(o, function(err, response, body){
    res.redirect('/people');
  });
});

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
