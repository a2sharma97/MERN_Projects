const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();
app.use(cors()); //handles the cors problem when connecting backend to frontend
app.use(express.json());

app.use("/tracker", mainRouter); //whenever the request come to tracker it will be handled by the mainRouter

app.listen(3000);
