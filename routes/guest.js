var express = require('express');
var router = express.Router();

var Mysql      = COMMONS.MysqlWrapper
    ,IdeaQuery = QUERIES.IdeaQuery;


/* GET home page. */
router.get('/home', function(req, res, next) {
  var query = IdeaQuery.selectAllIdea();
  var writer_idx = req.session.user.idx;
  Mysql.execQueryPromise(query)
  .then(
    function(rows){
      if(rows.length > 0){
        for(var i in rows){
          var item = rows[i];
          if(rows[i]['writer_idx'] == writer_idx){
            rows[i]['is_author'] = 1;
          }else{
            rows[i]['is_author'] = 0;
          }
        }
      }
      res.render('layout', {view:'home/HOME_GUEST',result:{idea_list : rows}});
    }
  )
  .fail(
    function(err){
      next(err);
    }
  );
});

router.get('/vote', function(req, res, next){
  var fkey_user_idx = req.session.user.idx;

  var query = IdeaQuery.selectAllIdeaWithUser({fkey_user_idx : fkey_user_idx});
  var result = {};
  Mysql.execQueryPromise(query)
  .then(
    function(rows){
      result['idea_list'] = rows;
      query = IdeaQuery.selectUsedVoteCount({fkey_user_idx:fkey_user_idx});
      return Mysql.execQueryPromise(query);
    }
  )
  .then(
    function(rows){
      result['own_vote_count'] = 3 - Number(rows[0]['used_vote_count']);
      res.render('layout', {view:'idea/IDEA_VOTE',result:result});
    }
  )
  .fail(
    function(err){
      next(err);
    }
  );
});

router.post('/idea_vote', function(req, res, next){
  var fkey_user_idx = req.session.user.idx;
  var fkey_idea_idx = req.body.idx;
  var obj = {
    fkey_user_idx : fkey_user_idx
    ,fkey_idea_idx : fkey_idea_idx
  };
  var query = IdeaQuery.insertIdeaVote(obj);
  Mysql.execQueryPromise(query)
  .then(
    function(inserted){
      res.redirect('/guest/vote');
    }
  )
  .fail(
    function(err){
      next(err);
    }
  );
});

router.get('/teamchoice', function(req, res, next){

  var fkey_user_idx = req.session.user.idx;

  var query = IdeaQuery.selectAllIdeaWithUser({fkey_user_idx : fkey_user_idx});
  var result = {};
  Mysql.execQueryPromise(query)
  .then(
    function(rows){
      result['idea_list'] = rows;
      query = IdeaQuery.selectUsedVoteCount({fkey_user_idx:fkey_user_idx});
      return Mysql.execQueryPromise(query);
    }
  )
  .then(
    function(rows){
      result['own_vote_count'] = 3 - Number(rows[0]['used_vote_count']);
      res.render('layout', {view:'team/TEAM_CHOICE',result:result});
    }
  )
  .fail(
    function(err){
      next(err);
    }
  );  
});


router.post('/insert_idea', function(req, res, next){
  var params = req.body;
  params['writer_idx'] = req.session.user.idx;

  var query = IdeaQuery.insertIdea(params);

  Mysql.execQueryPromise(query)
  .then(
    function(inserted){
      var is_success = inserted['insertId'];
      res.redirect('/guest/home');
    }
  )
  .fail(
    function(err){
      next(err);
    }
  );
});

router.post('/delete_idea', function(req, res, next){
  var params = req.body;
  params['writer_idx'] = req.session.user.idx;
  var query = IdeaQuery.deleteIdea(params);
  Mysql.execQueryPromise(query)
  .then(
    function(deleted){
      res.redirect('/guest/home');
    }
  )
  .fail(
    function(err){
      next(err);
    }
  );
});

//deprecated
router.get('/idea_list_all', function(req, res, next){
  var query = IdeaQuery.selectAllIdea();
  var writer_idx = req.session.user.idx;
  Mysql.execQueryPromise(query)
  .then(
    function(rows){
      if(rows.length > 0){
        for(var i in rows){
          var item = rows[i];
          if(rows[i]['writer_idx'] == writer_idx){
            rows[i]['is_author'] = 1;
          }else{
            rows[i]['is_author'] = 0;
          }
        }
      }

      res.status(200).send({idea_list : rows});
    }
  )
  .fail(
    function(err){
      next(err);
    }
  )
});

module.exports = router;
