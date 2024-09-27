const Auth = require('../models/authModel');

class AuthRepository {
    async register(userData) {
        return await Auth.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }
}

module.exports = AuthRepository;