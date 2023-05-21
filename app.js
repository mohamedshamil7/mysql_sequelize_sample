var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var debug = require('debug')('mysqlnode:server');
var usersRouter = require('./routes/users');
const connection= require("./config/db")
const synchronize_All_Models = require("./config/tables")
const  authenticate_sequelize =async()=>{
try {
    
  await connection.authenticate();
  console.log('Connection has been established successfully.');
  await synchronize_All_Models()

} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
authenticate_sequelize()

var app = express();


var server = http.createServer(app);
// var port = normalizePort(process.env.PORT || '3000');
var port= '3001'
// app.set('port', port);




server.listen(port,(()=>{
  console.log('Server is running on port '+port);
}));
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    // throw error;
    console.log(error);
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(createError(404));
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
