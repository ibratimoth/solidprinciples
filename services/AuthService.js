const AuthRepository = require('../repositories/AuthRepository');
const bcrypt = require('bcryptjs');
const hashHelper = require('../helpers/hashHelper')

class AuthService {
    constructor() {
        this.authRespository = new AuthRepository();
        this.hashHelper = new hashHelper();
    }

    async registerUser() {
        return await this.authRespository.register(userData);
    }

    async findByEmail() {
        return await this.authRespository.findByEmail(email);
    }
}

module.exports = AuthService;