const cors = require('cors');

const corsOptions = {
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: ['http://localhost:5173', 'http://192.168.1.32:8081']
};

module.exports = cors(corsOptions);
