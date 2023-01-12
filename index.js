const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const app = express();
const port = 8000;
//const expressLayouts = require('express-ejs-layouts');
//this will help to use the static file like css images etc
app.use(express.static('./assets'));

//app.use(expressLayouts);
//extract style and scripts from sub pages into the layouts
//app.set('layouts extractStyle', true);
//app.set('layout extractScripts', true);

//this will used to encoded the query and params that are entered by the user
app.use(express.urlencoded());

app.use(cookieParser());
//use express router
app.use('/', require('./routes'));



//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

// listening the port and starting the server from here 
app.listen(port, function(err){
    if(err){
      console.log("Error: ", err);  
    }
    console.log("########Serever is running on port: ", port, "##########");
});