const User = require('../models/User');
const Place = require('../models/Place');
const bcrypt = require('bcryptjs');
const { validatePassword } = require('../utils/passwordUtils');
const jwtSecret = require('../config/jwtConfig');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const { getUserDataFromReq } = require('../utils/jwtUtils');


// Inscription

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Vérifier si le mot de passe est valide
    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 5 caractères, une majuscule, un chiffre et un caractère spécial.' });
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const userDoc = await User.create({ name, email, password: hashedPassword });
        res.json(userDoc);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
};




// Connexion

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.status(422).json('Credentials not ok');
        }

        if (bcrypt.compareSync(password, userDoc.password)) {
            const token = jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
            }, jwtSecret);

            res.cookie('token', token).json(userDoc);
        } else {
            res.status(422).json('Credentials not ok');
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// get tout les users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Delete User

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Delete User from admin side
const deleteUserByAdmin = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur interne" });
    }
};


const getUserProfile = async (req, res) => {

    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
};

const deleteUserAccount = async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        if (!userData) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Suppression de toutes les places liée a l'utilisateur
        await Place.deleteMany({ owner: userData.id });
        // Puis supprimer l'utilisateur 
        await User.findByIdAndDelete(userData.id);

        res.clearCookie('token').json({ message: "Account deleted successfully" });
    } catch (err) {
        console.error('Error deleting account:', err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = { registerUser, loginUser, getAllUsers, deleteUser, deleteUserByAdmin, getUserProfile, deleteUserAccount };


