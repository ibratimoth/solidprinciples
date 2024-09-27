const UserRepository = require('./../repositories/UserRepository');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userData) {
        return await this.userRepository.create(userData);
    }

    async getUsers() {
        return await this.userRepository.findAll();
    }

    async getUserById(id) {
        return await this.userRepository.findById(id);
    }

    async updateUser(id, userData) {
        return await this.userRepository.update(id, userData);
    }

    async deleteUser(id) {
        return await this.userRepository.delete(id);
    }
}

module.exports = UserService;