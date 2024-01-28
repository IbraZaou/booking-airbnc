const session = require('express-session');

const sessionOptions = {
    secret: 'fqjfFSDGHFlqmjfklHDUIFDSF5874RHA3489dfdsqfdsqfdsqfHF',
    resave: false,
    saveUninitialized: true
};

module.exports = session(sessionOptions);
