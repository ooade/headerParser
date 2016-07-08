var express = require('express');
var router = express.Router();
var shorten = require('../controllers/shorten.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { host: req['hostname'] });
});

router.get('/:shortUrl', function(req, res, next) {
  shorten.checkUrl(req, res, req.params.shortUrl);
});

module.exports = router;
