const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/all-users', userController.getAllUsers);
router.delete('/delete-user/:id', userController.deleteUser);
router.delete('/users/:id', userController.deleteUserByAdmin);
router.get('/profile', userController.getUserProfile);
router.delete('/delete-account', userController.deleteUserAccount);

module.exports = router;
