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

app.get('/speech', function(req, res){
  res.render('speech');
});

app.post('/translate', function(req, res){
  var o = {
    uri: 'http://ca-101-chyld-nitrogen.mybluemix.net/translate',
    method: 'post',
    body: req.body,
    json: true
  };
  request(o, function(err, response, body){
    res.send(body);
  });
});

app.get('/cars', function(req, res){
  res.render('cars');
});

app.post('/cars', function(req, res){
  var url = 'http://ca-101-chyld-carbon.mybluemix.net/api/cars?filter[where][' + req.body.property + ']=' + req.body.value + '&filter[limit]=' + req.body.size;
  request(url, function(err, response, body){
    body = JSON.parse(body);
    res.locals.url = url;
    res.locals.rows = body;
    res.render('cars');
  });
});

app.get('/', function(req, res){
  res.render('home');
});

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
