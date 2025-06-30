const express = require("express");
const { createNote, updateNote, deleteNote } = require("./types");
const { note } = require("./db");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/note", async (req, res) => {
  const createPayload = req.body;
  const parsePayload = createNote.safeParse(createPayload);
  if (!parsePayload.success) {
    res.status(400).json({ msg: "invalid input" });
    return;
  }
  try {
    await note.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.status(201).json({ msg: "Note created" });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

app.put("/update", async (req, res) => {
  const parsePayload = req.body;
  const updatePayload = updateNote.safeParse(parsePayload);
  if (!updatePayload.success) {
    res.status(400).json({ msg: "invalid inputs" });
    return;
  }
  try {
    await note.updateOne(
      {
        _id: req.body.id,
      },
      {
        title: req.body.title,
        content: req.body.content,
      }
    );

    res.status(200).json({ msg: "updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

app.delete("/delete", async (req, res) => {
  const parsePayload = req.body;

  const updatePayload = deleteNote.safeParse(parsePayload);
  if (!updatePayload.success) {
    res.status(400).json({ msg: "invalid input" });
    return;
  }
  try {
    const result = await note.deleteOne({
      _id: req.body.id,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.status(200).json({ msg: "note deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const notes = await note.find({});
    res.status(200).json({
      notes,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

//filter
app.get("/filter", async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const notes = await note.find({
      $or: [
        {
          title: {
            $regex: filter,
          },
        },
        {
          content: {
            $regex: filter,
          },
        },
      ],
    });

    // console.log(notes);
    res.json(notes.map(({ _id, title, content }) => ({ _id, title, content })));
  } catch (err) {
    console.log("filter error", err);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

app.listen(3000);
