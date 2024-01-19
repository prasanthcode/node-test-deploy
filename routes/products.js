const express = require("express");

const router = express.Router();
const productData = require("../products.json");

module.exports = () => {
  router.get("/", (req, res) => {
    // return res.send(productData);

    res.json(productData);
  });
//   router.get("/:id", (req, res) => {
//     req.params.id
//     res.json(productData);


//   });

  return router;
};
