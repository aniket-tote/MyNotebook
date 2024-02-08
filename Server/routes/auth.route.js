const express = require("express");
const { signupUser, loginUser, requestPasswordReset, resetPassword } = require("../controllers/auth.controller");
const { validateSignup } = require("../middleware/validateSignUp");
const { validateLogin } = require("../middleware/validateLogin");
const { validate } = require("../middleware/validate");

const router = express.Router();

router.post("/signup", validateSignup, validate, signupUser);
router.post("/login", validateLogin, validate, loginUser);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

module.exports = router;