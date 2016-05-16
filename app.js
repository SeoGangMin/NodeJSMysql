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

global.CONFIG  = require('./config');
global.COMMONS = require('./commons');
global.QUERIES = require('./queries');

var app           = express()
    ,logFile      = fs.createWriteStream(__dirname + '/logs/server.log', {flags:'a'})
    ,redisClient  = redis.createClient();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({
      host    : CONFIG.REDIS.host
      ,port   : CONFIG.REDIS.port
      ,client : redisClient
      ,ttl    :  260
    }),
    saveUninitialized: false,
    resave: false
}));
app.use(logger('dev',{stream:logFile}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var index = require('./routes/index');
var users  = require('./routes/users');
var book  = require('./routes/book');


app.use('/', index);
app.use('/users', users);
app.use('/book', book);

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
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(1337);

module.exports = app;
