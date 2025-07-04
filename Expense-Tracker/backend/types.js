const zod = require("zod");

const createExpense = zod.object({
  expense: zod.string().min(1),
  income: zod.string().min(1),
  date: zod.date(),
});

const updateExpense = createExpense.extend({
  id: zod.string().min(1),
});

const deleteExpense = zod.object({
  id: zod.string().min(1),
});

const signupSchema = zod.object({
  username: zod.string().email().require(),
  password: zod.string().require(),
  firstName: zod.string(),
  lastName: zod.string(),
});

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  signupSchema,
};
