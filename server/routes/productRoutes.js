const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProducts,
  addProduct,
} = require("../controllers/productController.js");

router.route("/products").get(getAllProducts);
router.route("/products").post(addProduct);
module.exports = router;
