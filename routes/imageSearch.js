var express = require('express');
var router = express.Router();
var axios = require('axios');
var Image = require('../controllers/image.controller');

/** We'll stick to ES5 since we're not transpiling to babel **/
var BING_API_KEY = "902f50f9ce7d423289d56cad82c5ce50";

/* Get imageSearch details */
router.get('/:searchQuery', function(req, res, next) {
  var searchQuery = req.params.searchQuery;
  var offset = req.query.offset;

  var isOffset = offset ? `&offset=${offset}` : '';

  axios.get(`https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${searchQuery}&count=10&${isOffset}`, {
    headers: { 'Ocp-Apim-Subscription-Key': BING_API_KEY }
  })
    .then(function(response) {
      // console.log("done...");
      var array = response.data.value;

      var result = array.map(function(data){
        return {
          image: data.contentUrl,
          snippet: data.name,
          pageUrl: data.hostPageUrl,
          thumbnail: data.thumbnailUrl
        };
      });

      /** Once Request Completes
          Push Requested Image term to DB
          return the JSON formatted response
      **/
      Image.addImageTerm(req, res, searchQuery);
      res.json(result);
    });
});

module.exports = router;
