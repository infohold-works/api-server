var express = require('express');
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

/* GET index page. */
router.get('/', function(req, res, next) {
  res.json({message: 'Welcome to MessageBox API' });
});

module.exports = router;
