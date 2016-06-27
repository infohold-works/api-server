var express = require('express');
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

// index 页面 (路径 http://localhost:3399)
router.get('/', function(req, res, next) {
  res.json({
    message: 'Welcome to MessageBox'
  });
});

module.exports = router;
