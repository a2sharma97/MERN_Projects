const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/user");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", mainRouter);

app.listen(3000);
