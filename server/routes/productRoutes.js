const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getProductDetails,
  addProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController.js");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getProducts);
router.route("/featproducts").get(getFeaturedProducts);
router.route("/catproducts").get(getProductsByCategory);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
