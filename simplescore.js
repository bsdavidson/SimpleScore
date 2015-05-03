// To Use:
// Add to your JS file:
// SS.scoreServer = 'http://simplescore.herokuapp.com';
// SS.gameId = 'DB5K';
// SS.serverId = '320B';

// add the simplescore.js file before your existing scripts in your index.html.

// In your game code:

// Get existing scores -  var scores = SS.getScores();
// Submit New score - SS.submitScore(playerName, score);



(function () {
  var SS = window.SS = {

    submitScore: function(player, score) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', SS.scoreServer + '/api/scores', true);
      xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
      xmlhttp.send('serverId=' + SS.serverId + '&gameId=' + SS.gameId + '&playerName=' + player + '&score=' + score);
    },
    getScores: function() {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
          SS.scores = xmlhttp.responseText;
          SS.scores = JSON.parse(SS.scores);
          console.log(SS.scores);
          return SS._returnTable();
          }
      };
      xmlhttp.open('GET', SS.scoreServer + '/api/scores/' + SS.serverId + '/' + SS.gameId + '?t=' + Math.random(), true);
      xmlhttp.send();
    },
    _returnTable: function() {
      var scoreArray = [];
      for (var key in SS.scores) {
        if(SS.scores.hasOwnProperty(key)) {
          var obj = SS.scores[key];
          console.log('AddingScore');
          scoreArray.push({'name': obj.playerName, 'score': obj.score});
          for (var prop in obj) {
            if(obj.hasOwnProperty(prop)) {

              //
            }
          }
        }
      }
      return scoreArray;
    }
  };
})();
