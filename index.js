const { urlencoded } = require('express');
const express = require('express');
const db = require('./config/mongoose');
const app = express();
const port = 8000;
//this will help to use the static file like css images etc
app.use(express.static('assets'));

//this will used to encoded the query and params that are entered by the user
app.use(express.urlencoded);
//use express router
app.use('/', require('./routes'));



//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');


app.listen(port, function(err){
    if(err){
      console.log("Error: ", err);  
    }
    console.log("########Serever is running on port: ", port, "##########");
});