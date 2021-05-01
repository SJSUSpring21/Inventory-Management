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
const requireLogin = require("../../middleware/requireLogin");

addPerson = async (msg, callback) => {
  console.log("In add Person kafka backend");
  var res = {};

  const {
    firstName,
    lastName,
    phone,
    email,
    organization,
    location,
    address,
    jobTitle,
  } = msg.values;

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
      res.status = 200;
      res.data = { person: result };
      console.log("res postPerson = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      res.status = 500;
      res.data = err;
      console.log(err);
      return callback(null, res);
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
};

addResource = async (msg, callback) => {
  var res = {};

  const { rows, fullName, nickName, type, location, owner } = msg.values;
  rows.map((row) => {
    const SKU = row.SKU;
    const quantity = row.quantity;
    const units = row.units;
    const resource = new Resources({
      full_name: fullName,
      nick_name: nickName,
      sku: SKU,
      type: type,
      units: units,
      purchased_quantity: quantity,
      available_quantity: quantity,
      location: location,
      owner: owner,
      identifier: fullName + "-" + SKU,
    });
    resource
      .save()
      .then((result) => {
        res.status = 200;
        res.data = { resource: result };
        console.log("res post addResource = ", res);
        return callback(null, res);
      })
      .catch((err) => {
        res.status = 500;
        res.data = err;
        console.log(err);
        return callback(null, res);
      });
  });
};

addLocation = async (msg, callback) => {
  var res = {};

  const locationName = msg.location;
  const allLocations = new AllSiteLocations({
    name: locationName,
  });

  allLocations
    .findOneAndUpdate({ name: locationName })
    .then((result) => {
      res.status = 200;
      res.data = { locations: result };
      console.log("res post addLocation = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      res.status = 500;
      res.data = err;
      console.log(err);
      return callback(null, res);
    });
};

addRole = async (msg, callback) => {
  var res = {};

  const jobtitle = msg.jobTitle;
  const roles = new Roles({
    role: jobtitle,
  });

  roles
    .findOneAndUpdate({ role: jobtitle })
    .then((result) => {
      res.status = 200;
      res.data = { jobTitles: result };
      console.log("res post addRole = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      res.status = 500;
      res.data = err;
      console.log(err);
      return callback(null, res);
    });
};

addOrganization = async (msg, callback) => {
  var res = {};

  const organization = msg.organization;
  const organizationName = new Organization({
    name: organization,
  });

  organizationName
    .findOneAndUpdate({ name: organizationName })
    .then((result) => {
      res.status = 200;
      res.data = { organizations: result };
      console.log("res post addOrganization = ", res);
      return callback(null, res);
    })
    .catch((err) => {
      res.status = 500;
      res.data = err;
      console.log(err);
      return callback(null, res);
    });
};

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "addPerson") {
    addPerson(msg, callback);
  } else if (msg.path === "addResource") {
    addResource(msg, callback);
  } else if (msg.path === "addLocation") {
    addLocation(msg, callback);
  } else if (msg.path === "addRole") {
    addRole(msg, callback);
  } else if (msg.path === "addOrganization") {
    addOrganization(msg, callback);
  }
  // else if (msg.path === "getRoles") {
  //   getRoles(msg, callback);
  // } else if (msg.path === "getOrganizations") {
  //   getOrganizations(msg, callback);
  // } else if (msg.path === "getAllLocations") {
  //   getAllLocations(msg, callback);
  // } else if (msg.path === "getAllResources") {
  //   getAllResources(msg, callback);
  // } else if (msg.path === "getAlerts") {
  //   getAlerts(msg, callback);
  // } else if (msg.path === "getFullResources") {
  //   getFullResources(msg, callback);
  // }
}

exports.handle_request = handle_request;
