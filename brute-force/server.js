const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Routing
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", (req, res) => {
  const correctPassword = "bob";

  const { password } = req.body;

  if (password === correctPassword) {
    return res.json("Correct Password");
  }

  return res.json("Incorrect Password");
});

app.listen(3000, console.log(`Server running on port 3000`));
