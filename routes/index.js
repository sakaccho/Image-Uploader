var express = require('express');
var router = express.Router();

// original
var title = 'Image Uploader';

// mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mydataSchema = new Schema({
	'name': String,
	'mail': String,
	'memo': String
});
var MyData = mongoose.model('mydata', mydataSchema);

var db = mongoose.connect('mongodb://localhost/mydb');

/* GET home page. */
router.get('/', function (req, res, next) {
	MyData.find(function (err, docs) {
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: title,
			msg: 'データの一覧リスト',
			datas: docs
		});
	});
});

router.post('/', function (req, res, next) {
	var name = req.body.name;
	var mail = req.body.mail;
	var memo = req.body.memo;

	var data = new MyData({
		'name': name,
		'mail': mail,
		'memo': memo
	});
	data.save(function (err) {
		if (err) {
			console.log(err);
		}
		res.redirect('/');
	});
});

router.get('/edit/:id', function (req, res, next) {
	var id = req.params.id;
	MyData.findOne({
		'_id': id
	}, function (err, doc) {
		if (err) {
			console.log(err);
		}
		res.render('edit', {
			title: title,
			msg: 'データの更新',
			data: doc
		});
	});
});

router.post('/update', function (req, res, next) {
	var id = req.body.id;
	var name = req.body.name;
	var mail = req.body.mail;
	var memo = req.body.memo;
	MyData.findOne({
		'_id': id
	}, function (err, doc) {
		if (err) {
			console.log(err);
		}
		doc.name = name;
		doc.mail = mail;
		doc.memo = memo;
		doc.save(function (err) {
			if (err) {
				console.log(err);
			}
			res.redirect('/');
		});
	});
});

router.get('/delete/:id', function (req, res, next) {
	var id = req.params.id;
	MyData.findOne({
		'_id': id
	}, function (err, doc) {
		if (err) {
			console.log(err);
		}
		res.render('delete', {
			title: title,
			msg: "データの削除",
			data: doc
		});
	});
});

router.post('/remove', function (req, res, next) {
	var id = req.body.id;
	MyData.findOne({
		'_id': id
	}, function (err, doc) {
		if (err) {
			console.log(err);
		}
		doc.remove(function (err) {
			if (err) {
				console.log(err);
			}
			res.redirect('/');
		});
	});
});

module.exports = router;
