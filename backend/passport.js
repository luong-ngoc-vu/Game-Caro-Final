const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
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

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: '2404011263146464',
    clientSecret: '05be891d2222043f21e5c6201149074b',
    callbackURL: '/auth/facebook/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    try {
        if (await User.findOne({'facebookId': profile.id})) return console.log('This account is already registered!');
        const email = profile.emails[0].value;
        const {id: facebookId, displayName: name} = profile;
        const user = await User.create({
            email,
            facebookId,
            name
        });
        await user.save();
        console.log(user)
    } catch (error) {
        done(error, false, error.message)
    }
}));
