'use strict';

var request = require('supertest');
var app = require('../src/app').app;
var db = require('../src/db');

describe('Simple Score Server', function() {
  before(function(done) {
    try {
      db.requireMongoUri();
    } catch (err) {
      // If a DB URI isn't specified, assume we're running tests against a
      // docker-compose container.
      process.env.DB_URI = 'mongodb://192.168.99.100:27017/simplescore_test';
    }
    db.connect(function(err) {
      if (err) {
        throw new Error(err);
      }
      done();
    });
  });

  after(function(done) {
    if (db.connection) {
      db.connection.close();
    }
    done();
  });

  describe('GET /api', function() {
    it('returns status code 200', function(done) {
      request(app)
        .get('/api')
        .expect(200, done);
    });
  });

  describe('POST /api/scores', function() {
    it('creates a score', function(done) {
      request(app)
        .post('/api/scores')
        .send({
          serverId: 'test',
          gameId: 'test',
          playerName: 'gaben',
          score: 9000,
        })
        .expect(200, done);
    });
  });

  describe('GET /api/scores', function() {
    it('returns a list of scores', function(done) {
      request(app)
        .get('/api/scores')
        .expect(200, done);
    });
  });
});
