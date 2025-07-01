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
    res.status(201).json({ success: true, msg: "PhoneBook created" });
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
    const result = await phoneBook.updateOne(
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
    if (result.matchedCount === 0) {
      return res.status(404).json({ msg: "PhoneBook not found" });
    }
    res.status(200).json({ success: true, msg: "PhoneBook Updated" });
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
    res.status(200).json({ success: true, msg: "PhoneBook deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error: ", error: err.message });
  }
});

//searching
app.get("/search", async (req, res) => {
  const filter = req.query.filter || "";
  try {
    const pBooks = await phoneBook.find({
      $or: [
        {
          name: {
            $regex: filter,
            $options: "i",
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
            $options: "i",
          },
        },
        {
          address: {
            $regex: filter,
            $options: "i",
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

//pagination and sorting: isme client side s page number and limit aati h i.e kis page pr jana h and us particular page
//pr limit kitni hogi data aane k and sorting is used for sort by name or createdAt
app.get("/phoneBook", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = ParseInt(req.query.limit) || 10;
  const sortBy = req.query.sortBy || "name";
  const order = req.query.order === "desc" ? -1 : 1;

  try {
    const result = await phoneBook
      .find({})
      .sort({ [sortBy]: order }) //by default mongo sort it by the given order
      .skip((page - 1) * limit) //this is also a mongo functionality(2-1) * 10 means skip 10 pages and show new
      .limit(limit); //sets the limit, how many to show

    const total = await phoneBook.countDocuments(); //it counts all the docs in our db
    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      items: result,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

app.listen(3000);
