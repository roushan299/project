const { model } = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//here is used of database schema to check userid and password
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email',
    //used for taking req in the call back function
    passReqToCallback: true
    },
    function( req, email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
               // console.log('!!!Error in finding user in db ---> passport !!!');
                return done(err);
            }
            if(!user || user.password != password){ 
                //console.log('!!!Invalid username/password!!!');
                req.flash('error', 'Invalid username/password');    
                return done(null, false);
            }
            return done(null, user);
        });
    }));

//seializing the user to decide which key is to kept in the cookies
passport.serializeUser(function(user, done){
        return done(null, user.id);
    });

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('!!!Errorn in finding the userid from the db---> passport');
            return done(err);
        }
        return done(null, user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user conatins the current signed in user from the session cookie and we are just sending this to locals for the 
        //views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;