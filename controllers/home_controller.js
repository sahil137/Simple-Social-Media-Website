const Post = require('../models/post');

module.exports.home = function(req, res){
    // Post.find({}, function(err, post){
    //     return res.render('home', {
    //         title: "Code Forum | Home",
    //         posts: post
    //     });
    // });
    Post.find({}).populate('user').exec(function(err, post){
        return res.render('home', {
            title: "Code Forum | Home",
            posts: post
        });
    });
};