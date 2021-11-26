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

//Add Product
exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, rating, category } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    rating,
    category,
    images: [
      {
        public_id: "Sample ID",
        url: "productPictureURL",
      },
    ],
  });

  res.status(201).json({
    success: true,
    product,
  });
});

//  Reviews Section

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avgRating = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a Product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {});
