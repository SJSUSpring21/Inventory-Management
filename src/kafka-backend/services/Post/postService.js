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

addInward = async (msg, callback) => {
  var res = {};
  const {
    rows,
    suppliedBy,
    sourcedBy,
    organization,
    comments,
    date,
    billNo,
  } = msg.values;

  rows.map((row) => {
    const resource = row.resource;
    const price = row.price;
    const quantity = row.quantity;
    const GST = row.GST;
    const inward = new InwardOutward({
      resource: resource,
      price: price,
      quantity: quantity,
      supplier: suppliedBy,
      sourced_by: sourcedBy,
      comments: comments,
      organization: organization,
      date: date,
      billNumber: billNo,
      GST: GST,
      type: "Inward",
    });

    var present_quantity = 0;
    var present_purchased_quantity = 0;

    Resources.findOne({ identifier: resource })
      .then((currentresource) => {
        if (currentresource == null) {
          res.status = 404;
          res.data = {
            message:
              "cannot find the resource, please try later" + currentresource,
          };
          console.log("res post addInward = ", res);
          return callback(null, res);
        } else {
          present_quantity = currentresource.available_quantity;
          present_purchased_quantity = currentresource.purchased_quantity;
          used_quantity = present_purchased_quantity - present_quantity;
        }
      })
      .then(async (x) => {
        const promise1 = await updateResource1();
        const promise2 = await updateResource2();
        const Promise3 = await updateResource3();
        const promise3 = await saveInward();
        return promise3;
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });

    const updateResource1 = () => {
      return Resources.findOneAndUpdate(
        { identifier: resource, available_quantity: present_quantity },
        { $inc: { available_quantity: quantity } },
        { new: true },
        (err, doc) => {
          if (err) {
            return console.log(
              "Something wrong when updating data! resource = " +
                resource +
                "\n"
            );
          }
        }
      ).catch((err) => {
        console.log("err", err);
      });
    };

    const updateResource2 = () => {
      return Resources.findOneAndUpdate(
        {
          identifier: resource,
          purchased_quantity: present_purchased_quantity,
        },
        { $inc: { purchased_quantity: quantity } },
        { new: true },
        (err, doc) => {
          if (err) {
            return console.log(
              "Something wrong when updating data! resource = " +
                resource +
                "\n"
            );
          }
        }
      ).catch((err) => {
        console.log("err", err);
      });
    };

    const updateResource3 = () => {
      return Resources.findOneAndUpdate(
        {
          identifier: resource,
          purchased_quantity: present_purchased_quantity,
        },
        { $inc: { purchased_quantity: quantity } },
        { new: true },
        (err, doc) => {
          if (err) {
            return console.log(
              "Something wrong when updating data! resource = " +
                resource +
                "\n"
            );
          }
        }
      ).catch((err) => {
        console.log("err", err);
      });
    };

    const saveInward = () => {
      return inward
        .save()
        .then((result) => {
          return console.log("resource = " + resource + " saved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };
  });
  res.status = 200;
  res.data = { message: "Inward: All Resources updated Successfull" };
  console.log("res post addInward = ", res);
  return callback(null, res);
};

updateReturnedResource = async (msg, callback) => {
  var res = {};

  const { quantity, resource, outward_sequence } = msg.values;
  Resources.findOne({ identifier: resource })
    .then((resource) => {
      if (resource == null) {
        res.status = 404;
        res.data =
          index +
          " message: Error  cannot find the resource, please try later" +
          resource +
          "\n";
        console.log("res updateReturnedResource = ", res);
        return callback(null, res);
      }
    }) //add update return quantity in outward
    .then(async (promise2) => {
      if (quantity !== "") {
        const promise2 = await getResourceValues(resource);
        if (promise2.used_quantity >= quantity) {
          const promise3 = await updateAvailableQuantity(
            promise2.available_quantity + quantity,
            resource
          );
          console.log("promise3", promise3);
          const promise4 = await getResourceValues(resource);
          console.log("promise4", promise4);
          const promise5 = await updateUsedQuantity(
            promise4.purchased_quantity - promise4.available_quantity,
            resource
          );
          console.log("promise5", promise5);
          const prom = await getOutward();
          const pro = await updateOutwardReturnQuantity(
            prom.return_quantity + quantity
          );
          const promise6 = await saveInwardOutward(
            resource,
            promise2.available_quantity + quantity
          );

          res.status = 200;
          res.data = { message: "Return: Returns updated Successfull" };
          return callback(null, res);
        } else {
          res.status = 400;
          res.data = {
            message:
              "Error given quantity greater than available quantity for resource =" +
              resource,
          };
          return callback(null, res);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {
      console.log(err);
    });

  const getOutward = () => {
    return InwardOutward.findOne(
      { outward_sequence: outward_sequence },
      (err, doc) => {
        if (err) {
          return console.log(
            "Something wrong when updating data! outward = " +
              outward_sequence +
              "\n"
          );
        }
      }
    ).catch((err) => {
      console.log("err", err);
    });
  };

  const updateOutwardReturnQuantity = (quantityReturned) => {
    return InwardOutward.findOneAndUpdate(
      { outward_sequence: outward_sequence },
      { return_quantity: quantityReturned },
      { new: true },
      (err, doc) => {
        if (err) {
          return console.log(
            "Something wrong when updating data! resource = " + resource + "\n"
          );
        }
      }
    ).catch((err) => {
      console.log("err", err);
    });
  };

  const saveInwardOutward = (identifier, current_quant) => {
    const returns = new InwardOutward({
      resource: identifier,
      quantity: current_quant,
      return_quantity: quantity,
      type: "Returns",
    });

    return returns
      .save()
      .then((result) => {
        return console.log("resource = " + identifier + " saved successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUsedQuantity = (used_quantity, identifier) => {
    return Resources.findOneAndUpdate(
      { identifier: identifier },
      { used_quantity: used_quantity },
      { new: true },
      (err, doc) => {
        if (err) {
          return console.log(
            "Something wrong when updating data! resource = " +
              identifier +
              "\n"
          );
        }
      }
    ).catch((err) => {
      console.log("err", err);
    });
  };

  const updateAvailableQuantity = (available_quantity, identifier) => {
    return Resources.findOneAndUpdate(
      { identifier: identifier },
      { available_quantity: available_quantity },
      { new: true },
      (err, doc) => {
        if (err) {
          return console.log(
            "Something wrong when updating data! resource = " +
              identifier +
              "\n"
          );
        }
      }
    ).catch((err) => {
      console.log("err", err);
    });
  };

  const getResourceValues = (identifier) => {
    return Resources.findOne({ identifier: identifier }, (err, doc) => {
      if (err) {
        return console.log({
          message: "cannot find the resource, please try later" + resource,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  };
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
  } else if (msg.path === "addInward") {
    addInward(msg, callback);
  } else if (msg.path === "updateReturnedResource") {
    updateReturnedResource(msg, callback);
  }
  //   else if (msg.path === "getAlerts") {
  //   getAlerts(msg, callback);
  // } else if (msg.path === "getFullResources") {
  //   getFullResources(msg, callback);
  // }
}

exports.handle_request = handle_request;
