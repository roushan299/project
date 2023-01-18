const User = require("../models/user");

module.exports.home = function(req, res){
    //console.log(req.cookies);
    //res.cookie('user_id',5);
    if(req.isAuthenticated()){
    return res.render('home',{
        title:"FoodRunner | Dashboard"
    });
}
    return res.redirect('/users/sign-in');
}

//module.exports.actionName = function(req, res){}