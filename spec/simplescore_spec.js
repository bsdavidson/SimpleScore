'use strict';

var request = require("request");
var helper = require('./spec-helper');
var base_url = "http://localhost:8080";
var body = 'serverId=test&gameId=jasmine&playerName=Gaben&score=9000';

describe("Simple Score Server", function() {
  helper.useServer();

  describe("GET /api", function() {
    it("returns status code 200", function(done) {
      this.r.get("/api", function(err, res, body) {
        expect(res.statusCode).toEqual(200);
        done();
      });
    });
  });

  describe("POST /api/scores", function() {
    it("Adds a Score to Database", function(done) {
      this.r.post("/api/scores", body, function(err, res, body) {
        expect(res.statusCode).toEqual(200);
        done();
      });
    });
  });

  describe("GET /api/scores", function() {
    it("returns status code 200", function(done) {
      this.r.get("/api/scores", function(err, res, body) {
        expect(res.statusCode).toEqual(200);
        done();
      });
    });
  });

  describe("GET /api/scores", function() {
    it("Retuns an Array greater than 0", function(done) {
      this.r.get("/api/scores", function(err, res, body) {
        expect(body.length).toBeGreaterThan(0);
        done();
      });
    });
  });

});
