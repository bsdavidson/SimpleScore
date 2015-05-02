var mongoose = require('mongoose');
var Schema = mongoose.Scheme;

var ScoreSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Score', ScoreSchema);

