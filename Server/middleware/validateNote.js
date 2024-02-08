const { body } = require("express-validator");

const validateNote = [
    //validate values
    body("title", "Enter at least 3 character).").isLength({
      min: 3,
    }),
    body("description", "Enter at least 5 character).").isLength({
      min: 5,
    }),
  ];


module.exports = { validateNote }