const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsynErrors");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllProducts = (req, res) => {
  res.status(200).json({ message: "This is the Product route" });
};
