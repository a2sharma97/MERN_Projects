const express = require("express");
const userRouter = require("./user");
const expenseRouter = require("./expense");
const router = express.Router();

router.use("/user", userRouter);
router.use("/expense", expenseRouter);
module.exports = router;
