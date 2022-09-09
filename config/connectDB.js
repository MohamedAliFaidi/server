const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB, () =>
      console.log("MongoDB connected")
    );
  } catch (err) {
    console.log(err);
  }
}
module.exports = connectDB;
