const zod = require("zod");

const createBook = zod.object({
  name: zod
    .string()
    .min(3, "name is required")
    .max(50)
    .transform((s) => s.trim()),
  phoneNumber: zod.number().min(10, "number is required").max(10),
  email: zod.string().email(),
  address: zod
    .string()
    .min(10, "address is required")
    .max(50)
    .transform((s) => s.trim()),
});

const updateBook = zod.object({
  id: zod.string().min(2, "id is required"),
  name: zod
    .string()
    .min(3, "name is required")
    .max(50)
    .transform((s) => s.trim())
    .optional(),
  phoneNumber: zod.number().min(10, "number is required").max(10).optional(),
  email: zod.string().email().optional(),
  address: zod
    .string()
    .min(10, "address is required")
    .max(50)
    .transform((s) => s.trim())
    .optional(),
});

const deleteBook = zod.object({
  id: zod.string().min(1),
});

module.exports = {
  createBook,
  updateBook,
  deleteBook,
};
