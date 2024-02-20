const express = require("express");

const aboutRoute = require("./about");
const productsRoute = require("./products");

const router = express.Router();

module.exports = () => {
  router.get("/", (request, response) => {
    // response.render('pages/index',{pageTitle: 'welcome'});

    //   response.sendFile(path.join(__dirname, "./static/index.html"));
    response.send("hello prasanth  from express ;)");
  });
  router.use("/about", aboutRoute());
  // router.use("/upload", uploadRoute());
  router.use("/products", productsRoute());
  return router;
};