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
require('dotenv').config()
const app = express();

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



// Test endpoint
app.get('/test', (req, res) => {
    res.json('test ok');
});


// Endpoint register
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const userDoc = User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt)
    })

    res.json(userDoc)
})


// Endpoints login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userDoc = await User.findOne({ email });

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);

        //Obtention du JWT

        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            })
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
})



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



// port listener :
app.listen(4000);




// db:

// name: booking
// pass: tNYtaohVfmWON9b2