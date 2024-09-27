const User = require('../models/userModel')

class UserRepository {
    async create(userData) {
        return await User.create(userData)
    }

    async findAll() {
        return await User.findAll()
    }

    async findById(id) {
        return await User.findByPk(id)
    }

    async update(id, userData) {
        return await User.update(userData, { where: { id } })
    }

    async delete(id) {
        return await User.destroy({ where: { id } })
    }
}

module.exports = UserRepository;