const express = require("express");
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const { compareSync } = require("bcryptjs");

const router = express.Router();

//Route 1: Get all notes of a user
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured: Its not you its us!");
  }
});

//Route 2: Add note
router.post(
  "/addnote",
  fetchUser,
  [
    //validate values
    body("title", "Enter at least 3 character).").isLength({
      min: 3,
    }),
    body("description", "Enter at least 5 character).").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //send bad request and error for invalid values
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured: Its not you its us!");
    }
  }
);

module.exports = router;
