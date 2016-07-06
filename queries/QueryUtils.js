module.exports = {
  maxIdx : function(table_name){
    var query = [];
        query.push('(SELECT IFNULL(MAX(idx), 0)+1 FROM ');
        query.push(table_name);
        query.push(') ');
    return query.join('');
  }
}
