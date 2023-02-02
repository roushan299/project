const User = require('../models/user');
const router = require('../routes');
const passport = require('passport');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log('!!!Error in finding the user ---> user controller');
            return res.redirect('/users/sign-in');
        }
        return res.render('user_profile',{
            title:"FoodRunner | profile",
            profile_user: user
    });
    
    });
}

// render the signin page
module.exports.sigin = function(req, res){
   if(req.isAuthenticated()){
     return res.redirect('/users/profile');
   }
    return res.render('user_sign-in',{
        title:"FoodRunner | sign in"
    });
}


// render the signup page
module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
       }
    return res.render('user_sign-up',{
            title:"FoodRunner | Sign up"
    });
}

//get the sign up data
module.exports.create = function(req, res){

    //if both confirm password and password doesnt match page redirect
    if(req.body.password!=req.body.confirm_password){
            return res.redirect('back');
    }

    //finding the user in the database if found it return the user by function
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('!!!!Error in finding user in signing up'); return}

        //if user doesn't find the in the database then we create the instance of the user
        if(!user){
            User.create(req.body, function(err, user){
                if(err){ console.log('!!!!Error in creating user while sigining up'); return}
                // if user is created then we return to sign in page so that user can log in 
                return res.redirect('/users/sign-in');
            });
        }else{
            //if user is presented in the database then we redirect back 
            return res.redirect('back');
        }
    });
}

//Sign in and create the session
module.exports.createSession=function(req, res){
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}

//sign out function to destroy the session or cookie
module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if(err){
            console.log('!!!Error in loging out user ---> passpot!!!');
            return next(err);
        }
    });
    req.flash('success', 'logged out successfully');
    return res.redirect('/');
}


module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
        return res.redirect('back');
    });
    }else{
        return res.status(401).send('Unauthorized');
    }
}