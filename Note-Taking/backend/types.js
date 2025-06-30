const zod = require("zod");

const createNote = zod.object({
  title: zod
    .string()
    .min(2, "title is required")
    .max(150)
    .transform((s) => s.trim()),
  content: zod
    .string()
    .min(2, "content is required")
    .max(2000)
    .transform((s) => s.trim()),
});

const updateNote = zod.object({
  id: zod.string().min(1, "id is required"),
  title: zod
    .string()
    .min(2, "title is required")
    .max(150)
    .transform((s) => s.trim())
    .optional(),
  content: zod
    .string()
    .min(2, "content is required")
    .max(2000)
    .transform((s) => s.trim())
    .optional(),
});

const deleteNote = zod.object({
  id: zod.string().min(1, "id is required"),
});

module.exports = {
  createNote,
  updateNote,
  deleteNote,
};
