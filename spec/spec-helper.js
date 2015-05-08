'use strict';

var http = require('http');
var request = require('request');
var server = require('../server');


var Requester = (function() {
  function Requester() {}

  Requester.prototype.get = function(path, callback) {
    return request("http://localhost:8080" + path, callback);
  };

  Requester.prototype.post = function(path, body, callback) {
    return request.post({
      headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
      url: "http://localhost:8080" + path,
      body: body
    }, callback);
  };

  Requester.prototype.delete = function(path, body, callback) {
    return request.post({
      headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
      url: "http://localhost:8080" + path,
      body: body
    }, callback);
  };
  return Requester;

})();


/**
 * Override the finishCallback so we can add some cleanup methods.
 * This is run after all tests have been completed.
 */
var _finishCallback = jasmine.Runner.prototype.finishCallback;
jasmine.Runner.prototype.finishCallback = function() {
  _finishCallback.bind(this)();
  server.db.close();
};

exports.useServer = function() {
  beforeEach(function(done) {
    this.httpServer = http.createServer(server.app);
    this.httpServer.listen(8080);
    this.r = new Requester();
    done();
  });

  afterEach(function(done) {
    if (this.httpServer) {
      this.httpServer.close();
    }
    done();
  });
};
