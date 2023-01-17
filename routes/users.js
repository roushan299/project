const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');


router.get('/profile',passport.checkAuthentication, usersController.profile);
router.use('/', require('./hii'));

router.get('/sign-in', usersController.sigin);
router.get('/sign-up',usersController.signup);

router.post('/create', usersController.create);


//use passport as a middleware to suthenticate
router.post('/create-session', passport.authenticate('local',
    {failureRedirect: '/users/sign-in'}, ),
    usersController.createSession);
//router to sigout of the user
router.get('/sign-out',usersController.destroySession);




module.exports = router;