var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index!');
  res.render('index', null);
});

router.get('/home', function(req, res, next) {
  res.render('layout', {view:'home/HOME_GUEST',result:null});
});

router.get('/vote', function(req, res, next){
  res.render('layout', {view:'idea/IDEA_GUEST_VOTE',result:null});
});

router.get('/teamchoice', function(req, res, next){
  res.render('layout', {view:'team/TEAM_GUEST_CHOICE',result:null});
});

module.exports = router;
