const express = require("express");
const { fetchNotes, addNewNote, updateNote, deleteNote } = require("../controllers/note.controller");
const verifyAccessToken = require("../middleware/verifyAcessToken");
const { validateNote } = require("../middleware/validateNote");
const { validate } = require("../models/note.model");

const router = express.Router();

router.get("/by-user", verifyAccessToken, fetchNotes);
router.post("/", verifyAccessToken, validateNote, validate, addNewNote);
router.put("/:id", verifyAccessToken, updateNote);
router.delete("/:id", verifyAccessToken, deleteNote);

module.exports = router;