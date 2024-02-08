const { body } = require("express-validator");

const validateLogin = [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password cannot be blank.").exists(),
];


module.exports = { validateLogin };