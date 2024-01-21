const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
const app = express();
const nodemailer = require('nodemailer');


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'lfmqjdlM4MIjkljf4fjfldksjf';

// Cannot destructure property 'name' of 'req.body' (il fallait le parse)
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(session({
    secret: 'fqjfFSDGHFlqmjfklHDUIFDSF5874RHA3489dfdsqfdsqfdsqfHF',
    resave: false,
    saveUninitialized: true
}));

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);


// Function to grab token
function getUserDataFromReq(req) {

    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if
                (err) throw err;
            resolve(userData);
        })
    });
}



// // Test endpoint
// app.get('/test', (req, res) => {
//     res.json('test ok');
// });


function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return regex.test(password);
}

// Endpoint register
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Vérifier si le mot de passe est valide
    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 5 caractères, une majuscule, un chiffre et un caractère spécial.' });
    }

    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

    User.create({ name, email, password: hashedPassword })
        .then(userDoc => {
            res.json(userDoc);
        })
        .catch(err => {
            res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
        });
})



// Login with google


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



// Route pour rediriger l'utilisateur vers Google pour l'authentification
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route de callback après que Google ait authentifié l'utilisateur
app.get('/auth/google/callback',
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

// Middleware pour initialiser Passport et restaurer l'état de l'authentification à partir de la session.
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, done) {
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




// Endpoints login
app.post('/login', async (req, res) => {
    const { email, password } = req.body; // Ajout de username dans la requête

    const userDoc = await User.findOne({ email }); // Trouver l'utilisateur par username

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        const emailOk = email === userDoc.email;

        // Obtention du JWT
        if (passOk && emailOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('Credentials not ok');
        }
    } else {
        res.status(404).json('User not found');
    }
});


//Endpoints profile
app.get('/profile', (req, res) => {

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
})




//Endpoint logout
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});


const path = require('path');
const BookingModel = require('./models/Booking.js');

// Endpoint Upload
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = Date.now() + '.jpg';

    try {
        await imageDownloader.image({
            url: link,
            dest: path.join(__dirname, 'uploads', newName),
        });

        const imagePath = path.join(newName);

        res.json({ imagePath });
    } catch (error) {
        res.status(500).json({ error: 'Failed to download the image' });
    }
});



//Endpoints Upload by computer
const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newFilename = `${Date.now()}_${Math.floor(Math.random() * 10000)}.${ext}`;
        const newPath = `uploads/${newFilename}`;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newFilename);
    }

    res.json(uploadedFiles);
});


//Endpoints places
//POST
app.post('/places', (req, res) => {

    const { token } = req.cookies;
    const {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;

        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        })

        res.json(placeDoc);
    });
});

// -------------

//GET
app.get('/user-places', (req, res) => {
    const { token } = req.cookies;

    //grab the user id :
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    })
})

// GET:id
app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
})


// -------------


//PUT
app.put('/places', async (req, res) => {

    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price,
            })
            await placeDoc.save();
            res.json('ok');
        }
    })
});


//GET All places
app.get('/places', async (req, res) => {
    res.json(await Place.find());
})


//DELETE BOOKING
app.delete('/places/:id', async (req, res) => {
    const placeId = req.params.id;

    try {
        // Remplacez ceci par le code nécessaire pour supprimer la réservation de votre base de données
        // Par exemple, si vous utilisez Mongoose :
        await Place.findByIdAndDelete(placeId);

        res.status(200).send({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(500).send({ message: "Erreur lors de la suppression de la réservation" });
    }
});


app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const { place, checkIn, checkOut,
        numberOfGuests, name, phone, price } = req.body;
    Booking.create({
        place, checkIn, checkOut,
        numberOfGuests, name, phone, price, user: userData.id
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    })
})


// GET ALL BOOKINGS
app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'))
})


const transporter = nodemailer.createTransport({
    service: 'gmail', // Remplacez par votre service de messagerie
    auth: {
        user: 'humanboosterairbnc@gmail.com', // a mettre dans une variable d'environnement
        pass: 'mhrgvivuwbevvpkg' //a mettre dans une variable d'environnement
    }
});



//DELETE BOOKING
app.delete('/bookings/:id', async (req, res) => {
    const bookingId = req.params.id;

    try {
        // Remplacez ceci par le code nécessaire pour supprimer la réservation de votre base de données
        // Par exemple, si vous utilisez Mongoose :
        await Booking.findByIdAndDelete(bookingId);

        res.status(200).send({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(500).send({ message: "Erreur lors de la suppression de la réservation" });
    }
});


//La route qui permet l'envoie de l'email + vérification si l'utilisateur existe
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.status(404).json({ message: "Aucun utilisateur n'a été trouvé" });
        }

        const resetToken = jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {
            expiresIn: '1h' // Le token expire dans 1 heure
        });

        const linkResetPass = `http://localhost:4000/new-password/${userDoc._id}/${resetToken}`

        // Préparation de l'e-mail
        const mailOptions = {
            from: 'humanboosterairbnc@gmail.com', // Remplacez par votre email
            to: userDoc.email,
            subject: 'Réinitialisation de votre mot de passe',
            // html: `<p>Cliquez sur ce lien pour réinitialiser votre mot de passe : <a href="${linkResetPass}">${linkResetPass}</a></p>`
            text: `Bonjour,\n\nVeuillez utiliser le lien suivant pour réinitialiser votre mot de passe : ${linkResetPass}`
        };


        // Envoyez l'e-mail
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ message: "Error sending email" });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ message: "Email sent" });
            }
        });
        console.log(linkResetPass);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.get('/new-password/:id/:token', async (req, res) => {
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

            // Token valide, permettre à l'utilisateur de définir un nouveau mot de passe
            // À implémenter: Logique pour permettre à l'utilisateur de définir un nouveau mot de passe

            res.redirect(`http://localhost:5173/new-password/${id}/${token}`);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post('/new-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { newPassword } = req.body; // Récupérer le nouveau mot de passe du corps de la requête

    // Vérifier si le nouveau mot de passe est valide
    if (!validatePassword(newPassword)) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 5 caractères, une majuscule, un chiffre et un caractère spécial.' });
    }

    try {
        const userDoc = await User.findById(id);
        if (!userDoc) {
            return res.status(404).json({ message: "User not found" });
        }

        // Vérifier le token
        jwt.verify(token, jwtSecret, async (err, decoded) => {
            if (err) {
                // Token invalide ou expiré
                return res.status(403).json({ message: "Invalid or expired token" });
            }

            // Hacher le nouveau mot de passe
            const hashedPassword = await bcrypt.hash(newPassword, bcryptSalt);

            // Mettre à jour le mot de passe dans la base de données
            userDoc.password = hashedPassword;
            await userDoc.save();

            // Envoyer une réponse après la mise à jour réussie du mot de passe
            res.status(200).json({ message: "Password updated successfully" });

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



//STRIPE

const stripe = require('stripe')('sk_test_51OYYXzBmkOgBJ5DWZ35euiyiZrHm6lkKQfPq36ilyv43wkGIDdy79z5dztYsIJVJlATqcOeoaJFcyKIkjpToZrep00EEXMkiTW');

// Route pour créer une session de paiement Stripe
app.post('/api/create-stripe-session', async (req, res) => {
    try {
        const { price } = req.body; // Récupérer le prix du corps de la requête

        // Créer une session de paiement Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Booking Payment',
                    },
                    unit_amount: price * 100, // Le prix doit être en centimes
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:5173/payment-cancelled',
        });

        // Renvoyer l'ID de la session au client
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating Stripe session", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//TODO
//route to delete your account
app.delete('/delete-account', async (req, res) => {

    try {
        const userData = await getUserDataFromReq(req);
        if (!userData) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await User.findByIdAndDelete(userData.id);
        res.clearCookie('token').json({ message: "Account deleted successfully" });
    } catch (err) {
        console.error('Error deleting account:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }

})




// Contact send message

app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Préparation de l'e-mail
        const mailOptions = {
            from: email, // L'email de l'expéditeur (l'utilisateur qui remplit le formulaire)
            to: 'humanboosterairbnc@gmail.com', // Votre email ou l'email où vous voulez recevoir les messages
            subject: `Nouveau message de ${name}`,
            text: `Vous avez reçu un nouveau message de ${name} (${email}):\n\n${message}`
        };

        // Envoyez l'e-mail
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail" });
            } else {
                console.log('Email envoyé: ' + info.response);
                res.json({ message: "E-mail envoyé avec succès" });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur du serveur interne" });
    }
});


// port listener :
app.listen(4000);






// db:

// name: booking
// pass: tNYtaohVfmWON9b2