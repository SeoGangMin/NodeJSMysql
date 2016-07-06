var express = require('express');
var router = express.Router();

var Mysql      = COMMONS.MysqlWrapper
    ,IdeaQuery = QUERIES.IdeaQuery
    ,UserQuery = QUERIES.UserQuery;


/* GET home page. */
router.get('/', function(req, res, next) {
  /*
  if(req.session && req.session.user){
    res.redirect('/guest/home');
  }else{
    res.render('index', null);
  }
  */
  res.render('index', null);
});

router.post('/login', function(req, res, next) {
  var params = req.body;

  var auth_number = CONFIGS.AUTH_NUMBER;

  //auth fail
  if(params['auth_number'] != auth_number){
    res.status(403).send();
  }
  //auth success
  else{

    var query = UserQuery.selectOneUser(params);
    Mysql.execQueryPromise(query)
    .then(
      function(rows){
        console.log(rows);
        if(rows.length == 0){
          query = UserQuery.insertUser(params);
          return PromiseWrapper.joinUser(query);
        }else{
          return {user:rows[0], code : 200};
        }
      }
    )
    .then(
      function(user){
        console.log('logon user : ' + JSON.stringify(user));
        req.session.user = user.user;
        res.status(200).send(user);
      }
    )
    .fail(
      function(err){
        next(err);
      }
    );
  }
});

module.exports = router;
