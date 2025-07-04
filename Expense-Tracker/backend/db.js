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

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 15,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 15,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 15,
  },
});

const expenseSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expenses: {
    type: Number,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Expense = mongoose.model("allExpense", expenseSchema);
const User = mongoose.model("User", userSchema);
module.exports = {
  Expense,
  User,
};
