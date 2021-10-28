var express = require("express");
var router = express.Router();

const UsersController = require("../controllers/UsersController");

router.post("/register", UsersController.register);
router.post("/login", UsersController.login);

module.exports = router;
