const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = require('../config/jwtConfig');
const { validatePassword } = require('../utils/passwordUtils');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../services/emailService');


const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.status(404).json({ message: "Aucun utilisateur n'a été trouvé" });
        }

        const resetToken = jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {
            expiresIn: '1h'
        });

        const linkResetPass = `http://localhost:4000/new-password/${userDoc._id}/${resetToken}`;

        // Préparation de l'e-mail
        const mailOptions = {
            from: 'humanboosterairbnc@gmail.com', // Remplacez par votre email
            to: userDoc.email,
            subject: 'Réinitialisation de votre mot de passe',
            text: `Bonjour,\n\nVeuillez utiliser le lien suivant pour réinitialiser votre mot de passe : ${linkResetPass}`
        };

        console.log(linkResetPass);

        // Envoyez l'e-mail
        await sendEmail(mailOptions);

        res.json({ message: "E-mail envoyé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur du serveur interne" });
    }
};



const getNewPassword = async (req, res) => {
    const { id, token } = req.params;

    try {
        const userDoc = await User.findById(id);
        if (!userDoc) {
            return res.status(404).json({ message: "User not found" });
        }

        // Vérifier le token
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                // Token invalide ou expiré
                return res.status(403).json({ message: "Invalid or expired token" });
            }

            res.redirect(`http://localhost:5173/new-password/${id}/${token}`);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



const postNewPassword = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword } = req.body;

    if (!validatePassword(newPassword)) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 5 caractères, une majuscule, un chiffre et un caractère spécial.' });
    }

    try {
        const userDoc = await User.findById(id);
        if (!userDoc) {
            return res.status(404).json({ message: "User not found" });
        }

        jwt.verify(token, jwtSecret, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10); // Remplacez 10 par votre bcryptSalt si nécessaire
            userDoc.password = hashedPassword;
            await userDoc.save();

            res.status(200).json({ message: "Password updated successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { forgotPassword, getNewPassword, postNewPassword };
