'use strict';

var assert = require('chai').assert;
var request = require('supertest');
var app = require('../src/app').app;
var db = require('../src/db');

var Score = require('../src/models/score');

function cleanScore(score) {
  if (!score) {
    return;
  }
  ['__v', '_id', 'gameDate'].forEach(function(key) {
    assert.isDefined(score[key]);
    delete score[key];
  });
}

function cleanScores(scores) {
  if (!scores || !scores.forEach) {
    return;
  }
  scores.forEach(function(score) {
    cleanScore(score);
  });
}

describe('SimpleScore API', function() {
  // Connect to the database before running tests.
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

  // Disconnect from the database after running tests.
  after(function(done) {
    if (db.connection) {
      db.connection.close();
    }
    done();
  });

  // Clear out any data from the previous tests.
  beforeEach(function(done) {
    Score.remove({}, function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  // Create some test scores.
  beforeEach(function(done) {
    Score.create([
      {
        serverId: 'server1',
        gameId: 'game1',
        playerName: 'player1',
        score: 1000
      },
      {
        serverId: 'server1',
        gameId: 'game1',
        playerName: 'player2',
        score: 2000
      },
      {
        serverId: 'server2',
        gameId: 'game1',
        playerName: 'player1',
        score: 3000
      }
    ], function(err) {
      if (err) {
        throw err;
      }
      done();
    });
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
        .expect(function(res) {
          cleanScore(res.body);
        })
        .expect(200, {
          serverId: 'test',
          gameId: 'test',
          playerName: 'gaben',
          score: 9000
        }, done);
    });
  });

  describe('GET /api/scores', function() {
    it('returns a list of scores', function(done) {
      request(app)
        .get('/api/scores')
        .expect(function(res) {
          cleanScores(res.body);
        })
        .expect(200, [
          {
            serverId: 'server1',
            gameId: 'game1',
            playerName: 'player1',
            score: 1000
          },
          {
            serverId: 'server1',
            gameId: 'game1',
            playerName: 'player2',
            score: 2000
          },
          {
            serverId: 'server2',
            gameId: 'game1',
            playerName: 'player1',
            score: 3000
          }
        ], done);
    });
  });
});
