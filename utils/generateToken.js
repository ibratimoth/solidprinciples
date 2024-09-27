const jwt = require('jsonwebtoken');
require('dotenv').config();

class TokenUtil {
    generateToken(userId, role) {
        return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
    }
}

module.exports = TokenUtil;

