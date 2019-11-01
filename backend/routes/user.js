const express = require('express');
const router = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const dir = './public';

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
                profileImg: '',
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
                            name: user.name,
                            profileImg: user.profileImg
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

router.post('/me/update-password', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const email = req.user.email;

    const oldPassword = req.body.oldpassword;
    const newPassword = req.body.password;

    const dbUser = await User.findOne({email});
    const passwordMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(oldPassword, dbUser.password, function (err, isMatch) {
            console.log(err);
            if (err) return reject(err);
            resolve(isMatch)
        })
    });
    if (!passwordMatch) {
        return res.status(400).json({message: "Old password incorrect."});
    }
    try {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) console.error('There was an error', err);
            else {
                bcrypt.hash(newPassword, salt, async (err, hash) => {
                    if (err) console.error('There was an error', err);
                    else {
                        dbUser.password = hash;
                        await dbUser.save();
                    }
                });
            }
        });
    } catch (e) {
        return res.status(400).json(e);
    }
    res.status(200).json();
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/uploadImage', passport.authenticate('jwt', {session: false}),
    upload.single('profileImg'), async (req, res, next) => {

        const email = req.user.email;
        const fileName = req.file.filename;

        const user = await User.findOne({email});

        const url = req.protocol + '://' + req.get('host');
        user.profileImg = url + '/public/' + fileName;
        try {
            await user.save();
        } catch (e) {
            return res.status(400).json(e);
        }
    });

module.exports = router;