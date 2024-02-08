require("dotenv").config();

const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

(async function db() {
  await connectToMongo();
})();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth.route"));
app.use("/api/notes", require("./routes/note.route"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
