const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const JWT_SECRET = "thisisjwtsecret"

router.post(
  "/signup",
  [
    //validate values
    body("name", "Enter a valid name (more than 3 character).").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "password is too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //send bad request and error for invalid values
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //check whether email already exist in database
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already exits" });
      }

      //hashing
      const salt = await bcryptjs.genSalt(10);
      const secPass = await bcryptjs.hash(req.body.password, salt);

      //create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      
      //send response
      const data = {
        user:{
            id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET)

      res.json(authtoken);


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
