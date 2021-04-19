const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Person = mongoose.model("Person");
const InwardOutward = mongoose.model("InwardOutward");
const Resources = mongoose.model("Resource");
const EstimatedUnits = mongoose.model("EstimatedUnits");
const UniversalUnits = mongoose.model("UniversalUnits");
const Roles = mongoose.model("Roles");
const Types = mongoose.model("Types");
const AllSiteLocations = mongoose.model("AllSiteLocations");
const Organization = mongoose.model("Organization");
const requireLogin = require("../middleware/requireLogin");

router.post("/api/addPerson", (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    organization,
    location,
    address,
    jobTitle,
  } = req.body.values;
  const person = new Person({
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    email: email,
    organization: organization,
    current_location: location,
    address: address,
    role: jobTitle,
  });
  person
    .save()
    .then(async (result) => {
      const promise1 = await addLocation();
      const promise2 = await addOrganization();
      const promise3 = await addJobtitle();
      res.json({ person: result });
    })
    .catch((err) => {
      console.log(err);
    });

  const addLocation = () => {
    return AllSiteLocations.findOneAndUpdate(
      { name: location },
      { expire: new Date() },
      { upsert: true },
      (err, doc) => {
        if (err) {
          return console.log(
            "Something wrong when updating data! location = " + location + "\n"
          );
        }
      }
    ).catch((err) => {
      console.log("err", err);
    });
  };
  const addOrganization = () => {
    return Organization.findOneAndUpdate(
      { name: organization },
      { expire: new Date() },
      { upsert: true },
      (err, doc) => {
        if (err) {
          return console.log(
            "Something wrong when updating data! organization = " +
              organization +
              "\n"
          );
        }
      }
    ).catch((err) => {
      console.log("err", err);
    });
  };
  const addJobtitle = () => {
    return Roles.findOneAndUpdate(
      { role: jobTitle },
      { expire: new Date() },
      { upsert: true },
      (err, doc) => {
        if (err) {
          return console.log(
            "Something wrong when updating data! jobTitle = " + jobTitle + "\n"
          );
        }
      }
    ).catch((err) => {
      console.log("err", err);
    });
  };
});
