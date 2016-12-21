var mongoose = require('mongoose');

var wordSchema = mongoose.Schema({
    w: String, 
    t: String 
});

var wordsetSchema = mongoose.Schema({
    name: { type: String, unique: true, index: true },
    words: [wordSchema]
});

var WordSet = mongoose.model('wordSet', wordsetSchema);

module.exports = WordSet;