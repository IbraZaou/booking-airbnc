const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig');
const authController = require('../controllers/authController');


// Google authentification
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Générez un JWT pour l'utilisateur authentifié
        jwt.sign({
            email: req.user.email,
            id: req.user._id,
        }, jwtSecret, {}, (err, token) => {
            if (err) {
                // Gérer l'erreur
                res.redirect('/login');
            } else {
                // Envoyer le jeton au client, par exemple en le fixant comme un cookie
                res.cookie('token', token);
                // Rediriger l'utilisateur vers la page d'accueil ou une autre page
                res.redirect('http://localhost:5173/');
            }
        });
    });


// mot de passe reset
router.post('/forgot-password', authController.forgotPassword);
router.get('/new-password/:id/:token', authController.getNewPassword);
router.post('/new-password/:id/:token', authController.postNewPassword);


module.exports = router;
