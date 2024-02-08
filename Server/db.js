const mongoose = require("mongoose");

const mongoURI = process.env.ATLAS_URL;

mongoose.set("strictQuery", true);

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, (error) => {
      if (error) {
        return new Error("Failed to connect to database");
      }
      console.log("connected to mongodb");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
