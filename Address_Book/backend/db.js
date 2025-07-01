const mongoose = require("mongoose");
const { string } = require("zod");
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

const AddressSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, index: true, unique: true },
    email: { type: String, required: true, match: /.+@.+\..+/, unique: true },
    address: { type: String, required: true },
  },
  { autoIndex: false } // disable auto-indexing in production
);

//Mongo rebuilds these indexes when your app starts—okay for development,
//  but best to disable auto-indexing in production for performance.

AddressSchema.index({
  name: "text",
  email: "text",
  address: "text",
  phoneNumber: "text",
});

const phoneBook = mongoose.model("phoneBooks", AddressSchema);

module.exports = {
  phoneBook,
};
