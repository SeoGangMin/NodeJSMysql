var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('layout', {view:'./book/BOOK_ADDBOOK00', result:null});
});

module.exports = router;
