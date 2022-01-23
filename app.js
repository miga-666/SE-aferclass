//用來設定這一整個server的東西
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
var session = require('express-session');

//把routes中的js拿出來用
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signUpRouter = require('./routes/signUp');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var addRouter = require('./routes/add');
var getRouter = require('./routes/api/get');

//------
var app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  //scookie: { secure: true }
}))


let db_config = {
  database: 'se_after_todo',
  host: 'localhost',
  user: 'root',
  password: ''
}


const connection = mysql.createPool(db_config);



app.use(function(req, res, next) {
  req.db = connection; //這裡需要app
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 //設定最基本的路由
 //定義根目錄
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signUp', signUpRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/add', addRouter);
app.use('/get', getRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
