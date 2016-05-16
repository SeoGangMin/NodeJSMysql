var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/login', function(req, res, next) {
  res.render('layout', {view:'index',result:null});
});


router.get('/home', function(req, res, next) {
  res.render('layout', {view:'./home/HOME',result:null});
});

module.exports = router;
