const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const app = express();
const port = 8000;
//use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');
// this will help to use the express layouts to manage similar pattern desgin in the views
const expressLayouts = require('express-ejs-layouts');
//this will help to save the session so that user cant automatically logout when server restarts
const MongoStore = require('connect-mongo');
// this is used for the flash messages that make user interaction good
const flash = require('connect-flash');
const customMware = require('./config/middleware');
//this will help to use the static file like css images etc
app.use(express.static('./assets'));
// calling expresslayouts to use layouts, headers and footers
app.use(expressLayouts);
//extract style and scripts from sub pages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//this will used to encoded the query and params that are entered by the user
app.use(express.urlencoded());

app.use(cookieParser());

//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');
//mongo store is used to store the session cookie in the db
app.use(session({
  name: 'FoodRunner',
  secret:'blah',
  saveUninitialized:false,
  resave:false,
  cookie:{maxAge:(1000*60*100)},
  store: MongoStore.create({
    mongoUrl:'mongodb://127.0.0.1:27017/test',
    autoRemove:'disabled'
  }, function(err){
    console.log(err ||'connect-mongodb setup ok');
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setflash);
//use express router
app.use('/', require('./routes'));

// listening the port and starting the server from here 
app.listen(port, function(err){
    if(err){
      console.log("Error: ", err);  
    }
    console.log("########Serever is running on port: ", port, "##########");
});