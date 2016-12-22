var mongoose = require('mongoose');

var wordsetSchema = mongoose.Schema({
    name: { type: String, unique: true, index: true },
    words: [{ type: mongoose.Schema.ObjectId, ref: 'word' }]
});

var WordSet = mongoose.model('wordSet', wordsetSchema);

module.exports = WordSet;