var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../lib/db')
var WordSet = require('../models/wordset');
var Sentence = require('../models/sentences');

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Language Site' });
});

router.get('/wordsets', function (req, res, next) {
    WordSet.find(function (err, doc) {
        res.render('wordsets', { data: doc });
    });
});

// Add wordset
router.post('/wordsets/add', function (req, res) {
    db.createWordset(req.body.name, function (success) {
        if (success) {
            res.redirect('/wordsets');
        } else {
            res.end('{"error": "duplicate wordset"}')
        }
    });
});

// Delete wordset
router.post('/wordsets/delete', function (req, res) {
    db.deleteWordset(req.body._id, function () {
        res.redirect('/wordsets');
    });
});

// Wordset page
router.get('/wordset/:_id', function (req, res, next) {
    WordSet.findById(req.params._id, function (err, doc) {
        res.render('wordset', { data: doc });
    });
});

// Add new word/translation
router.post('/wordset/add', function (req, res, next) {
    db.newWord(req.body._id, req.body.w, req.body.t, function (data) {
        console.log(data);
        res.end(JSON.stringify(
            {
                status: 200,
                replace: data.replace,
                _id: data.word_id
            }
        ));
    });
});

// Delete word
router.post('/wordset/delete-word', function (req, res, next) {
    db.deleteWord(req.body._id, req.body.word_id, function (data) {
        res.end(JSON.stringify({ status: 200 }));
    });
});

// Sentences page
router.get('/sentences', function (req, res, next) {
    Sentence.find(function (err, doc) {
        res.render('sentences', { data: doc });
    });
});

// Add sentence
router.post('/sentences/add', function (req, res, next) {
    Sentence.create(req.body, function (err) {
        if (err) console.log(err);
        res.end(JSON.stringify({ status: 200 }));
    });
});

// Delete sentence
router.post('/sentences/delete', function (req, res, next) {
    Sentence.findById(req.body._id).remove(function () {
        res.end(JSON.stringify({ status: 200 }));
    })
});


// Practice
router.get('/practice', function (req, res, next) {
    Sentence.find(function (err, sentences) {
        WordSet.find(function (err, wordsets) {
            res.render('practice', {
                data: {
                    sentences: sentences,
                    wordsets: wordsets
                }
            });
        });
    });
})

module.exports = router;
