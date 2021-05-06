module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: "User Profile"
    });
};

// render the sign up page
module.exports.signUp = function(req, res){
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
    // Todo later
}

// Sign in and create session for user
module.exports.createSession = function(req, res){
    // todo later
}