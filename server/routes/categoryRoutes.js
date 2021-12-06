const express = require("express");
const router = express.Router();

const {
  getCategories,
  addCategory,
} = require("../controllers/categoryController.js");

router.route("/categories").get(getCategories);
router.route("/category").post(addCategory);

module.exports = router;
