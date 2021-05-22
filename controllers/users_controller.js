const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, (err, user) => {
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    });
};

module.exports.update = async (req, res) => {
    if (req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err){
                    console.log('**Multer Error', err);
                }

                user.name = req.body.name,
                user.email = req.body.email

                if (req.file){
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }

                user.save();
                return res.redirect('back');

            });
        }
        catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Code Forum | Sign Up"
    })
}
// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Code Forum | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({
        email: req.body.email
    }, function(err, user){
        if (err){
            console.log('Error in finding user in signing up');
            return;
        }

        if (!user){
            User.create(req.body, function(err, user){
                if (err){
                    console.log('Error in creating user');
                    return
                }

                return res.redirect('/users/sign-in');
            });
        }
        else {
            return res.redirect('back');
        }


    });

}

// Sign in and create session for user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logOut();
    req.flash('success', 'Logged out Successfully');
    return res.redirect('/');
}