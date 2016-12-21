var mongoose = require('mongoose');
var WordSet = require('../models/word-set');
var env = require('../env');

mongoose.connect('mongodb://' + env.user + ':' + env.pass + '@ds133428.mlab.com:33428/language-site');

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

    deleteWordset: function (_id) {
        WordSet.find(_id).remove().exec();
    },

    // Create or Update word

    createOrUpdateWord: function (_id, word, translation) {

        WordSet.findOneAndUpdate(
            { _id: _id, 'words.w': { $ne: word } },
            { $addToSet: { words: { w: word, t: translation } } },
            function (err, doc) { console.log(doc) }
        );

        WordSet.update(
            { _id: _id, 'words.w': word },
            { $set: { 'words.$.w': word, 'words.$.t': translation } },
            function (err, doc) { console.log(doc) }
        );
    }

    // Get all wordsets

}

