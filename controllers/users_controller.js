module.exports.profile = function(req, res){
    return res.end('<h1>User Profile</h1>');
}

// render the signin page
module.exports.sigin = function(req, res){
    return res.render('user_sign-in',{
        title:"FoodRunner | sign in"
    });
}


// render the signup page
module.exports.signup = function(req, res){
    return res.render('user_sign-up',{
            title:"FoodRunner | Sign up"
    });
}