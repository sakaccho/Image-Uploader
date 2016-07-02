var express = require('express');
var router = express.Router();

var multer = require('multer');

/* GET home page. */
router.get('/', function (req, res, next) {
	console.log(
		'originalUrl: ' + req.originalUrl + '\n' +
		'mimetype: ' + req.file.mimetype
	);
	res.end();
});

module.exports = router;
