const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});

        if (!user || user.password != req.body.password){
            return res.json(402, {
                message: "Invalid username/ passsword"
            });
        }

        return res.json(200, {
            message: 'Sign-in successful, here is your token',
            data: {
                token: jwt.sign(user.toJSON(), 'codeforum', {
                    expiresIn: '100000'
                })
            }
        })


    }
    catch(err){
        console.log("******", err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}
