const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('MongoDB Connected');
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err);
        });
};

module.exports = connectDatabase;