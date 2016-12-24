var mongoose = require('mongoose');


var wordsetSchema = mongoose.Schema({
    name: { type: String, unique: true, index: true },
    words: [mongoose.Schema({w: {type: String, unique: true}, t: String})]
});

var WordSet = mongoose.model('wordSet', wordsetSchema);

module.exports = WordSet;