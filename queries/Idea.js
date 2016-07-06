var util = require('util');
var QueryUtils = require('./QueryUtils');

module.exports = {
  selectAllIdea : function(){
    var query = [];
        query.push('SELECT ');
        query.push('A.idx ');
        query.push(',A.title ');
        query.push(',A.description ');
        query.push(',B.idx AS writer_idx ');
        query.push(',B.name AS writer_name ');
        query.push('FROM tb_idea A ');
        query.push('LEFT JOIN tb_user B ON A.writer_idx = B.idx ');
        query.push('ORDER BY A.created_dt DESC ');

    return query.join('');

  }

  ,selectAllIdeaWithUser : function(obj){
    var fkey_user_idx = obj['fkey_user_idx'];
    var query = [];
        query.push('SELECT ');
        query.push('A.idx ');
        query.push(',A.title ');
        query.push(',A.description ');
        query.push(',B.idx AS writer_idx ');
        query.push(',B.name AS writer_name ');
        query.push(',(');
        query.push('SELECT COUNT(idx) FROM tb_idea_vote WHERE fkey_idea_idx=A.idx');
        query.push(') AS vote_count ');
        query.push(',(');
        query.push(util.format('SELECT COUNT(idx) FROM tb_idea_vote WHERE fkey_user_idx=%d AND fkey_idea_idx=A.idx', fkey_user_idx));
        query.push(') AS is_vote ');
        query.push('FROM tb_idea A ');
        query.push('LEFT JOIN tb_user B ON A.writer_idx = B.idx ');
        query.push('ORDER BY A.created_dt DESC ');

    return query.join('');

  }

  ,selectUsedVoteCount : function(obj){
    var fkey_user_idx = obj['fkey_user_idx'];
    var query = [];
        query.push(util.format('SELECT COUNT(idx) AS used_vote_count FROM tb_idea_vote WHERE fkey_user_idx=%d', fkey_user_idx));

    return query.join('');
  }

  ,insertIdeaVote : function(obj){
    var fkey_user_idx = obj['fkey_user_idx'];
    var fkey_idea_idx = obj['fkey_idea_idx'];

    var query = [];
        query.push('INSERT INTO tb_idea_vote(');
        query.push('idx ');
        query.push(',fkey_user_idx ');
        query.push(',fkey_idea_idx ');
        query.push(',created_dt ');
        query.push(',updated_dt ');
        query.push(') ');

        query.push('SELECT ');
        query.push(QueryUtils.maxIdx('tb_idea_vote'));
        query.push(util.format(',%d ', fkey_user_idx));
        query.push(util.format(',%d ', fkey_idea_idx));
        query.push(',CURRENT_TIMESTAMP() ');
        query.push(',CURRENT_TIMESTAMP() ');
        query.push('FROM DUAL ');
        query.push('WHERE 3 > (');
        query.push(util.format('SELECT COUNT(idx) FROM tb_idea_vote WHERE fkey_user_idx=%d', fkey_user_idx));
        query.push(')');

    return query.join('');
  }

  ,insertIdea : function(obj){
    var writer_idx = obj['writer_idx'];
    var title      = obj['title'];
    var description = obj['description'];

    title       = title.replace(/\"/g,'\\"').replace(/\'/g,"\\'");
    description = description.replace(/\"/g,'\\"').replace(/\'/g,"\\'");

    var query = [];
        query.push('INSERT INTO tb_idea( ');
        query.push('idx ');
        query.push(',title ');
        query.push(',description ');
        query.push(',writer_idx ');
        query.push(',created_dt ');
        query.push(',updated_dt ');
        query.push(') ');
        query.push('SELECT ');

        query.push(QueryUtils.maxIdx('tb_idea'));
        query.push(util.format(',"%s" ', title ));
        query.push(util.format(',"%s" ', description ));
        query.push(util.format(',%d ', writer_idx ));

        query.push(',CURRENT_TIMESTAMP() ');
        query.push(',CURRENT_TIMESTAMP() ');
        query.push('FROM DUAL ');

    return query.join('');
  }

  ,deleteIdea : function(obj){
    var idx        = obj['idx'];
    var writer_idx = obj['writer_idx'];

    var query = [];
        query.push('DELETE ');
        query.push('FROM tb_idea ');
        query.push('WHERE ');
        query.push(util.format('idx=%d ', idx));
        query.push(util.format('AND writer_idx=%d ', writer_idx));

    return query.join('');
  }
}
