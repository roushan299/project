const Post = require('../models/post');
const Comment = require('../models/comment');
const { request } = require('express');

module.exports.create = async function(req, res){
    try {
   let post = await Post.create({
        content:req.body.content,
        user:req.user._id
    });
    req.flash('success','Post created successfully');
    return res.redirect('back');
    }catch(err){
        request.flash('error', err);
        //console.log('Error', err);
        return;
    }
}

module.exports.destroy = async function(req, res){
    try{
     let post = await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
             await Comment.deleteMany({post:req.params.id});
                req.flash('success','Post and associated comment deleted successfully');
                return res.redirect('back');
        }else{
            req.flash('error','You are not authorized to delete this post');
            return res.redirect('back');
        }
    }catch(err){
        request.flash('error', err);
        //console.log('Error', err);
        return;
    }
}