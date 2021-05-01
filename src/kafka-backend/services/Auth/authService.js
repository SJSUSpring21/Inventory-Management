//not using this file.
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const InwardOutward = mongoose.model("InwardOutward");
const Types = mongoose.model("Types");
const Roles = mongoose.model("Roles");
const Organization = mongoose.model("Organization");
const Location = mongoose.model("AllSiteLocations");
const Person = mongoose.model("Person");
const Resource = mongoose.model("Resource");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/keys");

login = async (msg, callback) => {
  var res = {};
  const email = msg.email;
  const password = msg.password;
  try {
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

          result = {
            token: token,
            user: {
              name,
              email,
            },
            // name,
            // email,
            // token,
          };
          res.status = 200;
          res.data = result;
          console.log("res lllllogin = ", res);
          return callback(null, res);
          // return res.json({ token, user: { name, email } });
        }
      })
      .catch((err) => {
        res.status = 422;
        res.data = {
          error: "Invalid email or password",
        };
        callback(null, res);
        // return res.status(422).json({ error: "Invalid Email or password 2" });
      });
  } catch (err) {
    console.log(err);
    res.status = 500;
    res.data = "Internal Server Error!";
    callback(null, res);
  }
};

getLocations = async (msg, callback) => {
  var res = {};
  Location.find()
    .then((locations) => {
      res.status = 200;
      res.data = locations;
      console.log("res login = ", res);
      return callback(null, res);
      // res.json({ locations });
    })
    .catch((err) => {
      console.log(err);
      res.status = 500;
      res.data = "Internal Server Error!";
      callback(null, res);
    });
};

getAllPersons = async (msg, callback) => {
  var res = {};

  Person.find(
    {},
    {
      first_name: 1,
      last_name: 1,
      role: 1,
    }
  )
    .then((persons) => {
      res.status = 200;
      res.data = persons;
      console.log("res login = ", res);
      return callback(null, res);
      // res.json({ persons });
    })
    .catch((err) => {
      console.log(err);
      res.status = 500;
      res.data = "Internal Server Error!";
      callback(null, res);
      // console.log(err);
    });
  // Location.find()
  //   .then((locations) => {
  //     res.status = 200;
  //     res.data = locations;
  //     console.log("res login = ", res);
  //     return callback(null, res);
  //     // res.json({ locations });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status = 500;
  //     res.data = "Internal Server Error!";
  //     callback(null, res);
  //   });
};

getInwardOutward = async (msg, callback) => {
  var res = {};

  InwardOutward.find({}, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    .sort("-createdAt")
    .limit(200)
    .then((inwardOutward) => {
      res.status = 200;
      res.data = inwardOutward;
      console.log("res inward outward = ", res);
      return callback(null, res);
      // res.json({ inwardOutward });
    })
    .catch((err) => {
      console.log(err);
      res.status = 500;
      res.data = "Internal Server Error!";
      callback(null, res);
    });

  // Location.find()
  //   .then((locations) => {
  //     res.status = 200;
  //     res.data = locations;
  //     console.log("res login = ", res);
  //     return callback(null, res);
  //     // res.json({ locations });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status = 500;
  //     res.data = "Internal Server Error!";
  //     callback(null, res);
  //   });
};

getOutward = async (msg, callback) => {
  var res = {};
  InwardOutward.find(
    { type: "Outward" },
    { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  )
    .sort("-createdAt")
    .limit(200)
    .then((outward) => {
      res.status = 200;
      res.data = outward;
      console.log("res outward = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      console.log(err);
      res.status = 500;
      res.data = "Internal Server Error!";
      callback(null, res);
    });
};

getTypes = async (msg, callback) => {
  var res = {};

  console.log("inside getTypes");
  Types.find()
    .sort("-createdAt")
    .then((types) => {
      res.status = 200;
      res.data = types;
      console.log("res login = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      res.status = 500;
      res.data = "Internal Server Error!";
      callback(null, res);
      console.log(err);
    });
  // Location.find()
  //   .then((locations) => {
  //     res.status = 200;
  //     res.data = locations;
  //     console.log("res login = ", res);
  //     return callback(null, res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status = 500;
  //     res.data = "Internal Server Error!";
  //     callback(null, res);
  //   });
};

getRoles = async (msg, callback) => {
  var res = {};

  Roles.find()
    .then((roles) => {
      res.status = 200;
      res.data = roles;
      console.log("res login = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      res.status = 500;
      res.data = "Internal Server Error!";
      callback(null, res);
      console.log(err);
    });
  // Location.find()
  //   .then((locations) => {
  //     res.status = 200;
  //     res.data = locations;
  //     console.log("res login = ", res);
  //     return callback(null, res);
  //     // res.json({ locations });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //

  //   });
};

getOrganizations = async (msg, callback) => {
  var res = {};

  Organization.find()
    .then((orgs) => {
      res.status = 200;
      res.data = orgs;
      console.log("res org = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      res.status = 500;
      res.data = "Internal Server Error!";
      callback(null, res);
      console.log(err);
    });
};

getAllLocations = async (msg, callback) => {
  var res = {};
  Location.find()
    .then((locations) => {
      res.status = 200;
      res.data = orgs;
      console.log("res loc = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      res.status = 500;
      res.data = "Internal Server Error!";
      callback(null, res);
      console.log(err);
    });
};

getAllResources = async (msg, callback) => {
  var res = {};

  Resource.find(
    {},
    {
      identifier: 1,
    }
  )
    .then((resources) => {
      res.status = 200;
      res.data = resources;
      console.log("res login = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      res.status = 500;
      res.data = "Internal Server Error!";
      callback(null, res);
    });
};

getAlerts = async (msg, callback) => {
  var res = {};

  Resource.find({
    $expr: { $gt: ["$threshold_quantity", "$available_quantity"] },
  })
    .sort("-createdAt")
    .then((notifications) => {
      console.log("Inside get ALerts ");
      res.status = 200;
      res.data = notifications;
      console.log("res login = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      res.status = 500;
      res.data = "Internal Server Error!";
      callback(null, res);
      console.log(err);
    });
  // Location.find()
  //   .then((locations) => {
  //     res.status = 200;
  //     res.data = locations;
  //     console.log("res login = ", res);
  //     return callback(null, res);
  //     // res.json({ locations });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status = 500;
  //     res.data = "Internal Server Error!";
  //     callback(null, res);
  //   });
};

getFullResources = async (msg, callback) => {
  var res = {};
  // Location.find()
  //   .then((locations) => {
  //     res.status = 200;
  //     res.data = locations;
  //     console.log("res login = ", res);
  //     return callback(null, res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status = 500;
  //     res.data = "Internal Server Error!";
  //     callback(null, res);
  //   });

  Resource.find({}, { _id: 0, updatedAt: 0, __v: 0 })
    .sort("-createdAt")
    .then((resources) => {
      res.status = 200;
      res.data = resources;
      console.log("res login = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      res.status = 500;
      res.data = "Internal Server Error!";
      callback(null, res);
      console.log(err);
    });
};

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "login") {
    delete msg.path;
    login(msg, callback);
  } else if (msg.path === "getLocations") {
    getLocations(msg, callback);
  } else if (msg.path === "getAllPersons") {
    getAllPersons(msg, callback);
  } else if (msg.path === "getInwardOutward") {
    getInwardOutward(msg, callback);
  } else if (msg.path === "getOutward") {
    getOutward(msg, callback);
  } else if (msg.path === "getTypes") {
    getTypes(msg, callback);
  } else if (msg.path === "getRoles") {
    getRoles(msg, callback);
  } else if (msg.path === "getOrganizations") {
    getOrganizations(msg, callback);
  } else if (msg.path === "getAllLocations") {
    getAllLocations(msg, callback);
  } else if (msg.path === "getAllResources") {
    getAllResources(msg, callback);
  } else if (msg.path === "getAlerts") {
    getAlerts(msg, callback);
  } else if (msg.path === "getFullResources") {
    getFullResources(msg, callback);
  }
}

exports.handle_request = handle_request;
