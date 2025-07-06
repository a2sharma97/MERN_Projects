const express = require("express");
const { authMiddleware } = require("../middleware");
const { createExpense, updateExpense, deleteExpense } = require("../types");
const { Expense } = require("../db");

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  const payload = req.body;
  const parsePayload = createExpense.safeParse(payload);
  if (!parsePayload.success) {
    return res.status(411).json({
      message: "Invalid inputs",
    });
  }
  await Expense.create({
    income: payload.income,
    category: payload.category,
    expenses: payload.expenses,
    date: new Date(),
  });
  res.status(200).json({
    success: true,
    message: "created",
  });
});

router.put("/update", authMiddleware, async (req, res) => {
  const payload = req.body;
  const { success } = updateExpense.safeParse(payload);
  if (!success) {
    return res.status(411).json({
      message: "invalid inputs",
    });
  }
  await Expense.updateOne(
    {
      userId: req.userId,
    },
    {
      income: payload.income,
      category: payload.category,
      expenses: payload.expenses,
      date: new Date(),
    }
  );
  res.status(200).json({
    success: true,
    message: "update successfull",
  });
});

router.delete("/delete", authMiddleware, async (req, res) => {
  const payload = req.body;
  const { success } = deleteExpense.safeParse(payload);
  if (!success) {
    return res.status(411).json({
      message: "invalid input",
    });
  }
  await Expense.deleteOne({
    userId: payload.userId,
  });
  res.status(200).json({
    success: true,
    message: "deleted",
  });
});

router.get("/", authMiddleware, async (req, res) => {
  const allExpense = await Expense.find({});
  res.status(200).json({
    allExpense,
  });
});

module.exports = router;
