var express = require('express');
var request = require('request');
var app = express();

// You can pass the API server address as a parameter you configure statically
var apiUrl = process.argv[2] || 'http://fenix.greenmile.com';

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

// Here is the secret, all your api call will be dynamically mapped to a remote
// server with the same kind of request e same parameters and same content body
app.use('/', function(req, res) {
  var url = apiUrl + req.url;
  req.pipe(request(url)).pipe(res);
});

// Starting the server
app.listen(3000);

console.log ('Server target: ' + apiUrl);
console.log ('Front-end folder: ' + frontEndFiles);
console.log ('API server running since ' + new Date());
