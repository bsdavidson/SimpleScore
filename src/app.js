/* jshint node: true */
'use strict';

var server = require('./server');

server.start();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var SS;


mongoose.connect(process.env.MONGOLAB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error'));
db.once('open', function(callback) {
  SS.connectStatus = 1;
  console.log('GOOD');
});

var Score = require('./app/models/scoreboard');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers',
             'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

var port = process.env.PORT || 8080;

// Routes ===================
var router = express.Router();

router.use(function(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  res.json({message: 'Your a winner!'});
});

// Scores Route
router.route('/scores')

  .post(function(req, res) {
    var score = new Score();
    score.serverId = req.body.serverId;
    score.gameId = req.body.gameId;
    score.playerName = req.body.playerName;
    score.playerName = score.playerName.substring(0, 8);
    score.score = req.body.score;
    score.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Score created!'});
    });
  })

  // GET ALL SCORES
  .get(function(req, res) {
    Score.find(function(err, scores) {
      if (err) {
        res.send(err);
      }
      res.json(scores);
    });
  });

// Get all scores from specific server
router.route('/scores/:serverId')
  .get(function(req, res) {
    Score.find({serverId: req.params.serverId}, function(err, scores) {
      if (err) {
        res.send(err);
      }
      res.json(scores);
    });
  });

// Get scores from specific server and game
router.route('/scores/:serverId/game/:gameId')
  .get(function(req, res) {
    Score.find({serverId: req.params.serverId, gameId: req.params.gameId},
                function(err, scores) {
      if (err) {
        res.send(err);
      }
      res.json(scores);
    });
  });

// Register Routes ====================
app.use('/api', router);

// Start
app.listen(port);
console.log('Get your stuff on port ' + port);
