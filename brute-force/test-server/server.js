const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const correctPassword = "bob";

  const { password } = req.body;

  if (password === correctPassword) {
    return res.json("Correct Password");
  }

  return res.json("Incorrect Password");
});

app.listen(5000, console.log(`Server running on port 5000`));
