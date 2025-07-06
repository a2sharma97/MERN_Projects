const express = require("express");
const jwt = require("jsonwebtoken");
const {
  signupSchema,
  signinSchema,
  updateUserSchema,
  deleteUserSchema,
} = require("../types");
const { User, Expense } = require("../db");
const { authMiddleware } = require("../middleware");
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
    category: 0,
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

router.post("/signin", async (req, res) => {
  const body = req.body;
  const updatedBody = signinSchema.safeParse(body);
  if (!updatedBody.success) {
    res
      .status(411)
      .json({ message: "Invalid username or password/ invaid input" });
    return;
  }
  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });
  console.log(user + "signin user");
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "Error occur while logging in",
  });
});

router.put("/user", authMiddleware, async (req, res) => {
  const body = req.body;
  const updateBody = updateUserSchema.safeParse(body);
  if (!updateBody.success) {
    return res.status(411).json({
      message: "Invalid input",
    });
  }
  const result = await User.updateOne(
    {
      _id: req.userId,
    },
    updateBody.data
  );
  if (result.matchedCount === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Updated sucessfully",
  });
});

router.delete("/user", authMiddleware, async (req, res) => {
  const result = await User.deleteOne({
    _id: body.userId,
  });
  if (result.deletedCount === 0) {
    return res.status(403).json({
      message: "No account to delete",
    });
  }
  res.status(200).json({
    success: true,
    message: "User Deleted",
  });
});

module.exports = router;
