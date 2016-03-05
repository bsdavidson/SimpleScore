'use strict';

var mongoose = require('mongoose');
var url = require('url');

function connect(done) {
  mongoose.connect(requireMongoUri());
  exports.connection = mongoose.connection;
  mongoose.connection.on('error', function(err) {
    console.error('Mongoose connection error:', err);
    done(err);
  });
  mongoose.connection.once('open', function() {
    done();
  });
}

function requireMongoUri() {
  if (process.env.DB_URI || process.env.MONGOLAB_URI) {
    // Allow a direct URL to be specified.
    return process.env.DB_URI || process.env.MONGOLAB_URI;
  } else if (process.env.DB_PORT) {
    // Otherwise, we should have a DB_PORT env variable (the name used when
    // linking Docker containers) that contains a URI to the DB host (e.g.
    // "tcp://172.17.0.2:27017"), and a DB_NAME env variable with the name
    // of the database.
    if (!process.env.DB_NAME) {
      throw new Error('DB_NAME env variable required if DB_PORT is defined');
    }
    var parsed = url.parse(process.env.DB_PORT);
    return 'mongodb://' + parsed.host + '/' + process.env.DB_NAME;
  } else {
    throw new Error('No MongoDB URI in environment');
  }
}

exports.connect = connect;
exports.requireMongoUri = requireMongoUri;
