module.exports = {
  MONGOURI: process.env.PROD
    ? `mongodb://${process.env.DB_HOST}:27017`
    : "mongodb+srv://sakethreddy:272password@cluster0.6ou4o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  JWT_SECRET: "abcdefg",
};
