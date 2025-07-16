const express = require("express");
const expenseRouter = require("./expense");
const router = express.Router();

router.use("/expense", expenseRouter);
module.exports = router;
