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
const { JWT_SECRET } = require("../../config/keys");
// const requireLogin = require("../middleware/requireLogin");
const kafka = require("../../kafka/client");
// const app = express();
// const io = app.get("socketio");

// const app=require('../app')
// const io=app.getSocketIo()

router.post("/api/signin", (req, res) => {
  const { email, password } = req.body;

  req.body.path = "login";

  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  } else if (email == "team5@gmail.com") {
    kafka.make_request("getTopic", req.body, (err, results) => {
      console.log("results = ", results);
      if (results.status === 200) res.json(results.data);
      else res.status(422).json({ error: "Invalid Email or password 2" });
    });

    // console.log("Email", email);
    // console.log("Password", password);
    // bcrypt
    //   .compare("qwerty", password)
    //   .then((doMatch) => {
    //     if (doMatch) {
    //       console.log("WE INSIDE");
    //       const token = jwt.sign({ _id: "email" }, JWT_SECRET);
    //       const name = "team5@gmail.com";
    //       const email = "qwerty";
    //       console.log(token);
    //       return res.json({ token, user: { name, email } });
    //     }
    //   })
    //   .catch((err) => {
    //     return res.status(422).json({ error: "Invalid Email or password 2" });
    //   });
  } else {
    return res.status(422).json({ error: "Invalid Email or password 3" });
  }
});

router.get("/api/getLocations", (req, res) => {
  req.body.path = "getLocations";
  kafka.make_request("getTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) {
      const locations = results.data;
      res.json({ locations });
    } else res.status(422).json(res.err);
  });
  // Location.find()
  //   .then((locations) => {
  //     res.json({ locations });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.get("/api/getAllPersons", (req, res) => {
  req.body.path = "getAllPersons";
  kafka.make_request("getTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) {
      const persons = results.data;
      res.json({ persons });
    } else res.status(422).json(res.err);
  });
  // Person.find(
  //   {},
  //   {
  //     first_name: 1,
  //     last_name: 1,
  //     role: 1,
  //   }
  // )
  //   .then((persons) => {
  //     res.json({ persons });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.get("/api/getInwardOutward", (req, res) => {
  req.body.path = "getInwardOutward";

  kafka.make_request("getTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) {
      const inwardOutward = results.data;
      res.json({ inwardOutward });
    } else res.status(422).json(res.err);
  });

  // InwardOutward.find({}, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
  //   .sort("-createdAt")
  //   .limit(200)
  //   .then((inwardOutward) => {
  //     res.json({ inwardOutward });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.get("/api/getOutward", (req, res) => {
  req.body.path = "getOutward";

  kafka.make_request("getTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) {
      const outward = results.data;
      res.json({ outward });
    } else res.status(422).json(res.err);
  });
  // InwardOutward.find(
  //   { type: "Outward" },
  //   { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  // )
  //   .sort("-createdAt")
  //   .limit(200)
  //   .then((outward) => {
  //     res.json({ outward });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.get("/api/getTypes", (req, res) => {
  req.body.path = "getTypes";

  kafka.make_request("getTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) {
      const types = results.data;
      res.json({ types });
    } else res.status(422).json(res.err);
  });
  // console.log("inside getTypes");
  // Types.find()
  //   .sort("-createdAt")
  //   .then((types) => {
  //     res.json({ types });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.get("/api/getRoles", (req, res) => {
  req.body.path = "getRoles";
  kafka.make_request("getTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) {
      const roles = results.data;
      res.json({ roles });
    } else res.status(422).json(res.err);
  });
  // Roles.find()
  //   .then((roles) => {
  //     res.json({ roles });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.get("/api/getOrganizations", (req, res) => {
  req.body.path = "getOrganizations";

  kafka.make_request("getTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) {
      const orgs = results.data;
      res.json({ orgs });
    } else res.status(422).json(res.err);
  });
  // Organization.find()
  //   .then((orgs) => {
  //     res.json({ orgs });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.get("/api/getAllLocations", (req, res) => {
  req.body.path = "getAllLocations";

  kafka.make_request("getTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) {
      const locations = results.data;
      res.json({ locations });
    } else res.status(422).json(res.err);
  });
  // Location.find()
  //   .then((locations) => {
  //     res.json({ locations });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.get("/api/getAllResources", (req, res) => {
  req.body.path = "getAllResources";

  kafka.make_request("getTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) {
      const resources = results.data;
      res.json({ resources });
    } else res.status(422).json(res.err);
  });
  // Resource.find(
  //   {},
  //   {
  //     identifier: 1,
  //   }
  // )
  //   .then((resources) => {
  //     res.json({ resources });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});
router.get("/api/getAlerts", (req, res) => {
  req.body.path = "getAlerts";

  kafka.make_request("getTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) {
      const notifications = results.data;
      res.json({ notifications });
    } else res.status(422).json(res.err);
  });
  // Resource.find({
  //   $expr: { $gt: ["$threshold_quantity", "$available_quantity"] },
  // })
  //   .sort("-createdAt")
  //   .then((notifications) => {
  //     console.log("Inside get ALerts ");
  //     res.json({ notifications });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.get("/api/getFullResources", (req, res) => {
  req.body.path = "getFullResources";

  kafka.make_request("getTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) {
      const resources = results.data;
      res.json({ resources });
    } else res.status(422).json(res.err);
  });
  // Resource.find({}, { _id: 0, updatedAt: 0, __v: 0 })
  //   .sort("-createdAt")
  //   .then((resources) => {
  //     res.json({ resources });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

module.exports = router;
