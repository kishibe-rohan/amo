const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Get All Categories
exports.getCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

//Add A New Category
exports.addCategory = catchAsyncErrors(async (req, res, next) => {
  const { title, cat, image } = req.body;

  const newCategory = await Category.create({
    title,
    cat,
    image,
  });

  res.status(201).json({
    success: true,
    newCategory,
  });
});
