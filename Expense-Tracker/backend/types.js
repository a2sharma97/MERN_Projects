const zod = require("zod");

const createExpense = zod.object({
  category: zod.string().transform((s) => s.trim()),
  expense: zod.number().min(1),
});

const updateExpense = createExpense.extend({
  id: zod.string().min(1),
});

const deleteExpense = zod.object({
  id: zod.string().min(1),
});

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
};
