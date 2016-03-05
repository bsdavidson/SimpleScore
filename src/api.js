'use strict';

var express = require('express');
var Score = require('./models/score');

var MAX_PLAYER_NAME_LENGTH = 32;
var router = exports.router = express.Router();

router.get('/', function(req, res) {
  res.json({message: 'https://github.com/bsdavidson/simplescore'});
});

router.route('/scores')
  // Create a new score.
  .post(function(req, res) {
    var score = new Score();
    score.serverId = req.body.serverId;
    score.gameId = req.body.gameId;
    score.playerName = req.body.playerName;
    // Limit the player name length on the server side, for now.
    score.playerName = score.playerName.substring(0, MAX_PLAYER_NAME_LENGTH);
    score.score = req.body.score;
    score.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json(score);
    });
  })
  // Get all scores.
  .get(function(req, res) {
    Score.find(function(err, scores) {
      if (err) {
        res.send(err);
      }
      res.json(scores);
    });
  });

// Get all scores for a server.
router.route('/scores/:serverId')
  .get(function(req, res) {
    Score.find({
      serverId: req.params.serverId
    }, function(err, scores) {
      if (err) {
        res.send(err);
      }
      res.json(scores);
    });
  });

router.route('/scores/:serverId/game/:gameId')
  // Get scores for a server and game.
  .get(function(req, res) {
    Score.find({
      serverId: req.params.serverId,
      gameId: req.params.gameId
    }, function(err, scores) {
      if (err) {
        res.send(err);
      }
      res.json(scores);
    });
  });
