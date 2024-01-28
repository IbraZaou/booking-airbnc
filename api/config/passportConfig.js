const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {

        try {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                // If the user already exists, return the user
                return done(null, existingUser);
            } else {
                // If the user doesn't exist, create a new user with the googleId
                const newUser = new User({
                    googleId: profile.id,
                    name: profile.displayName, // Google profile's display name
                    email: profile.emails[0].value, // The first email address found
                    // Add other relevant user properties here
                });
                await newUser.save();
                return done(null, newUser);
            }
        } catch (error) {
            return done(error);
        }
    }));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
