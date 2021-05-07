const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const InwardOutward = mongoose.model("InwardOutward");
const Outward = mongoose.model("Outward");
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

router.post("/api/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  } else if (email == "team5@gmail.com") {
    console.log("Email", email);
    console.log("Password", password);
    bcrypt
      .compare("qwerty", password)
      .then((doMatch) => {
        if (doMatch) {
          console.log("WE INSIDE");
          const token = jwt.sign({ _id: "email" }, JWT_SECRET);
          const name = "team5@gmail.com";
          const email = "qwerty";
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

router.get("/api/getLocations", (req, res) => {
  Location.find()
    .then((locations) => {
      res.json({ locations });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/getAllPersons", (req, res) => {
  Person.find(
    {},
    {
      first_name: 1,
      last_name: 1,
      role: 1,
    }
  )
    .then((persons) => {
      res.json({ persons });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/getInwardOutward", (req, res) => {
  InwardOutward.find({}, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    .sort("-createdAt")
    .limit(200)
    .then((inwardOutward) => {
      res.json({ inwardOutward });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/getOutward", (req, res) => {
  InwardOutward.find(
    { type: "Outward" },
    { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  )
    .sort("-createdAt")
    .limit(200)
    .then((outward) => {
      res.json({ outward });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/getTypes", (req, res) => {
  console.log("inside getTypes");
  Types.find()
    .sort("-createdAt")
    .then((types) => {
      res.json({ types });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/getRoles", (req, res) => {
  Roles.find()
    .then((roles) => {
      res.json({ roles });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/getOrganizations", (req, res) => {
  Organization.find()
    .then((orgs) => {
      res.json({ orgs });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/getAllLocations", (req, res) => {
  Location.find()
    .then((locations) => {
      res.json({ locations });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/getAllResources", (req, res) => {
  Resource.find(
    {},
    {
      identifier: 1,
    }
  )
    .then((resources) => {
      res.json({ resources });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/api/getAlerts", (req, res) => {
  Resource.find({
    $expr: { $gt: ["$threshold_quantity", "$available_quantity"] },
  })
    .sort("-createdAt")
    .then((notifications) => {
      console.log("Inside get ALerts ");
      res.json({ notifications });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/getFullResources", (req, res) => {
  Resource.find({}, { _id: 0, updatedAt: 0, __v: 0 })
    .sort("-createdAt")
    .then((resources) => {
      res.json({ resources });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/getNumberOfResources", (req, res) => {
  Resource.countDocuments()
    .then((count) => {
      console.log("count: ", count);
      res.send({ count: count });
    })
    .catch((err) => {
      console.log("Err: ", err);
      res.send({ count: 0 });
    });
});

router.get("/api/getNumberOfEmployees", (req, res) => {
  Person.countDocuments()
    .then((count) => {
      console.log("count: ", count);
      res.send({ count: count });
    })
    .catch((err) => {
      console.log("Err: ", err);
      res.send({ count: 0 });
    });
});

module.exports = router;
