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

router.post("/api/addResource", (req, res) => {
  const { rows, fullName, nickName, type, location, owner } = req.body.values;
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
        res.json({ resource: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post("/api/addInward", (req, res) => {
  const {
    rows,
    suppliedBy,
    sourcedBy,
    organization,
    comments,
    date,
    billNo,
  } = req.body.values;
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
          return res.json({
            message:
              "cannot find the resource, please try later" + currentresource,
          });
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
  return res
    .status(200)
    .json({ message: "Inward: All Resources updated Successfull" });
});

//line 331-------

router.post("/api/addRole", (req, res) => {
  const jobtitle = req.jobTitle;
  const roles = new Roles({
    role: jobtitle,
  });

  roles
    .findOneAndUpdate({ role: jobtitle })
    .then((result) => {
      res.json({ jobTitles: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/api/addOrganization", (req, res) => {
  const organization = req.organization;
  const organizationName = new Organization({
    name: organization,
  });

  organizationName
    .findOneAndUpdate({ name: organizationName })
    .then((result) => {
      res.json({ organizations: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/api/updateResourceThreshold", async (req, res) => {
  const updated_resource_array = req.body.updated_resources;
  var count = 0;
  updated_resource_array.map(async ({ threshold_quantity, identifier }) => {
    const updateThreshold = (threshold_quantity, identifier) => {
      return Resources.findOneAndUpdate(
        { identifier: identifier },
        { threshold_quantity: threshold_quantity },
        { new: true },
        (err, doc) => {
          if (err) {
            return console.log(
              "Something wrong when updating data! resource = " +
                resource +
                "\n"
            );
          } else {
            res.write(
              " message : Update Success resource = " +
                identifier +
                " Threshold" +
                threshold_quantity +
                "\n"
            );
            if (count == updated_resource_array.length - 1) {
              res.end();
            }
            count = count + 1;
          }
        }
      ).catch((err) => {
        console.log("err", err);
      });
    };
    if (threshold_quantity !== "") {
      const promise1 = await updateThreshold(threshold_quantity, identifier);
      return promise1;
    }
  });
  //394------
});
