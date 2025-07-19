const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/user");
const bcrypt = require("bcryptjs");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", mainRouter);

app.listen(3000);
