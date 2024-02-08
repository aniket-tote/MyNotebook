const { body } = require("express-validator");

const validateSignup = [
    body("name", "Enter a valid name (more than 3 characters)").isLength({
        min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is too short").isLength({ min: 4 }),
];


module.exports = { validateSignup }