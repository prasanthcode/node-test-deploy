const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true});

const db = mongoose.connection;
db.on('error',(error)=> console.error(error));
db.once('open',()=>console.log("connected to Database"));

const cors = require("cors");
const path = require("path");
const app = express();

const routes = require("./routes");
const port = process.env.PORT || 5000;

app.use(cors());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname, "./static")));
app.use(express.json());
app.use('/',routes());
app.listen(port, () => {
  console.log(`Express server running on port ${port};`);
});

