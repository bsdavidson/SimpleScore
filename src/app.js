'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var api = require('./api');

var app = exports.app = express();

// Serve static files from the public folder.
app.use(express.static('public'));

// Allow API requests to be encoded as query strings or as JSON.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add CORS headers so the API can be used from other sites.
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
             'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Mount the API routes.
app.use('/api', api.router);
