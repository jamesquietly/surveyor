const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//load model class
const User = mongoose.model('users');

//use id created by mongoDB to serialize
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

//setup up login in with google
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        //async query with .then promise
        User.findOne({ googleId: profile.id }).then(existingUser => {
            //there is existing user with this id in mongoDB
            if(existingUser) {
                done(null, existingUser);
            }
            //no existing user
            else {
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
            }
        });
    })
);