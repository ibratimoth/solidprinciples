const express = require("express")

const SolidController = require('./../controllers/solidController');

const router = express.Router()

const solidController = new SolidController();

router.get("/getAll", solidController.getUsers.bind(solidController));

router.post("/addUser", solidController.createUser.bind(solidController))

router.get("/single/:id", solidController.getUserById.bind(solidController))

router.put("/update/:id", solidController.updateUser.bind(solidController))

router.delete("/delete/:id", solidController.deleteUser.bind(solidController))

module.exports = router