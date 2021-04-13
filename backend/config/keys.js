module.exports = {
    MONGOURI: process.env.PROD ? `mongodb://${process.env.DB_HOST}:27017` : "mongodb+srv://sa1:Abcd1234@cluster0.e82da.mongodb.net/<dbname>?retryWrites=true&w=majority",
    JWT_SECRET: "abcdefg"
}
