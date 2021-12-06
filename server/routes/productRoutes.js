const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getProductDetails,
  addProduct,
} = require("../controllers/productController.js");

router.route("/products").get(getProducts);
router.route("/products").post(addProduct);
router.route("/featproducts").get(getFeaturedProducts);
router.route("/catproducts").get(getProductsByCategory);
router.route("/product/:id").get(getProductDetails);
router.route("/admin/products").get(getAllProducts);

module.exports = router;
