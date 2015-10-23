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

app.get('/square/:x', function(req, res){
  var x = req.params.x * 1;
  var sq = x * x;
  res.send({square: sq});
});

app.post('/random', function(req, res){
  var rnd = Math.floor(Math.random() * 11);
  res.send({random: rnd});
});

app.get('/roll', function(req, res){
  var rnd = Math.floor(Math.random() * 6) + 1;
  res.send({roll: rnd});
});

app.get('/rolls/:dice', function(req, res){
  var dice = req.params.dice * 1;
  var rolls = [];
  for(var i = 0; i < dice; i++){
    var rnd = Math.floor(Math.random() * 6) + 1;
    rolls.push(rnd);
  }
  res.send({rolls: rolls});
});

app.get('/', function(req, res){
  res.send({status: 'IBM'});
});

app.get('/hello', function(req, res){
  res.send({word: 'world'});
});

app.get('/home', function(req, res){
  res.render('home');
});

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
