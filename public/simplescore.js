/**
* To use, add the script tag to your page:
*
*     <script src="//simplescore.herokuapp.com/simplescore.js"></script>
*
* Then configure it:
*
*     SS.gameId = 'DB5K';
*     SS.serverId = '320B';
*
* And, in your game code, you can submit a new score:
*
*     var playerName = 'jimbob';
*     var score = 9000;
*     SS.submitScore(playerName, score);
*
* Or lookup the existing scores:
*
*     var maxScores = 10;
*     SS.getScores(maxScores, function(scores) {
*        console.log(scores);
*     });
*/
(function() {
  'use strict';

  var SS = window.SS = {
    currentScores: [],

    /**
    * Submit a new score to the API.
    *
    * @param {string} playerName Player's name.
    * @param {number} score Player's score.
    */
    submitScore: function(playerName, score) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open('POST', this.scoreServer + '/api/scores', true);
      xmlHttp.setRequestHeader('Content-Type', 'application/json');
      xmlHttp.send(JSON.dumps({
        serverId: this.serverId,
        gameId: this.gameId,
        playerName: playerName,
        score: score
      }));
    },

    /**
    * Fetch the scores from the API.
    *
    * @param {number} maxScores Maximum number of scores to retrieve.
    * @param {function} callback Function to call when scores have been
    *     retrieved.
    */
    getScores: function(maxScores, callback) {
      function parseScores(responseText) {
        var scores = JSON.parse(responseText).map(function(score) {
          return {name: score.playerName, score: score.score};
        });
        scores.sort(function(a, b) {
          return b.score - a.score;
        });
        return scores.slice(0, maxScores);
      }

      var url = (
        this.scoreServer +
        '/api/scores/' + encodeURIComponent(this.serverId) +
        '/game/' + encodeURIComponent(this.gameId)
      ) + '?t=' + Math.random();
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          this.currentScores = parseScores(xmlHttp.responseText);
          if (callback) {
            callback(this.currentScores);
          }
        }
      }.bind(this);
      xmlHttp.open(url, true);
      xmlHttp.send();
    }
  };
})();
