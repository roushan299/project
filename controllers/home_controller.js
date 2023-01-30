const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = function(req, res){
    //console.log(req.cookies);
    //res.cookie('user_id',5);
//     if(req.isAuthenticated()){
//     return res.render('home',{
//         title:"FoodRunner | Dashboard"
//     });
// }
//     return res.redirect('/users/sign-in');

    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log('!!!Error in fetching posts from db');
    //         return res.redirect('back');
    //     }
    //     return res.render('home', {
    //         title:'FoodRunner | Dashboard',
    //         posts:posts
    //     });
    // });

    //populate the user and the posts so that user name can be shown
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err, posts){
        User.find({}, function(err, user){
            return res.render('home', {
                title:"FoodRunner | Dashboard",
                posts:posts,
                all_users:user
            });
        });
        
    });
}

//module.exports.actionName = function(req, res){}