const mongoose = require("mongoose");

const connectToDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log("Couldn't connect to the database", error);
  }
};

module.exports = connectToDb;
