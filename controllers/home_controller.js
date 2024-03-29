const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req, res){
    try{
        let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    
        let users = await User.find({});
    
        return res.render('home', {
            title: "Code Forum | Home",
            posts: post,
            all_users: users
        });
    }
    catch(err){
        console.log(`Error: ${err}`);
    }

};