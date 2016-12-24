var WordSet = require('../models/word-set');
var _ = require('lodash');

module.exports = {

    // Create wordset

    createWordset: function (name, callback) {
        WordSet.find({ name: name }, function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                if (docs.length == 0) {
                    var wordset = new WordSet({ name: name, words: [] });
                    wordset.save(function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('Created new wordset for ' + name);
                            callback();
                        }
                    });
                }
            }
        });
    },

    // Delete wordset

    deleteWordset: function (_id, callback) {
        WordSet.find({ _id: _id }).remove(function () {
            console.log('Deleted wordset ' + _id);
            callback();
        });
    },

    // Create or Update word

    newWord: function (_id, word, translation) {

        WordSet.findById(_id, function (err, wordset) {

            var match = _.find(wordset.words, { 'w': word });

            if (match) {
                match.t = translation;
            } else {
                wordset.words.push({ w: word, t: translation });
            }
            wordset.save();
        });
    }
}