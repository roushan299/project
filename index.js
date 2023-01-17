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
//this will help to use the static file like css images etc
app.use(express.static('./assets'));
// calling expresslayouts to use layouts, headers and footers
app.use(expressLayouts);
//extract style and scripts from sub pages into the layouts
//app.set('layouts extractStyle', true);
//app.set('layout extractScripts', true);

//this will used to encoded the query and params that are entered by the user
app.use(express.urlencoded());

app.use(cookieParser());

//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
  name: 'FoodRunner',
  secret:'blah',
  saveUninitialized:false,
  resave:false,
  cookie:{maxAge:(1000*60*100)}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//use express router
app.use('/', require('./routes'));

// listening the port and starting the server from here 
app.listen(port, function(err){
    if(err){
      console.log("Error: ", err);  
    }
    console.log("########Serever is running on port: ", port, "##########");
});