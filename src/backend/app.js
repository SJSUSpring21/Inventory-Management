const express = require("express");

var cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require("./config/keys");

var cors = require("cors");
const { ServerResponse } = require("http");

const app = require("express")();
const server = require("http").createServer(app);
// const io = require('socket.io')(server);
io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(require("body-parser").json());

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeahh");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

require("./models/location");
require("./models/organization");
require("./models/person");
require("./models/price");
require("./models/quantity");
require("./models/resource");
require("./models/inwardOutward");
require("./models/roles");
require("./models/estimatedUnits");
require("./models/universalUnits");
require("./models/types");
require("./models/allSiteLocations");
require("./models/notifications");
app.use(express.json());

app.use(require("./routes/post"));
app.use(require("./routes/get"));

// app.use(require("./routes/kafka-routes/get"));
// app.use(require("./routes/kafka-routes/post"));

const connection = mongoose.connection;
const Resources = mongoose.model("Resource");

connection.once("open", () => {
  console.log("Setting chnage stream");
  const notificationChangeStream = Resources.watch();

  notificationChangeStream.on("change", async (change) => {
    console.log("Inside Notification Chage Roursce", change);
    const resource_data = await Resources.findById(change.documentKey._id);
    const available_quantity = resource_data.available_quantity;
    console.log("Available Quant = ", available_quantity);
    switch (change.operationType) {
      case "update":
      case "insert":
        console.log("INisde Switch statment", change.fullDocument);
        if (
          change.updateDescription.updatedFields.threshold_quantity >
          available_quantity
        ) {
          console.log("INside server change greater");
          const notify = {
            name: "saketh",
          };
          io.emit("notification", resource_data);
        }
        break;
    }
  });
});

app.set("socketio", io);
server.listen(PORT, () => {
  console.log("server is running on", PORT);
});
