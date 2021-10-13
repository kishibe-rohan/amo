const express = require("express");
const router = express.Router();

const { getAllProducts } = require("../controllers/productController.js");

router.route("/products").get(getAllProducts);
module.exports = router;
