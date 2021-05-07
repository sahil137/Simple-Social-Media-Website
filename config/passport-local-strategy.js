const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        // find user and establish identity
        User.findOne({
            email: email
        }, function(err, user){
            if (err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password){
                console.log('Invalid Username/PassWord');
                return done(null, false);
            }

            return done(null, user);

        });
    }
));

// serialise the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// desrialize the user from the key in cookies

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if (err){
            console.log('Error in finding user -- > passport');
            return done(err);
        }
        return done(null, user);
    });
});

// check if user is authenticated

passport.checkAuthentication = function(req, res, next){
    //  if the user is signed in then pass on request to the next function
    if (req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in')
}


passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from session cookie
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;