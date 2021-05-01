var connection = new require("./kafka/Connection");

const mongoose = require("mongoose");
const keys = require("./config/keys");
const { MONGOURI } = require("./config/keys");

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

var authService = require("./services/Auth/authService.js");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log("poducer send  = ", data);
      });
      return;
    });
  });
}

handleTopicRequest("getTopic", authService);
