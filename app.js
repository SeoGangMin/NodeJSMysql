var express       = require('express')
    ,path         = require('path')
    ,favicon      = require('serve-favicon')
    ,logger       = require('morgan')
    ,cookieParser = require('cookie-parser')
    ,bodyParser   = require('body-parser')
    ,fs           = require('fs')
    ,redis        = require('redis')
    ,session      = require('express-session')
    ,redisStore   = require('connect-redis')(session);

global.CONFIGS = require('./config');
global.QUERIES = require('./queries');
global.COMMONS = require('./commons');


var app           = express()
    ,logFile      = fs.createWriteStream(__dirname + '/logs/server.log', {flags:'a'})
    ,redisClient  = redis.createClient(CONFIGS.REDIS.port, CONFIGS.REDIS.host)
    ,AppUtils      = COMMONS.AppUtils;

//Set Socket io
var http = require('http').Server(app);
var io   = require('socket.io')(http);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev',{stream:logFile}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret_key'
    ,cookie: { maxAge: 86400000 }
    ,store: new redisStore({
      host    : CONFIGS.REDIS.host
      ,port   : CONFIGS.REDIS.port
      ,client : redisClient
      ,ttl    :  86400000
      ,prefix : "session:"
      //,expire: 86400000
    })
    ,saveUninitialized: false
    ,resave: true
}));

app.use(function(req, res, next){

  res.session = {};
  req.session.user = {
    "idx":4,
    "name":"서강민",
    "fb_id":"1025240817569170",
    "picture":"http://graph.facebook.com/1025240817569170/picture?type=large&width=100&height=100",
    "auth":"G",
    "amount":1000000000,
    "is_team":0
  };

  if(req.session && req.session.user) {
    res.locals.session = {user:req.session.user};
    console.log('logon user : ' + JSON.stringify(res.locals.session));
  }
  else {
    res.locals.session = undefined;
  }

  next();
});

var index = require('./routes/index');
var guest  = require('./routes/guest');
//var users  = require('./routes/users');

app.use('/', index);
app.use('/guest', guest);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.listen(1337);

module.exports = app;
