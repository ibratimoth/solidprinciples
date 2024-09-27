const Auth = require('../models/authModel');

class AuthRepository {
    async register(userData) {
        return await Auth.create(userData);
    }

    async login(email) {
        return await Auth.findOne({ where: { email } });
    }
}

module.exports = AuthRepository;