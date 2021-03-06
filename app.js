
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var keyAleatoria1= "dgdfgdfgdfgdfgdfg"+ Math.round(Math.random()*100000000);
var keyAleatoria2= "cdsadfwryatyesdfsdf" + Math.round(Math.random()*100000000);

// view engine setup
app.use(cookieSession({
  name: 'campurriana', //Nombre que recibe la cookie
  
  keys:[keyAleatoria1,keyAleatoria2],
  maxAge: 2*60*60*1000 //duracion en milisegundos de la validez de la cookie
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.use(cookieParser());


module.exports = app;
