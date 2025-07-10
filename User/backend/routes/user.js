const express = require("express");
const zod = require("zod");
const { User } = require("../server");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware/auth");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const payload = req.body;
  const { success } = userSchema.safeParse(payload);
  if (!success) {
    return res.status(411).json({ message: "invalid input" });
  }

  const existingUser = await User.findOne({
    username: payload.username,
  });

  if (existingUser) {
    return res.status(400).json({ message: "Email already taken" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(payload.password, salt);
  const user = await User.create({
    firstName: payload.firstName,
    lastName: payload.lastName,
    username: payload.username,
    password: hashedPassword,
  });
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    success: true,
    message: "User created successfully",
    token,
  });
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const payload = req.body;
  const { success } = signinSchema.safeParse(payload);
  if (!success) {
    return res.status(400).json({ message: "invalid input" });
  }
  const user = await User.findOne({
    username: payload.username,
  });

  if (user) {
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token,
    });
    return;
  }

  res.status(400).json({
    message: "Error occur while logging in",
  });
});

const updateUserSchema = userSchema;
router.put("/update", authMiddleware, async (req, res) => {
  const payload = req.body;
  const { success } = updateUserSchema.safeParse(payload);
  if (!success) {
    return res.status(400).json({
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

router.delete("/delete", authMiddleware, async (req, res) => {
  const result = await User.deleteOne({
    _id: req.userId,
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

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findOne({
    _id: req.userId,
  });
  res.json({
    user,
  });
});

module.exports = router;
