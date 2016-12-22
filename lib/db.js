var WordSet = require('../models/word-set');

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