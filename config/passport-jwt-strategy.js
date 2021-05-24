const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken,
    secret: 'codeforum'
}


passport.use(new JWTStrategy(opts, (jwtPayLoad, done) => {

    User.findById(jwtPayLoad._id, (err, user) => {
        if (err){
            console.log('Error in finding user from JWT');
            return;
        }
        if (user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });


}));



module.exports = passport;