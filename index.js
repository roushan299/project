const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/', require('./routes'));



//set up the view engine
app.set('view engine', 'ejs');
app.set('view','./views');


app.listen(port, function(err){
    if(err){
      console.log("Error: ", err);  
    }
    console.log("########Serever is running on port: ", port, "##########");
});