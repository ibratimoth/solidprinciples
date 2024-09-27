const AuthRepository = require('../repositories/AuthRepository');
const bcrypt = require('bcryptjs');
const hashHelper = require('../helpers/hashHelper');
const ResponseHandler = require('../utils/ResponseHandler');
const tokenUtil = require('../utils/generateToken');
class AuthService {
    constructor() {
        this.authRepository = new AuthRepository();
        this.hashHelper = new hashHelper();
        this.tokenUtil = new tokenUtil();
    }

    async registerUser(userData) {
        const { name, email, password, role } = userData;

        // Check if user already exists
        const existingUser = await this.authRepository.findByEmail(email);

        if (existingUser) {
            throw new Error('User already exists')
        }

        const hashedPassword = await this.hashHelper.hashPassword(password);

        return await this.authRepository.register({ name, email, password: hashedPassword, role });

    }

    async loginUser(email) {
        const user = await this.authRepository.findByEmail(email);

        if (!user) {
            throw new Error('Invalid email')
        }
        // Compare passwords
        const isPasswordValid = await this.hashHelper.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return ResponseHandler.notFound(res, 'wrong password');
        }
        // Generate token
        const token = this.tokenUtil.generateToken(user.id, user.role);
        return { user, token }
    }
}

module.exports = AuthService;