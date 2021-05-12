const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res){
    // Post.find({}, function(err, post){
    //     return res.render('home', {
    //         title: "Code Forum | Home",
    //         posts: post
    //     });
    // });
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, post){
        User.find({}, (err, users) => {
            return res.render('home', {
                title: "Code Forum | Home",
                posts: post,
                all_users: users
            });
        });
    });
};