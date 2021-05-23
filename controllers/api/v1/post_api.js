const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req, res){

    let post = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });


    return res.json(200, {
        message: "Lists of posts",
        posts: post
    });
}

module.exports.destroy = async (req, res) => {
    try{
        let post = await Post.findById(req.params.id);
            // .id is converting the object id into a string
        
        post.remove();

        await Comment.deleteMany({
            post: req.params.id
        });

        return res.json(200, {
            message: "Post Deleted"
        });
    }
    catch(err){
        console.log("error:", err);
        return res.json(500, {
            message: "Inernal Server Error"
        });
    }
};