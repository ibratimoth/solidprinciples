const express = require('express');
const authController = require('../controllers/authController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const AuthController = new authController();

const router = express.Router();

// Registration route
router.post('/register', AuthController.register.bind(AuthController));

// Login route
router.post('/login', AuthController.login.bind(AuthController));

// Example of protected route
router.get('/admin', verifyToken, checkRole(1), (req, res) => {
    res.send('Welcome, Admin!');
});

module.exports = router;
