const express = require('express');
const router = express.Router();

// Endpoint logout
router.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

module.exports = router;
