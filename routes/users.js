var express = require('express');
var router = express.Router();

var Mysql           = COMMONS.MysqlWrapper
    ,UserQuery      = QUERIES.UserQuery
    ,PromiseWrapper = COMMONS.PromiseWrapper;




module.exports = router;
