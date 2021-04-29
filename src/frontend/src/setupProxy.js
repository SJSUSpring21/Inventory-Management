const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    createProxyMiddleware("/api", {
      // target: "http://backend:5000",
      // target: "http://localhost:5000",
      target: process.env.PROD
        ? `http://${process.env.BACKEND_HOST}:5000`
        : "http://localhost:5000",
    })
  );
};
