var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../lib/db')
var WordSet = require('../models/word-set');

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Language Site' });
});

router.get('/wordsets', function (req, res, next) {
    WordSet.find(function (err, doc) {
        console.log(err);
        console.log(doc);
        res.render('wordsets', { data: doc });
    });
});

// Add wordset

router.post('/wordsets/add', function (req, res) {
   db.createWordset(req.body.name, function() {
       res.redirect('/wordsets');
   });
});

// Delete wordset

router.post('/wordsets/delete', function (req, res) {
   db.deleteWordset(req.body._id, function() {
       res.redirect('/wordsets');
   });
});

// Wordset page

router.get('/wordset/:_id', function (req, res, next) {
    WordSet.findById(req.params._id, function(err, doc) {
        res.render('wordset', { data: doc });
    });
});

// Add new word/translation

router.post('/wordset/add', function (req, res, next) {
    db.newWord(req.body._id, req.body.w, req.body.t, function() {
        res.end('{"success" : "Updated Successfully", "status" : 200}');
    });
});


router.get('/sentences', function (req, res, next) {
    res.render('sentences', { title: 'Language Site' });
});

module.exports = router;