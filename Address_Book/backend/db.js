const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("connected to MongoDB");
  } catch (err) {
    console.log("connection error: ", err.message);
    process.exit(1);
  }
}

connectDB();

const AddressSchema = mongoose.Schema({
  name: String,
  phoneNumber: Number,
  email: String,
  address: String,
});

AddressSchema.index({ name: "text", email: "text", address: "text" });

const phoneBook = mongoose.model("phoneBooks", AddressSchema);

module.exports = {
  phoneBook,
};
