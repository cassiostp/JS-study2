var express = require('express');
var router = express.Router();
var books = require('../controllers/book.controller');

router.get('/(.json)?', function(req, res) {
	if(req.path === '/.json') {
		books.findAll(req, res);
	} else {
		res.render('books');
	}
});

router.post('/', books.create);

router.get('/:bookId', books.findOne);

router.put('/:bookId', books.update);

router.delete('/:bookId', books.delete);

module.exports = router;
