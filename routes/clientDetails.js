var express = require('express');
var router = express.Router();

/* Get Client's browser details */
router.get('/', function(req, res, next) {
  var ip_address = (typeof req.headers['x-forwarded-for'] !== "undefined") ? req.headers['x-forwarded-for'] : req.connection.remoteAddress;
  var language = req.headers['accept-language'].split(',')[0];
  var browserAndOS = req.headers['user-agent'].split(')')[0];
  var operating_system = browserAndOS.split('(')[1];

  res.json({ ip_address, language, operating_system });
});

module.exports = router;
