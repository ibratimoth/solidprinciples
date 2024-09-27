const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class GenerateToken {
    generateToken(userId) {
        return jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
    }
}

module.exports = GenerateToken;
