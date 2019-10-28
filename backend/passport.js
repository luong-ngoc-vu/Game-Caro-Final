const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passport = require('passport');
const User = mongoose.model('users');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id).then(user => {
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    })
        .catch(err => console.error(err));
}));

passport.use(
    new GoogleStrategy({
        clientID: "986011408031-isjggsols6ipv1vgr2vlf2qi06d1703o.apps.googleusercontent.com",
        clientSecret: "M9lvUADkvxfwHqI2pZcvFdvA",
        callbackURL: "http://localhost:3000/auth/google/callback"
    }, (profile, done) => {
        if (profile.id) {
            User.findOne({googleId: profile.id})
                .then((existingUser) => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new User({
                            googleId: profile.id,
                            email: profile.emails[0].value,
                            name: profile.name.familyName + ' ' + profile.name.givenName
                        }).save().then(user => done(null, user));
                    }
                })
        }
    })
);