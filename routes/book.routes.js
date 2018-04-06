var express = require('express');
var router = express.Router();
var books = require('../controllers/book.controller');

router.get('/', books.findAll);

router.post('/', books.create);

router.get('/:bookId', books.findOne);

router.put('/:bookId', books.update);

router.delete('/:bookId', books.delete);

module.exports = router;
