/* jshint node: true */

'use strict';

var db = require('./src/db');
var app = require('./src/app').app;
var port = process.env.PORT || 8080;

db.connect(function(err) {
  if (!err) {
    app.listen(port);
    console.log('SimpleScore listening on port ' + port);
  }
});
