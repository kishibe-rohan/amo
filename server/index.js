const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const connectDB = require("./dbConnect.js");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: ".env" });
}

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down server due to Uncaught Exception");
  process.exit(1);
});

//Import routes
const productRoute = require("./routes/productRoutes.js");
const userRoute = require("./routes/userRoutes.js");
const orderRoute = require("./routes/orderRoutes.js");
const paymentRoute = require("./routes/paymentRoutes.js");
const categoryRoute = require("./routes/categoryRoutes.js");

const PORT = process.env.PORT || 5000;
const app = express();

//Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extension: true }));
app.use(fileUpload());
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

//Set up routes
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);
app.use("/api/v1", categoryRoute);

//Connect to database
connectDB();

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Server shutting down due to Unhandled Promise..");

  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
