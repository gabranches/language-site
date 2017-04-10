var WordSet = require('../models/wordset');
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
                            callback(true);
                        }
                    });
                } else {
                    callback(false);
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
    newWord: function (_id, word, translation, callback) {
        WordSet.findById(_id, function (err, wordset) {
            var word_id = null;
            var replace = false;
            var match = _.find(wordset.words, { 'w': word });

            if (match) {
                match.t = translation;
                replace = true;
                word_id = match._id;
            } else {
                wordset.words.push({ w: word, t: translation });
                var word_id = _.find(wordset.words, { 'w': word })._id;
            }

            wordset.save(function () {
                callback({ replace: replace, word_id: word_id });
            });
        });
    },

    // Delete word
    deleteWord: function (_id, word_id, callback) {
        WordSet.findById(_id, function (err, wordset) {
            var index = _.findIndex(wordset.words, { '_id': word_id });
            if (index) {
                wordset.words.splice(index, 1);
            }
            wordset.save(function () {
                callback();
            });
        });
    }
}