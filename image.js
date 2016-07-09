module.exports = function(app) {
  var multer = require('multer');
  var storage = multer.diskStorage({
      destination: './uploads/', // Specifies upload location...

      filename: function (req, file, cb) {
        cb(null, '1'); // This sets an invalid filename of 1 ;)
      }
    });

  var upload = multer({ storage: storage });
  app.post('/image/upload', upload.single('file'), function (req, res, next) {
    res.json({ size: req.file.size }); // You can send any response to the user here
  });
}
