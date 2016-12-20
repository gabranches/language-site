var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var env = require('../env');
mongoose.connect('mongodb://'+env.user+':'+env.pass+'@ds133428.mlab.com:33428/language-site');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
