var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index!');
  res.render('login', null);
});

router.get('/main', function(req, res, next) {
  res.render('layout', {view:'main',result:null});
});

module.exports = router;
