var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Your a winner!' });
});

// more routes

// prefix
app.use('/api', router);

// Start
app.listen(port);
console.log('Get your stuff on port ' + port);
