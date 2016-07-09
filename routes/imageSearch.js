var express = require('express');
var router = express.Router();

/* Get imageSearch details */
router.get('/', function(req, res, next) {
  console.log("imagesearch read.y..");
  // res.json({ ip_address, language, operating_system });
});

module.exports = router;
