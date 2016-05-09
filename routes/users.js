var express = require('express');
var router = express.Router();

var Mysql  = COMMON.MysqlWrapper
    ,Query = QUERIES.Users;

/* GET users listing. */
router.get('/users', function(req, res, next) {
  var query = Query.selectAllUsers();
  Mysql.execQueryPromise(query)
  .then(
    function(rows){
      res.send('respond with a resource');
    }
  )
  .fail(
    function(err){
      next(err);
    }
  );
});

module.exports = router;
