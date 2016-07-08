var Shortener = require('../models/shortener');
var crypto = require('crypto');
var uri = require('url');

exports.addUrl = function(req, res, url) {
  var url = url.toLowerCase();
  var urlProtocol = uri.parse(url).protocol;
  var pureUrl;

  switch (urlProtocol) {
    case "https:":
      pureUrl = url.slice(8, url.length);
      break;
    case "http:":
      pureUrl = url.slice(7, url.length);
      break;
    default:
      pureUrl = url;
      url = `http://${url}`; // If no protocol found, give it one ;)
  }

  Shortener.findOne({ 'original_url': url }, function(err, shorten) {
    if (err) { throw err; }
    if (shorten) {
      res.json({ original_url: shorten.original_url, short_url: `http://${req.hostname}/${shorten.short_url}` });
    }
    else {
            var short_url = crypto.createHash('md5').update(url).digest('hex').slice(-5);
            var newShortener = new Shortener();

            newShortener.original_url = url;
            newShortener.short_url = short_url;
            newShortener.save(function(err) {
              if (err) { res.json({error: "Contact Admin: marhyorh@gmail.com"}) }

              res.json({ original_url: url, short_url: `http://${req.hostname}/${short_url}` });
            });
    }
  });
}

exports.checkUrl = function(req, res, url) {
  Shortener.findOne({ 'short_url': url }, function(err, shorten) {
    if (err) { throw err; }

    if (shorten) {
      res.writeHead(307, { 'Location': shorten.original_url });
      res.end();
    }
    else {
      res.json({ error: "Short url do not exist!" });
    }
  });
}
