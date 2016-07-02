var express = require('express');
var router = express.Router();

var multer = require('multer'); // multer
var upload = multer({dest: './upload_data/'});
var mime = require('mime');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('upload', {
		title: 'Image Uploader'
	});
});

// /upload POST時のアップロード処理
router.post('/', upload.single('testfile'), function (req, res) {
	var file_mimetype = mime.extension(req.file.mimetype);
	var file_path = req.file.path + '.' + file_mimetype;
	res.render('uploaded', {
		file_originalname: req.file.originalname,
		file_name: req.file.filename,
		file_path: file_path,
		file_mimetype: file_mimetype,
		title: 'UPLOAD完了'
	});
});
module.exports = router;
