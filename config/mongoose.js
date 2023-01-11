const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/userDetails');

const db = mongoose.connection;

db.on('error',console.error.bind('!!!!!Error connecting to db!!!!!!'));

db.once('open', function(){
    console.log('####Sucessfully conected to database#####');
});