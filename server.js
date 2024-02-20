require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");




mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to Database"));

const routes = require("./routes");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./static")));
app.use(express.json());
app.use("/", routes());

app.listen(port, () => {
  console.log(`Express server running on port ${port};`);
});
module.exports = app;
