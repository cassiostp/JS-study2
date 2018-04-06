var express = require('express');
var router = express.Router();
var authors = require('../controllers/author.controller');

router.get('/', authors.findAll);

router.post('/', authors.create);

router.get('/:authorId', authors.findOne);

router.put('/:authorId', authors.update);

router.delete('/:authorId', authors.delete);

module.exports = router;