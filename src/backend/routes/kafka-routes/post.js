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
const requireLogin = require("../../middleware/requireLogin");
const kafka = require("../../kafka/client");

router.post("/api/addPerson", (req, res) => {
  console.log("Adding Person");
  req.body.path = "addPerson";
  kafka.make_request("postTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) res.json(results.data);
    else res.status(results.status).json({ error: results.data });
  });

  // const {
  //   firstName,
  //   lastName,
  //   phone,
  //   email,
  //   organization,
  //   location,
  //   address,
  //   jobTitle,
  // } = req.body.values;

  // const person = new Person({
  //   first_name: firstName,
  //   last_name: lastName,
  //   phone: phone,
  //   email: email,
  //   organization: organization,
  //   current_location: location,
  //   address: address,
  //   role: jobTitle,
  // });
  // person
  //   .save()
  //   .then(async (result) => {
  //     const promise1 = await addLocation();
  //     const promise2 = await addOrganization();
  //     const promise3 = await addJobtitle();
  //     res.json({ person: result });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // const addLocation = () => {
  //   return AllSiteLocations.findOneAndUpdate(
  //     { name: location },
  //     { expire: new Date() },
  //     { upsert: true },
  //     (err, doc) => {
  //       if (err) {
  //         return console.log(
  //           "Something wrong when updating data! location = " + location + "\n"
  //         );
  //       }
  //     }
  //   ).catch((err) => {
  //     console.log("err", err);
  //   });
  // };
  // const addOrganization = () => {
  //   return Organization.findOneAndUpdate(
  //     { name: organization },
  //     { expire: new Date() },
  //     { upsert: true },
  //     (err, doc) => {
  //       if (err) {
  //         return console.log(
  //           "Something wrong when updating data! organization = " +
  //             organization +
  //             "\n"
  //         );
  //       }
  //     }
  //   ).catch((err) => {
  //     console.log("err", err);
  //   });
  // };
  // const addJobtitle = () => {
  //   return Roles.findOneAndUpdate(
  //     { role: jobTitle },
  //     { expire: new Date() },
  //     { upsert: true },
  //     (err, doc) => {
  //       if (err) {
  //         return console.log(
  //           "Something wrong when updating data! jobTitle = " + jobTitle + "\n"
  //         );
  //       }
  //     }
  //   ).catch((err) => {
  //     console.log("err", err);
  //   });
  // };
});

router.post("/api/addResource", (req, res) => {
  req.body.path = "addResource";

  kafka.make_request("postTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) res.json(results.data);
    else res.status(results.status).json({ error: results.data });
  });
  // const { rows, fullName, nickName, type, location, owner } = req.body.values;
  // rows.map((row) => {
  //   const SKU = row.SKU;
  //   const quantity = row.quantity;
  //   const units = row.units;
  //   const resource = new Resources({
  //     full_name: fullName,
  //     nick_name: nickName,
  //     sku: SKU,
  //     type: type,
  //     units: units,
  //     purchased_quantity: quantity,
  //     available_quantity: quantity,
  //     location: location,
  //     owner: owner,
  //     identifier: fullName + "-" + SKU,
  //   });
  //   resource
  //     .save()
  //     .then((result) => {
  //       res.json({ resource: result });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });
});

router.post("/api/addInward", (req, res) => {
  console.log("Adding Inward");
  req.body.path = "addInward";

  kafka.make_request("postTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) res.json(results.data);
    else res.status(results.status).json({ error: results.data });
  });

  // const {
  //   rows,
  //   suppliedBy,
  //   sourcedBy,
  //   organization,
  //   comments,
  //   date,
  //   billNo,
  // } = req.body.values;
  // rows.map((row) => {
  //   const resource = row.resource;
  //   const price = row.price;
  //   const quantity = row.quantity;
  //   const GST = row.GST;
  //   const inward = new InwardOutward({
  //     resource: resource,
  //     price: price,
  //     quantity: quantity,
  //     supplier: suppliedBy,
  //     sourced_by: sourcedBy,
  //     comments: comments,
  //     organization: organization,
  //     date: date,
  //     billNumber: billNo,
  //     GST: GST,
  //     type: "Inward",
  //   });

  //   var present_quantity = 0;
  //   var present_purchased_quantity = 0;

  //   Resources.findOne({ identifier: resource })
  //     .then((currentresource) => {
  //       if (currentresource == null) {
  //         return res.json({
  //           message:
  //             "cannot find the resource, please try later" + currentresource,
  //         });
  //       } else {
  //         present_quantity = currentresource.available_quantity;
  //         present_purchased_quantity = currentresource.purchased_quantity;
  //         used_quantity = present_purchased_quantity - present_quantity;
  //       }
  //     })
  //     .then(async (x) => {
  //       const promise1 = await updateResource1();
  //       const promise2 = await updateResource2();
  //       const Promise3 = await updateResource3();
  //       const promise3 = await saveInward();
  //       return promise3;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   const updateResource1 = () => {
  //     return Resources.findOneAndUpdate(
  //       { identifier: resource, available_quantity: present_quantity },
  //       { $inc: { available_quantity: quantity } },
  //       { new: true },
  //       (err, doc) => {
  //         if (err) {
  //           return console.log(
  //             "Something wrong when updating data! resource = " +
  //               resource +
  //               "\n"
  //           );
  //         }
  //       }
  //     ).catch((err) => {
  //       console.log("err", err);
  //     });
  //   };

  //   const updateResource2 = () => {
  //     return Resources.findOneAndUpdate(
  //       {
  //         identifier: resource,
  //         purchased_quantity: present_purchased_quantity,
  //       },
  //       { $inc: { purchased_quantity: quantity } },
  //       { new: true },
  //       (err, doc) => {
  //         if (err) {
  //           return console.log(
  //             "Something wrong when updating data! resource = " +
  //               resource +
  //               "\n"
  //           );
  //         }
  //       }
  //     ).catch((err) => {
  //       console.log("err", err);
  //     });
  //   };

  //   const updateResource3 = () => {
  //     return Resources.findOneAndUpdate(
  //       {
  //         identifier: resource,
  //         purchased_quantity: present_purchased_quantity,
  //       },
  //       { $inc: { purchased_quantity: quantity } },
  //       { new: true },
  //       (err, doc) => {
  //         if (err) {
  //           return console.log(
  //             "Something wrong when updating data! resource = " +
  //               resource +
  //               "\n"
  //           );
  //         }
  //       }
  //     ).catch((err) => {
  //       console.log("err", err);
  //     });
  //   };

  //   const saveInward = () => {
  //     return inward
  //       .save()
  //       .then((result) => {
  //         return console.log("resource = " + resource + " saved successfully");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  // });
  // return res
  //   .status(200)
  //   .json({ message: "Inward: All Resources updated Successfull" });
});

router.post("/api/addOutward", async (req, res) => {
  console.log("req.body.values = ", req.body.values);
  const {
    rows,
    requestedBy,
    transportedBy,
    date,
    contractor,
    vehicleNo,
  } = req.body.values;
  var resulCount = 0;
  rows.map(async (row, index) => {
    const resource = row.resource;
    const quantity = row.quantity;
    const ToLocation = row.toLocation;
    const outward = new InwardOutward({
      resource: resource,
      quantity: quantity,
      requested_by: requestedBy,
      transporter: transportedBy,
      location: ToLocation,
      vehicleNo: vehicleNo,
      contractor: contractor,
      date: date,
      outward_sequence: 0,
      type: "Outward",
    });
    console.log("outward = ", outward);
    var quant = 0;
    var present_purchased_quantity = 0;
    var diff = 0;
    Resources.findOne({ identifier: resource })
      .then((resource) => {
        if (resource == null) {
          res.write(
            index +
              " message: Error  cannot find the resource, please try later" +
              resource +
              "\n"
          );
        } else {
          (quant = resource.available_quantity),
            (present_purchased_quantity = resource.purchased_quantity);
          diff = present_purchased_quantity - quant;
        }
      })
      .then(async (x) => {
        if (quantity <= quant) {
          const promise0 = await getSequenceNumber();
          console.log("This is promis0", promise0);
          const promise1 = await updateResource();
          promise11 = await updateResource2();
          const promise2 = await updateOutward(promise0);
          const promise3 = await addLocation();
        } else {
          // return res.json({"message": "given quantity greater than available quantity for resource =" + resource})
          return res.write(
            index +
              " message: Error given quantity greater than available quantity for resource =" +
              resource +
              "\n"
          );
        }
        // console.log("resulCOunt = ",resulCount);
      })
      .then(() => {
        // console.log("inside last .then", resulCount);
        if (resulCount == rows.length - 1) {
          console.log("inside end resulCount = ", resulCount);
          res.end();
        }
        resulCount = resulCount + 1;
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });

    const getSequenceNumber = () => {
      return InwardOutward.find({ type: "Outward" })
        .sort("-createdAt")
        .limit(1)
        .then((inwardOutward) => {
          return inwardOutward[0].outward_sequence;
        })
        .catch((err) => {
          console.log(err);
          return 0;
        });
    };

    const updateResource = () => {
      return Resources.findOneAndUpdate(
        { identifier: resource, available_quantity: quant },
        { $inc: { available_quantity: -quantity } },
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
        { identifier: resource },
        { used_quantity: diff + quantity },
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
    const updateOutward = (sequenceNumber) => {
      outward.outward_sequence = sequenceNumber + 1;
      return outward
        .save()
        .then((result) => {
          console.log(outward);
          res.write(
            index +
              " message : Success resource = " +
              resource +
              " saved successfully" +
              "\n"
          );
          console.log("resource = " + resource + " saved successfully");
          return result;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const addLocation = () => {
      return AllSiteLocations.findOneAndUpdate(
        { name: ToLocation },
        { expire: new Date() },
        { upsert: true },
        (err, doc) => {
          if (err) {
            return console.log(
              "Something wrong when updating data! location = " +
                location +
                "\n"
            );
          }
        }
      ).catch((err) => {
        console.log("err", err);
      });
    };
  });
});

router.post("/api/addLocation", (req, res) => {
  req.body.path = "addLocation";
  req.body.location = req.location;

  kafka.make_request("postTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) res.json(results.data);
    else res.status(results.status).json({ error: results.data });
  });

  // const locationName = req.location;
  // const allLocations = new AllSiteLocations({
  //   name: locationName,
  // });

  // allLocations
  //   .findOneAndUpdate({ name: locationName })
  //   .then((result) => {
  //     res.json({ locations: result });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.post("/api/addRole", (req, res) => {
  req.body.path = "addRole";
  req.body.jobTitle = req.jobTitle;

  kafka.make_request("postTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) res.json(results.data);
    else res.status(results.status).json({ error: results.data });
  });

  // const jobtitle = req.jobTitle;
  // const roles = new Roles({
  //   role: jobtitle,
  // });

  // roles
  //   .findOneAndUpdate({ role: jobtitle })
  //   .then((result) => {
  //     res.json({ jobTitles: result });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.post("/api/addOrganization", (req, res) => {
  req.body.path = "addOrganization";
  req.body.organization = req.organization;

  kafka.make_request("postTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) res.json(results.data);
    else res.status(results.status).json({ error: results.data });
  });

  // const organization = req.organization;
  // const organizationName = new Organization({
  //   name: organization,
  // });

  // organizationName
  //   .findOneAndUpdate({ name: organizationName })
  //   .then((result) => {
  //     res.json({ organizations: result });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
});

router.post("/api/updateReturnedResource", async (req, res) => {
  req.body.path = "updateReturnedResource";

  kafka.make_request("postTopic", req.body, (err, results) => {
    console.log("results = ", results);
    if (results.status === 200) res.json(results.data);
    else res.status(results.status).json({ error: results.data });
  });

  // const { quantity, resource, outward_sequence } = req.body.values;
  // Resources.findOne({ identifier: resource })
  //   .then((resource) => {
  //     if (resource == null) {
  //       res.write(
  //         index +
  //           " message: Error  cannot find the resource, please try later" +
  //           resource +
  //           "\n"
  //       );
  //     }
  //   }) //add update return quantity in outward
  //   .then(async (promise2) => {
  //     if (quantity !== "") {
  //       const promise2 = await getResourceValues(resource);
  //       if (promise2.used_quantity >= quantity) {
  //         const promise3 = await updateAvailableQuantity(
  //           promise2.available_quantity + quantity,
  //           resource
  //         );
  //         console.log("promise3", promise3);
  //         const promise4 = await getResourceValues(resource);
  //         console.log("promise4", promise4);
  //         const promise5 = await updateUsedQuantity(
  //           promise4.purchased_quantity - promise4.available_quantity,
  //           resource
  //         );
  //         console.log("promise5", promise5);
  //         const prom = await getOutward();
  //         const pro = await updateOutwardReturnQuantity(
  //           prom.return_quantity + quantity
  //         );
  //         const promise6 = await saveInwardOutward(
  //           resource,
  //           promise2.available_quantity + quantity
  //         );
  //         return res
  //           .status(200)
  //           .json({ message: "Return: Returns updated Successfull" });
  //       } else {
  //         return res.json({
  //           message:
  //             "Error given quantity greater than available quantity for resource =" +
  //             resource,
  //         });
  //       }
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // const getOutward = () => {
  //   return InwardOutward.findOne(
  //     { outward_sequence: outward_sequence },
  //     (err, doc) => {
  //       if (err) {
  //         return console.log(
  //           "Something wrong when updating data! outward = " +
  //             outward_sequence +
  //             "\n"
  //         );
  //       }
  //     }
  //   ).catch((err) => {
  //     console.log("err", err);
  //   });
  // };

  // const updateOutwardReturnQuantity = (quantityReturned) => {
  //   return InwardOutward.findOneAndUpdate(
  //     { outward_sequence: outward_sequence },
  //     { return_quantity: quantityReturned },
  //     { new: true },
  //     (err, doc) => {
  //       if (err) {
  //         return console.log(
  //           "Something wrong when updating data! resource = " + resource + "\n"
  //         );
  //       }
  //     }
  //   ).catch((err) => {
  //     console.log("err", err);
  //   });
  // };

  // const saveInwardOutward = (identifier, current_quant) => {
  //   const returns = new InwardOutward({
  //     resource: identifier,
  //     quantity: current_quant,
  //     return_quantity: quantity,
  //     type: "Returns",
  //   });

  //   return returns
  //     .save()
  //     .then((result) => {
  //       return console.log("resource = " + identifier + " saved successfully");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const updateUsedQuantity = (used_quantity, identifier) => {
  //   return Resources.findOneAndUpdate(
  //     { identifier: identifier },
  //     { used_quantity: used_quantity },
  //     { new: true },
  //     (err, doc) => {
  //       if (err) {
  //         return console.log(
  //           "Something wrong when updating data! resource = " +
  //             identifier +
  //             "\n"
  //         );
  //       }
  //     }
  //   ).catch((err) => {
  //     console.log("err", err);
  //   });
  // };

  // const updateAvailableQuantity = (available_quantity, identifier) => {
  //   return Resources.findOneAndUpdate(
  //     { identifier: identifier },
  //     { available_quantity: available_quantity },
  //     { new: true },
  //     (err, doc) => {
  //       if (err) {
  //         return console.log(
  //           "Something wrong when updating data! resource = " +
  //             identifier +
  //             "\n"
  //         );
  //       }
  //     }
  //   ).catch((err) => {
  //     console.log("err", err);
  //   });
  // };

  // const getResourceValues = (identifier) => {
  //   return Resources.findOne({ identifier: identifier }, (err, doc) => {
  //     if (err) {
  //       return console.log({
  //         message: "cannot find the resource, please try later" + resource,
  //       });
  //     }
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // };
});

// router.post("/api/addInward", (req, res) => {

//   req.body.path = "addInward";

//   kafka.make_request("postTopic", req.body, (err, results) => {
//     console.log("results = ", results);
//     if (results.status === 200) res.json(results.data);
//     else res.status(results.status).json({ error: results.data });
//   });

// const {
//   rows,
//   suppliedBy,
//   sourcedBy,
//   organization,
//   comments,
//   date,
//   billNo,
// } = req.body.values;
// rows.map((row) => {
//   const resource = row.resource;
//   const price = row.price;
//   const quantity = row.quantity;
//   const GST = row.GST;
//   const inward = new InwardOutward({
//     resource: resource,
//     price: price,
//     quantity: quantity,
//     supplier: suppliedBy,
//     sourced_by: sourcedBy,
//     comments: comments,
//     organization: organization,
//     date: date,
//     billNumber: billNo,
//     GST: GST,
//     type: "Inward",
//   });

//   var present_quantity = 0;
//   var present_purchased_quantity = 0;

//   Resources.findOne({ identifier: resource })
//     .then((currentresource) => {
//       if (currentresource == null) {
//         return res.json({
//           message:
//             "cannot find the resource, please try later" + currentresource,
//         });
//       } else {
//         present_quantity = currentresource.available_quantity;
//         present_purchased_quantity = currentresource.purchased_quantity;
//         used_quantity = present_purchased_quantity - present_quantity;
//       }
//     })
//     .then(async (x) => {
//       const promise1 = await updateResource1();
//       const promise2 = await updateResource2();
//       constPromise3 = await updateResource3();
//       const promise3 = await saveInward();
//       return promise3;
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   const updateResource1 = () => {
//     return Resources.findOneAndUpdate(
//       { identifier: resource, available_quantity: present_quantity },
//       { $inc: { available_quantity: quantity } },
//       { new: true },
//       (err, doc) => {
//         if (err) {
//           return console.log(
//             "Something wrong when updating data! resource = " +
//               resource +
//               "\n"
//           );
//         }
//       }
//     ).catch((err) => {
//       console.log("err", err);
//     });
//   };

//   const updateResource2 = () => {
//     return Resources.findOneAndUpdate(
//       {
//         identifier: resource,
//         purchased_quantity: present_purchased_quantity,
//       },
//       { $inc: { purchased_quantity: quantity } },
//       { new: true },
//       (err, doc) => {
//         if (err) {
//           return console.log(
//             "Something wrong when updating data! resource = " +
//               resource +
//               "\n"
//           );
//         }
//       }
//     ).catch((err) => {
//       console.log("err", err);
//     });
//   };

//   const updateResource3 = () => {
//     return Resources.findOneAndUpdate(
//       {
//         identifier: resource,
//         purchased_quantity: present_purchased_quantity,
//       },
//       { $inc: { purchased_quantity: quantity } },
//       { new: true },
//       (err, doc) => {
//         if (err) {
//           return console.log(
//             "Something wrong when updating data! resource = " +
//               resource +
//               "\n"
//           );
//         }
//       }
//     ).catch((err) => {
//       console.log("err", err);
//     });
//   };

//   const saveInward = () => {
//     return inward
//       .save()
//       .then((result) => {
//         return console.log("resource = " + resource + " saved successfully");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// });
// return res
//   .status(200)
//   .json({ message: "Inward: All Resources updated Successfull" });
// });

router.post("/api/loadDefaultData", (req, res) => {
  const organizations = [
    { name: "Hyderabad", website: "HYD.com", phone_number: "123456789" },
    { name: "Nellore", website: "NLR.com", phone_number: "123456789" },
    { name: "Bangalore", website: "BNG.com", phone_number: "123456789" },
    { name: "Mumbai", website: "MUM.com", phone_number: "123456789" },
    { name: "Delhi", website: "DEL.com", phone_number: "123456789" },
  ];

  const location = [
    { name: "Hyderabad", abbr: "HYD" },
    { name: "Nellore", abbr: "NLR" },
    { name: "Bangalore", abbr: "BNG" },
    { name: "Mumbai", abbr: "MUM" },
    { name: "Delhi", abbr: "DEL" },
  ];
  const universalUnits = [
    { name: "meters", abbr: "m" },
    { name: "square-meters", abbr: "sq.m" },
    { name: "cubic-meters", abbr: "cu.m" },
    { name: "centimeters", abbr: "cm" },
    { name: "square-centimeters", abbr: "sq.cm" },
    { name: "cubic-centimeters", abbr: "cu.cm" },
    { name: "millimeters", abbr: "mm" },
    { name: "square-millimeters", abbr: "sq.mm" },
    { name: "cubic-millimeters", abbr: "cu.mm" },
    { name: "inches", abbr: "in" },
    { name: "square-inches", abbr: "sq.in" },
    { name: "cubic-inches", abbr: "cu.in" },
    { name: "grams", abbr: "gm" },
    { name: "kilograms", abbr: "kg" },
    { name: "tonnes", abbr: "tonnes" },
    { name: "litres", abbr: "l" },
    { name: "millilitres", abbr: "ml" },
  ];

  const estimatedUnits = [
    { name: "BAGS", abbr: "BAGS" },
    { name: "LOADS", abbr: "TRIPS" },
    { name: "CYLINDERS", abbr: "CYLINDERS" },
  ];

  const roles = [
    { role: "SUPER ADMIN" },
    { role: "ORG ADMIN" },
    { role: "ENGINEER" },
    { role: "INVERNTORY" },
  ];

  const types = [
    { name: "TOOL" },
    { name: "CONSUMABLE" },
    { name: "RAW_MATERIAL" },
    { name: "MACHINE" },
    { name: "VEHICLE" },
    { name: "PEOPLE" },
  ];
  Types.insertMany(types)
    .then((result) => {
      res.json({ types: result });
    })
    .catch((err) => {
      console.log(err);
    });

  Roles.insertMany(roles)
    .then((result) => {
      res.json({ roles: result });
    })
    .catch((err) => {
      console.log(err);
    });

  Organization.insertMany(organizations)
    .then((result) => {
      res.json({ organizations: result });
    })
    .catch((err) => {
      console.log(err);
    });

  EstimatedUnits.insertMany(estimatedUnits)
    .then((result) => {
      res.json({ estimatedUnits: result });
    })
    .catch((err) => {
      console.log(err);
    });

  UniversalUnits.insertMany(universalUnits)
    .then((result) => {
      res.json({ universalUnits: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
