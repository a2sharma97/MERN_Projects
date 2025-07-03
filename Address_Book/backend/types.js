const zod = require("zod");

const createBook = zod.object({
  name: zod
    .string()
    .min(3, "name is required")
    .max(50)
    .transform((s) => s.trim()),
  phoneNumber: zod
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d{10}$/, "Phone number must contain only digits"),
  email: zod.string().email(),
  address: zod
    .string()
    .min(10, "address is required")
    .max(50)
    .transform((s) => s.trim()),
});

////the problem in this is we have to rewrite everything
// const updateBook = zod.object({
//   id: zod.string().min(2, "id is required"),
//   name: zod
//     .string()
//     .min(3, "name is required")
//     .max(50)
//     .transform((s) => s.trim())
//     .optional(),
//   phoneNumber: zod.number().min(10, "number is required").max(10).optional(),
//   email: zod.string().email().optional(),
//   address: zod
//     .string()
//     .min(10, "address is required")
//     .max(50)
//     .transform((s) => s.trim())
//     .optional(),
// });

//better approach
//extend means y existing schema m new properties add krna ya existing ones ko override krna
const updateBook = createBook.extend({
  id: zod.string().min(1, "id is required"),
});

const deleteBook = zod.object({
  id: zod.string().min(1),
});

module.exports = {
  createBook,
  updateBook,
  deleteBook,
};
