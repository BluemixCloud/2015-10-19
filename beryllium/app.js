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

app.get('/weather', function(req, res){
  res.render('weather');
});

app.post('/weather', function(req, res){
  request('http://api.openweathermap.org/data/2.5/weather?q=' + req.body.city + '&mode=json&units=imperial&appid=e44a3c12aba201b5a67900a8e1a8baa6', function(err, response, body){
    res.locals.weather = JSON.parse(body);
    res.render('weather');
  });
});

app.get('/quote', function(req, res){
  res.render('quote');
});

app.post('/quote', function(req, res){
  request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + req.body.symbol, function(err, response, body){
    res.locals.quote = JSON.parse(body);
    res.locals.shares = req.body.shares * 1;
    res.render('quote');
  });
});

app.get('/pair', function(req, res){
  res.render('pair');
});

app.post('/pair', function(req, res){
  var students = [
    'Holger Schwarzer',
    'John Campbell',
    'John Easton',
    'Mark Tomlinson',
    'Martin Weidauer',
    'Michael Brokmann',
    'Michael Weisbach',
    'Moises Galvan',
    'Pierre Perdaems',
    'Rasmus Ekman',
    'Richard Appleby',
    'Steve Strutt'
  ];

  for(var i = 0; i < students.length; i++){
    var tmp = students[i];
    while(true){
      var rnd = Math.floor(Math.random() * students.length);
      if(rnd !== i){
        break;
      }
    }
    students[i] = students[rnd];
    students[rnd] = tmp;
  }

  var pairs = [];
  for(var j = 0; j < students.length; j += 2){
    var pair = {p1: students[j], p2: students[j+1]};
    pairs.push(pair);
  }

  res.locals.pairs = pairs;
  res.render('pair');
});

app.get('/dice', function(req, res){
  res.render('dice');
});

app.post('/dice', function(req, res){
  var number = req.body.number * 1;
  var rolls = [];
  for(var i = 0; i < number; i++){
    var roll = Math.floor(Math.random() * 6) + 1;
    rolls.push(roll);
  }
  res.locals.rolls = rolls;
  res.render('dice');
});

app.get('/calc', function(req, res){
  res.render('calc');
});

app.post('/calc', function(req, res){
  var x = req.body.x * 1;
  var y = req.body.y * 1;
  var op = req.body.op;
  var result;

  switch(op){
    case "+":
      result = x + y;
      break;
    case "-":
      result = x - y;
      break;
    case "*":
      result = x * y;
      break;
    case "/":
      result = x / y;
  }

  res.locals = req.body;
  res.locals.result = result;
  res.render('calc');
});

app.get('/', function(req, res){
  res.render('root');
});

app.get('/cube', function(req, res){
  res.render('cube');
});

app.post('/cube', function(req, res){
  var x = req.body.x * 1;
  var cube = Math.pow(x, 3);
  res.locals.cube = cube;
  res.locals.x = x;
  res.render('cube');
});

app.get('/home', function(req, res){
  res.render('home');
});

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
