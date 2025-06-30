const express = require("express");
const cors = require("cors");
const { createBook, updateBook, deleteBook } = require("./types");
const { phoneBook } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/phonebook", async (req, res) => {
  const createPayload = req.body;
  const parsePayload = createBook.safeParse(createPayload);
  if (!parsePayload.success) {
    res.status(401).json({ msg: "invalid input" });
    return;
  }
  try {
    await phoneBook.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      address: req.body.address,
    });
    res.status(201).json({ msg: "PhoneBook created" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error: " + err.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const allPhoneBooks = await phoneBook.find({});
    res.status(200).json({
      allPhoneBooks,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error: " + err.message });
  }
});

app.put("/update", async (req, res) => {
  const parsePayload = req.body;
  const updatePayload = updateBook.safeParse(parsePayload);
  if (!updatePayload.success) {
    res.status(401).json({ msg: "invalid input" });
    return;
  }
  try {
    await phoneBook.updateOne(
      {
        _id: parsePayload.id,
      },
      {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
      }
    );
  } catch (err) {
    res.status(500).json({ msg: "Server Error: " + err.message });
  }
});

app.delete("/delete", async (req, res) => {
  const parsePayload = req.body;
  const updatePayload = deleteBook.safeParse(parsePayload);
  if (!updatePayload.success) {
    res.status(401).json({ msg: "invalid inputs" });
    return;
  }
  try {
    const result = await phoneBook.deleteOne({
      _id: req.body.id,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "PhoneBook not Found" });
    }
    res.status(200).json({ msg: "PhoneBook deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error: ", error: err.message });
  }
});

app.get("/search", async (req, res) => {
  const inputs = req.query.filter || "";
  try {
    const pBooks = await phoneBook.find({
      $or: [
        {
          name: {
            $regex: filter,
          },
        },
        {
          phoneNumber: {
            $regex: filter,
          },
        },
        {
          email: {
            $regex: filter,
          },
        },
        {
          address: {
            $regex: filter,
          },
        },
      ],
    });
    res.json(
      pBooks.map(({ _id, name, phoneNumber, email, address }) => ({
        _id,
        name,
        phoneNumber,
        email,
        address,
      }))
    );
  } catch (err) {
    res.status(500).json({ msg: "Server Error: ", error: err.message });
  }
});

app.listen(3000);
