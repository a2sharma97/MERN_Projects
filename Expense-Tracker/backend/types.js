const zod = require("zod");

const createExpense = zod.object({
  income: zod.string().min(1),
  category: zod
    .string()

    .transform((s) => s.trim()),
  expenses: zod.string().min(1),
  date: zod.date(),
});

const updateExpense = createExpense.extend({
  id: zod.string().min(1),
});

const userSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8),
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
