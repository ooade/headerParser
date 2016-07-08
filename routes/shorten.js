var express = require('express');
var router = express.Router();
var shorten = require('../controllers/shorten.controller');

/* Get  */
router.get('/', function(req, res, next) {
  res.json({ error: "Pass in the url", reference: `http://${req.hostname}`});
});

router.get('/*', function(req, res, next) {
  var url = req.params['0'];
  if (isUrlValid(url)) {
    shorten.addUrl(req, res, url);
  } else {
    res.json({ error : "Not a valid Url" });
  }
});

function isUrlValid(userInput) {
    var g = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (g === null)  return false;
    else return true;
}

module.exports = router;
