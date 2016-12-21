var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var env = require('../env');
var db = require('../lib/db')
var WordSet = require('../models/word-set');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Language Site' });
});

router.get('/wordsets', function (req, res, next) {
    WordSet.find(function (err, doc) {
        res.render('wordsets', { data: doc });
    });
});

router.post('/wordsets/add', function (req, res) {
   db.createWordset(req.body.name, function() {
       res.redirect('/wordsets');
   });
});

router.post('/wordsets/delete', function (req, res) {
   db.deleteWordset(req.body._id, function() {
       res.redirect('/wordsets');
   });
});

router.get('/wordset', function (req, res, next) {
    res.render('wordset', { title: 'Language Site' });
});

router.post('/wordset', function (req, res, next) {
    res.redirect('/wordset');
});

router.get('/sentences', function (req, res, next) {
    res.render('sentences', { title: 'Language Site' });
});



module.exports = router;
