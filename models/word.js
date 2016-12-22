var mongoose = require('mongoose');

var wordSchema = mongoose.Schema({
    w: String,
    t: String
});

var Word = mongoose.model('word', wordSchema);

module.exports = Word;