const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const InwardOutward = mongoose.model("InwardOutward");
const Types = mongoose.model("Types");
const Roles = mongoose.model("Roles");
const Organization = mongoose.model("Organization");
const Location = mongoose.model("AllSiteLocations");
const Person = mongoose.model("Person");
const Resource = mongoose.model("Resource");
const Notifications = mongoose.model("Notifications");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");

// const app = express();
// const io = app.get("socketio");

// const app=require('../app')
// const io=app.getSocketIo()

router.post("/api/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  } else if (email == "hemraju@gmail.com") {
    console.log("Email", email);
    console.log("Password", password);
    bcrypt
      .compare("Abcd1234", password)
      .then((doMatch) => {
        if (doMatch) {
          console.log("WE INSIDE");
          const token = jwt.sign({ _id: "email" }, JWT_SECRET);
          const name = "hemraju@gmail.com";
          const email = "Abcd1234";
          console.log(token);
          return res.json({ token, user: { name, email } });
        }
      })
      .catch((err) => {
        return res.status(422).json({ error: "Invalid Email or password 2" });
      });
  } else {
    return res.status(422).json({ error: "Invalid Email or password 3" });
  }
});
