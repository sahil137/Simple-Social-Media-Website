const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async (req, res) => {
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success', 'Post created successfully');
        return res.redirect('back');
    }
    catch(err){
        // console.log("error:", err);
        req.flash('error', 'Error in creating post');
        return;
    }
};

module.exports.destroy = async (req, res) => {
    try{
        let post = await Post.findById(req.params.id);
            // .id is converting the object id into a string
        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({
                post: req.params.id
            });
            req.flash('success', 'Post deleted');
            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("error:", err);
        return;
    }
};
