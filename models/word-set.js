var mongoose = require('mongoose');

var wordsetSchema = mongoose.Schema({
    name: { type: String, unique: true, index: true },
    words: [{ w: String, t: String }]
});

var WordSet = mongoose.model('wordSet', wordsetSchema);

module.exports = WordSet;