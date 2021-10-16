const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Get Products(Filter)
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 6;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(
    Product.find(),
    req.query.search().filter()
  );

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;
  apiFeature.pagination(resultsPerPage);

  products = await apiFeature.query;

  res.status(200),
    json({
      success: true,
      products,
      productsCount,
      resultsPerPage,
      filteredProductsCount,
    });
});

//Get All Products (Admin)
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
