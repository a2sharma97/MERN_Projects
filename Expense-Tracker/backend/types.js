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

const userSchema = zod.object({
  username: zod.string().email().require(),
  password: zod.string().min(8).require(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signupSchema = userSchema.extend({});

const signinSchema = userSchema.extend({});

const updateUserSchema = userSchema.extend({
  id: zod.string().min(1, "id is required"),
});

const deleteUserSchema = userSchema.extend({
  id: zod.string().min(1),
});

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  signupSchema,
  signinSchema,
  updateUserSchema,
  deleteUserSchema,
};
