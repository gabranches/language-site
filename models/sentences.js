var mongoose = require('mongoose');

var sentenceSchema = new mongoose.Schema({
    s_original: String,
    s_translation: String
}, { collection: 'sentences'});

var Sentence = mongoose.model('sentences', sentenceSchema);

module.exports = Sentence;