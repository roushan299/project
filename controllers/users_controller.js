const User = require('../models/user');

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
         User.findById(req.cookies.user_id, function(err, user){
            if(err){console.log('!!!Error in fetching the cookies from the database!!!'); return res.redirect('/users/sign-in');}
            if(user){
                return res.render('user_profile',{
                    title:"FoodRunner | User profile",
                    user: user
                });
            }
            return res.redirect('/users/sign-in');
        });
    }else{
        return res.redirect('/users/sign-in');
    }
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

    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('!!!Error in finding the user in signing in!!!'); return}
         //handle user found

         if(user){
             //handle password which doesn't match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
             //handle session creation
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');
             
         }else{
             //handle user not found
             return res.redirect('back');
         }
    });

   
}