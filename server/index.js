// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');
var cookieParser = require('cookie-parser')
var session = require('express-session')
app.use(cookieParser());

var cron_work = require('./cron.js');
var cron = require('node-cron');
cron.schedule('0 */1 * * *', () => {
	cron_work.settle();
	//console.log('running a task every minute');
  
});
/*
app.use(session({
  secret: "",
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: false,
      maxAge: 360000,
      // allow the cookie to be sent via HTTP ("true" means "HTTPS only)
      sameSite: 'none'
  }
}));
*/
app.use((req, res, next) => {
  //res.cookie({ sameSite: 'strict', secure: true });
  // And set the same value in the legacy cookie
  //res.cookie({ secure: true });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers" , "Origin, X-Requested-With, x-token-secret, x-csrf-token, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Credentials', false);
  next();
});

// * * * * * : run a task every minute
// */2 * * * * : running a task every two minutes
// 0 */1 * * * : running a task every hour

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`);
  });
}

module.exports = app;



