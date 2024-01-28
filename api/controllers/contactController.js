const ContactMessage = require('../models/ContactMessage'); // Importez le modèle ContactMessage
const { sendEmail } = require('../services/emailService');

// Fonction pour envoyer un message
const sendMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Enregistrez le message dans la base de données
        await ContactMessage.create({ name, email, message });

        const mailOptions = {
            from: email, //Email du user
            to: process.env.EMAIL_WEBSITE,
            subject: `Nouveau message de ${name}`,
            text: `Vous avez reçu un nouveau message de ${name} (${email}):\n\n${message}`
        };

        // Envoyez l'e-mail
        await sendEmail(mailOptions);
        res.json({ message: "E-mail envoyé avec succès" });

    } catch (error) {
        console.error("Erreur lors de l'envoi du message ou de l'enregistrement dans la base de données", error);
        res.status(500).json({ message: "Erreur du serveur interne" });
    }
};

// Fonction pour obtenir tous les messages
const getAllMessages = async (req, res) => {
    try {
        const allMessages = await ContactMessage.find();
        res.json(allMessages);
    } catch (error) {
        console.error("Erreur lors de la récupération de tous les messages", error);
        res.status(500).json({ message: "Erreur du serveur interne" });
    }
};

module.exports = { sendMessage, getAllMessages };
