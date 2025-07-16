const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI; //as we know we cannot use export in .env file so to use .env's variables we use this

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to the database");
  } catch (err) {
    console.log("mongoDB connection error: ", err.message);
    process.exit(1);
  }
};

connectDB();

const expenseSchema = mongoose.Schema({
  expense: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    minLength: 0,
    maxLength: 12,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = {
  Expense,
};
