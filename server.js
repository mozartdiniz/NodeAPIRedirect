var express = require('express');
var request = require('request');
var app = express();

var server = process.env.SERVER || 'http://survey.greenmile.com';
var port = process.env.PORT || 3000;

// You can pass the API server address as a parameter you configure statically
var apiUrl = server;

// Where your static files are
var frontEndFiles = '/Users/mozartdiniz/Documents/Greenmile/gm-live/src';

app.use(express.static('files'));

// Don't map to your root folder directly, instead map to index.html, so we
// will be able to use root folder to map remote API calls to remote server
app.use('/index', express.static(frontEndFiles + '/index.html'));

// Mapping your static files
app.use('/resources/javascripts/', express.static(frontEndFiles + '/resources/javascripts'));
app.use('/resources/stylesheets/', express.static(frontEndFiles + '/resources/stylesheets'));
app.use('/resources/images/', express.static(frontEndFiles + '/resources/images'));
app.use('/resources/html_templates/', express.static(frontEndFiles + '/resources/html_templates'));

// Here is the secret, all your api call will be dynamically mapped to a remote
// server with the same kind of request e same parameters and same content body
app.use('/', function(req, res) {
  var url = apiUrl + req.url;
  req.pipe(request(url)).pipe(res);
});

// Starting the server
app.listen(port, function() {
  console.log('Server running at: ' + port);
  console.log ('Server target: ' + apiUrl);
  console.log ('Front-end folder: ' + frontEndFiles);
  console.log ('API server running since ' + new Date());
});
