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
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


passport.use(new FacebookStrategy({
    clientID: '607721983380145',
    clientSecret: 'fb91598a10de07dab412e94a23bb5cc5',
    callbackURL: '/auth/facebook/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        if (await User.findOne({'facebook_id': profile.id})) return console.log('This account is already registered!');
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
