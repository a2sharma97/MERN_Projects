const express = require("express");
const { createExpense, updateExpense, deleteExpense } = require("../types");
const { Expense } = require("../db");

const router = express.Router();

router.post("/add", async (req, res) => {
  const payload = req.body;
  const parsePayload = createExpense.safeParse(payload);
  if (!parsePayload.success) {
    return res.status(411).json({
      message: "Invalid inputs",
    });
  }
  try {
    await Expense.create({
      category: payload.category,
      expense: payload.expense,
    });
    res.status(201).json({
      success: true,
      message: "created",
    });
  } catch (err) {
    res.status(500).json({ msg: "some Error:", error: err.message });
  }
});

router.put("/update", async (req, res) => {
  const payload = req.body;
  const { success } = updateExpense.safeParse(payload);
  if (!success) {
    return res.status(411).json({
      message: "invalid inputs",
    });
  }
  try {
    await Expense.updateOne(
      {
        _id: payload.id,
      },
      {
        category: payload.category,
        expense: payload.expense,
      }
    );
    res.status(200).json({
      success: true,
      message: "update successfull",
    });
  } catch (err) {
    res.status(500).json({ msg: "some Error:", error: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  const payload = req.body;
  const { success } = deleteExpense.safeParse(payload);
  if (!success) {
    return res.status(411).json({
      message: "invalid input",
    });
  }
  try {
    await Expense.deleteOne({
      _id: payload.id,
    });
    res.status(200).json({
      success: true,
      message: "deleted",
    });
  } catch (err) {
    res.status(500).json({ msg: "some Error:", error: err.message });
  }
});

router.get("/", async (req, res) => {
  const Expenses = await Expense.find({});
  try {
    res.status(200).json({
      Expenses,
    });
  } catch (err) {
    res.status(500).json({ msg: "some Error:", error: err.message });
  }
});

module.exports = router;
