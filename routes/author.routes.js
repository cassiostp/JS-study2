var express = require('express');
var router = express.Router();
var authors = require('../controllers/author.controller');

router.use((req, res, next) => {
	if(req.user) {
		next();
	} else {
		res.render('login', { message: 'You must be logged in to access that page.' });
	}
});

router.get('/(.json)?', function(req, res) {
	if(req.path === '/.json') {
		authors.findAllJson(req, res);
	} else {
		authors.findAll(req,res);
	}
});

router.get('/:authorId.:format?', function(req, res) {
	if(req.params.format === 'json') {
		authors.findOneJson(req, res);
	} else {
		authors.findOne(req, res);
	}
});

router.post('/', authors.create);

router.put('/:authorId', authors.update);

router.delete('/:authorId', authors.delete);

module.exports = router;