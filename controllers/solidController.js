const UserService = require('../services/UserService')
const ResponseHandler = require('./../utils/ResponseHandler')

class SolidController {
    constructor() {
        this.userService = new UserService();
    }

    async createUser(req, res) {
        const { name, email, designation } = req.body;
        try {
            if (!name || !email || !designation) {
                ResponseHandler.fieldVal(res, 'All field required!!')
            }

            const user = await this.userService.createUser(req.body);
            ResponseHandler.success(res, user, 201)
        } catch (error) {
            console.log(error)
            ResponseHandler.error(res, error.message);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await this.userService.getUsers()
            if (users.length === 0) {
                ResponseHandler.noUser(res, 'No user found')
            }
            ResponseHandler.success(res, users)
        } catch (error) {
            console.log(error)
            ResponseHandler.error(res, error.message)
        }
    }

    async getUserById(req, res) {
        try {
            const user = await this.userService.getUserById(req.params.id)
            if (!user) {
                return ResponseHandler.notFound(res, 'wrong id user does not exists')
            }
            ResponseHandler.success(res, user)
        } catch (error) {
            console.log(error)
            ResponseHandler.error(res, error.message)
        }
    }

    async updateUser(req, res) {
        const { name, email, designation } = req.body;
        try {
            if (!name || !email || !designation) {
                ResponseHandler.fieldVal(res, 'All field required!!')
            }

            const user = await this.userService.getUserById(req.params.id)
            if (!user) {
                return ResponseHandler.notFound(res, 'wrong id user does not exists')
            }
            const newUser = await this.userService.updateUser(req.params.id, req.body);
            ResponseHandler.success(res, 'user updated', 201)

        } catch (error) {
            console.log(error)
            ResponseHandler.error(res, error.message)
        }
    }

    async deleteUser(req, res) {
        try {

            const user = await this.userService.getUserById(req.params.id)

            if (!user) {
                return ResponseHandler.notFound(res, 'wrong id user does not exists')
            }
            await this.userService.deleteUser(req.params.id)

            ResponseHandler.success(res, 'user deleted')
        } catch (error) {
            console.log(error)
            ResponseHandler.error(res, error.message)
        }
    }
}

module.exports = SolidController;