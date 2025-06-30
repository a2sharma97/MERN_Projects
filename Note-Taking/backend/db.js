const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("connected to database");
  } catch (err) {
    console.log("mongodb connection error:", err.message);
    process.exit(1);
  }
};

connectDB();

const NoteSchema = mongoose.Schema({
  title: String,
  content: String,
});

NoteSchema.index({ title: "text", content: "text" });
const note = mongoose.model("allNotes", NoteSchema);
module.exports = {
  note,
};
