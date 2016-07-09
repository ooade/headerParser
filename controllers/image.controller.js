var Image = require('../models/image');

exports.addImageTerm = function(req, res, term) {
  Image.findOne({ 'image_term': term }, function(err, image) {
    if (err) { throw err }

    var addTerm = new Image();
    addTerm.image_term = term;
    addTerm.date = new Date();

    addTerm.save(function(err) {
      if (err) { throw err }

      res.end();
    })
  });
};

exports.getImages = function(req, res) {
  Image.find(function(err, data) {
    if (err) { throw err }

    var result = data.map(function(image) {
      return { term: image.image_term, when: image.date };
    });

    res.json(result);
  }).limit(10);
}
