const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET

const getUserDataFromReq = (req) => {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
            if (err) reject(err);
            resolve(userData);
        });
    });
};

module.exports = { getUserDataFromReq };