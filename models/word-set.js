var mongoose = require('mongoose');


var wordSchema = mongoose.Schema({
    w: String,
    t: String 
});

var wordsetSchema = mongoosee.Schema({
    name: String,
    word: wordSchema
});

var wordSet = mongoose.model('wordSet', wordsetSchema);

module.exports = wordSet;