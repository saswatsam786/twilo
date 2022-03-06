const express = require("express");
const authControllers = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authControllers.signup);

router.post("/login", authControllers.login);

router.post("/logout", authControllers.logout);

router.post("/refreshtoken", authControllers.refreshToken);

module.exports = router;
