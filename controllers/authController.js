const authService = require('../services/AuthService');
const ResponseHandler = require('../utils/ResponseHandler');
const validator = require('validator')

class AuthController {
    constructor() {
        this.authService = new authService();
    }

    async register(req, res) {

        try {
            const { name, email, password, role } = req.body;

            if (!name || !email || !password) {
                return ResponseHandler.fieldVal(res, 'All field are required!!')
            }

            if (!validator.isEmail(email)) {
                return ResponseHandler.fieldVal(res, 'Email not valid')
            }

            const minLength = 6;
            const hasUpperCase = true;
            const hasLowerCase = true;
            const hasNumber = true;
            const hasSpecialCharacter = true;

            //password validation
            const isValidPassword = validator.isStrongPassword(password, {
                minLength,
                hasUpperCase,
                hasLowerCase,
                hasNumbers: hasNumber,
                hasSymbols: hasSpecialCharacter,
            });

            if (!isValidPassword) {
                return ResponseHandler.fieldVal(res, 'Password is not strong include uppercase, lowercase, numbers and characters must be 6 long characters')
            }
            // Extract the local part of the email address
            const localPart = email.split('@')[0];

            // Check if the local part starts with a lowercase letter
            if (localPart[0] !== localPart[0].toLowerCase()) {
                return ResponseHandler.fieldVal(res, 'Email must start with lowercase')
            }

            const user = await this.authService.registerUser({ name, email, password, role });

            return ResponseHandler.success(res, { ...user.get(), password: undefined }, 'User registered successfully', 201);

        } catch (error) {
            console.log(error)
            return ResponseHandler.error(res, error.message);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const { user, token } = await this.authService.loginUser(email, password);

            // Set token as a cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            ResponseHandler.success(res, { ...user._doc, password: undefined, token }, 'Login successful');

        } catch (error) {
            console.log(error)
            ResponseHandler.error(res, error.message);
        }
    }
}

module.exports = AuthController;
