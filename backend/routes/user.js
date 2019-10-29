const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../model/user');

router.post('/register', function (req, res) {

    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {
            const newUser = new User({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user._id,
                            email: user.email,
                            name: user.name
                        };
                        jwt.sign(payload, 'secret', {
                            expiresIn: 1314000
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    } else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

// Google OAUTH
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'], session: false
}));

// Google Redirect Callback
router.get('/auth/google/callback', passport.authenticate('google',
    {failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/userInformation');
    });

router.get('/me', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const email = req.user.email;
    const dbUser = await User.findOne({email});
    return res.json(dbUser);
});

router.post('/me/update', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const email = req.user.email;
    const name = req.body.name;

    const dbUser = await User.findOne({email});
    dbUser.name = name;
    try {
        await dbUser.save();
    } catch (e) {
        return res.status(400).json(e);
    }
    res.status(200).json();
});

module.exports = router;