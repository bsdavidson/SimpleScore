var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
    serverId: String,
    gameId: String,
    gameDate: { type: Date, default: Date.now },
    playerName: String,
    score: { type: Number, min: 0, max: 99999999999 }
});

module.exports = mongoose.model('Score', ScoreSchema);

