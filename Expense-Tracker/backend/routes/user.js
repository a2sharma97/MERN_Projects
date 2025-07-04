const express = require("express");
const jwt = require("jsonwebtoken");
const {
  createExpense,
  deleteExpense,
  signupSchema,
  updateExpense,
} = require("../types");
const { User, Expense } = require("../db");
const JWT_SECRET = require("../config");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const updatedBody = signupSchema.safeParse(body);
  if (!updatedBody.success) {
    res.status(401).json({ msg: "Email already taken/ invalid inputs" });
  }
  const existingUser = await User.findOne({
    username: body.username,
  });
  console.log(existingUser);
  if (existingUser) {
    return res.status(411).json({ message: "Email already taken" });
  }
  const dbuser = await User.create(body);
  console.log(dbuser);
  const userId = dbuser._id;

  await Expense.create({
    userId,
    expenses: 0,
    income: 0,
    balance: 0,
    date: Date(),
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    message: "User created successfully",
    token,
  });
});
