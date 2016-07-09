var express = require('express');
var router = express.Router();
var shorten = require('../controllers/shorten.controller');
var Image = require('../controllers/image.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { host: req['hostname'] });
});

router.get('/:shortUrl', function(req, res, next) {
  shorten.checkUrl(req, res, req.params.shortUrl);
});

router.get('/api/latest/imagesearch/', function(req, res, next) {
  Image.getImages(req, res);
});

module.exports = router;
