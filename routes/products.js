const express = require("express");

const router = express.Router();
const Product = require("../models/product");

module.exports = () => {
  router.get("/", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  router.get("/:id", getProduct, (req, res) => {
    res.json(res.product);
  });
  router.post("/", async (req, res) => {
    const product = new Product({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    });
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    // req.params.id
  });
  router.patch("/:id", getProduct, async (req, res) => {
    if (req.body.name != null) {
      res.product.name = req.body.name;
    }
    if (req.body.id != null) {
      res.product.id = req.body.id;
    }
    if (req.body.price != null) {
      res.product.price = req.body.price;
    }
    if (req.body.description != null) {
      res.product.description = req.body.description;
    }
    if (req.body.category != null) {
      res.product.category = req.body.category;
    }

    try {
      const updatedProduct = await res.product.save();
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    // req.params.id
  });
  router.delete("/:id", getProduct, async (req, res) => {
    // req.params.id
    try {
      await res.product.deleteOne();
      res.json({ message: "Deleted product" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  async function getProduct(req, res, next) {
    let product;
    try {
      product = await Product.findById(req.params.id);
      if (product == null) {
        return res.status(404).json({ message: err.message });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
  }
  return router;
};
