var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index!');
  res.render('layout', null);
});

router.get('/login', function(req, res, next) {
  res.render('login', null);
});

module.exports = router;
