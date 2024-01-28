const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const app = express();

// Importation des configurations et des middlewares
const passport = require('./config/passportConfig.js');
const connectDatabase = require('./config/databaseConfig.js');
const corsMiddleware = require('./middlewares/corsMiddleware');
const sessionMiddleware = require('./middlewares/sessionMiddleware');

// Application des middlewares nécessaires avant les routes
app.use(express.json()); // Pour traiter les requêtes JSON entrantes
app.use(cookieParser()); // Pour la gestion des cookies
app.use(corsMiddleware); // Pour les requêtes inter-domaines
app.use(sessionMiddleware); // Pour la gestion des sessions
app.use(passport.initialize());
app.use(passport.session());

// Importation des routes
const userRoutes = require('./routes/userRoutes');
const placeRoutes = require('./routes/placeRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Application des routes
app.use(userRoutes);
app.use(authRoutes);
app.use(placeRoutes);
app.use(logoutRoutes);
app.use(bookingRoutes);
app.use('/api/', paymentRoutes);
app.use(uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(contactRoutes);

// Connexion à la base de données
connectDatabase();

// Démarrage du serveur
app.listen(4000);

// db:

// name: booking
// pass: tNYtaohVfmWON9b2