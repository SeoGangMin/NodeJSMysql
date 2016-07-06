var util = require('util');

/* register mysql queries */
module.exports = {
  selectAllUsers : function(){
    var query = [];
        query.push('SELECT ');
        query.push('* ');
        query.push('FROM tb_user ');
    return query.join('');
  }
  ,selectOneUser : function(obj){
    var fb_id = obj['fb_id'];
    var idx   = obj['idx'];

    var query = [];
        query.push('SELECT ');
        query.push('A.idx ');
        query.push(',A.name ');
        query.push(',A.fb_id ');
        query.push(',A.picture ');
        query.push(',A.auth ');
        query.push(',A.amount ');
        query.push(',(')
        query.push('SELECT COUNT(idx) FROM tb_team_joiner ');
        query.push(util.format('WHERE fkey_user_idx=A.idx '))
        query.push(') AS is_team ');
        query.push('FROM tb_user A ');
        query.push('WHERE 1 ');

        if(fb_id){
          query.push(util.format('AND A.fb_id="%s" ', fb_id));
        }

        if(idx){
          query.push(util.format('AND A.idx=%d ', idx));
        }

      return query.join('');
  }
  ,insertUser : function(obj){
    var name    = obj['name'];
    var fb_id   = obj['fb_id'];
    var picture = obj['picture'];

    var query = [];
        query.push('INSERT INTO tb_user(');
        query.push('name ');
        query.push(',fb_id ');
        query.push(',picture ');
        query.push(',created_dt ');
        query.push(',updated_dt ');
        query.push(') ');
        query.push('SELECT ');
        query.push(util.format('"%s"', name));
        query.push(util.format(',"%s"', fb_id));
        query.push(util.format(',"%s"', picture));
        query.push(util.format(',CURRENT_TIMESTAMP() '));
        query.push(util.format(',CURRENT_TIMESTAMP() '));
        query.push('FROM DUAL ');
        query.push('WHERE NOT EXISTS(');
        query.push('SELECT idx ');
        query.push('FROM tb_user ');
        query.push(util.format('WHERE fb_id="%s") ', fb_id));


    return query.join('');
  }
};
