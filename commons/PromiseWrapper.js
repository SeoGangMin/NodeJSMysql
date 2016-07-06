var Mysql       = require('./MysqlWrapper')
    ,UserQuery  = QUERIES.UserQuery
    ,Q          = require('q');

module.exports = {
  //회원가입 처리
  joinUser : function(query){
    var defer = Q.defer();
    Mysql.execQueryPromise(query)
    .then(
      function(inserted){
        var insertId = inserted['insertId'];
        if(!insertId){
          return null;
        }else{
          var query = UserQuery.selectOneUser({idx:insertId});
          return Mysql.execQueryPromise(query);
        }
      }
    )
    .then(
      function(rows){
        //join success
        console.log(rows)
        if(rows.length > 0){
          defer.resolve({user:rows[0], code:201});
        }
        //join fail
        else{
          defer.resolve({user:null, code:100});
        }
      }
    )
    .fail(
      function(err){
        defer.reject(err);
      }
    );

    return defer.promise;
  }
}
