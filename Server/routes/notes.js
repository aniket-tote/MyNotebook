const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  obj = {
    title: "note1",
    description: "description1",
  };
  res.json(obj);
});

module.exports = router;
