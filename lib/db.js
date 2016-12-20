var mongoose = require('mongoose');
var WordSet = require('../models/word-set');
var env = require('../env');

mongoose.connect('mongodb://' + env.user + ':' + env.pass + '@ds133428.mlab.com:33428/language-site');

var name = 'test5';



// Create wordset

function createWordset(name) {
    WordSet.find({ name: name }, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            if (docs.length == 0) {
                var wordset = new WordSet({ name: name, words: [] });
                wordset.save(function () {
                    console.log('Created new wordset for ' + name);
                });
            }
        }
    });
}


// Find WordSet


// Delete wordset

// Create word

// Delete word