const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    passwor:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
}, {
    timeStamps: true
});

const User = mongoose.model('User', userSchema);
module.exports =User;