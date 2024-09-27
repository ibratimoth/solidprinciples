const express = require("express")

const SolidController = require('./../controllers/solidController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const router = express.Router()

const solidController = new SolidController();

router.get("/getAll", verifyToken, checkRole(1), solidController.getUsers.bind(solidController));

router.post("/addUser", solidController.createUser.bind(solidController))

router.get("/single/:id", verifyToken, solidController.getUserById.bind(solidController))

router.put("/update/:id", verifyToken, solidController.updateUser.bind(solidController))

router.delete("/delete/:id", verifyToken, solidController.deleteUser.bind(solidController))

module.exports = router