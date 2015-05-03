var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// CONFIG - Define a dbserver.js file with the following syntax:
//
// var Server =  {
//   'username': 'mongoDBusername',
//   'password': 'mongoDBpassword',
//   'server': 'mongoDBserverHost'
// };
//
// module.exports = Server;
var config = require('./dbserver');

var mongoose = require('mongoose');
mongoose.connect('mongodb://' + config.username + ':' + config.password + '@' + config.server);

var Score = require('./app/models/scoreboard');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

var port = process.env.PORT || 8080;

// Routes ===================
var router = express.Router();


// Do this on every request
router.use(function(req, res, next) {
  console.log('I got a request');
  next();
});


router.get('/', function(req, res) {
  res.json({ message: 'Your a winner!' });
});

// Scores Route
router.route('/scores')

  // POST ROUTE
  .post(function(req, res) {
    var score = new Score();
    score.serverId = req.body.serverId;
    score.gameId = req.body.gameId;
    score.playerName  = req.body.playerName;
    score.score = req.body.score;
    score.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Score created!' });
    });
  })

  // GET ALL SCORES
  .get(function(req, res) {
    Score.find(function(err, scores) {
      if (err)
        res.send(err);

      res.json(scores);

    });
  });

// Get all scores from specific server
router.route('/scores/:server_id')

  .get(function(req, res) {
    Score.find({serverId: req.params.server_id}, function(err, scores) {
      if (err)
        res.send(err);
      res.json(scores);
    });

  });

// Get scores from specific server and game
router.route('/scores/:server_id/:game_id')

  .get(function(req, res) {
    Score.find({serverId: req.params.server_id, gameId: req.params.game_id}, function(err, scores) {
      if (err)
        res.send(err);
      res.json(scores);
    });

  });


// Register Routes ====================

app.use('/api', router);

// Start
app.listen(port);
console.log('Get your stuff on port ' + port);
