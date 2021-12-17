const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const connectDB = require("./dbConnect.js");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: ".env" });
}

//Import routes
const productRoute = require("./routes/productRoutes.js");
const userRoute = require("./routes/userRoutes.js");
const categoryRoute = require("./routes/categoryRoutes.js");

const PORT = process.env.PORT || 5000;

//Middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extension: true }));
app.use(fileUpload());
const errorMiddleware = require("./middleware/error");

//Set up routes
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", categoryRoute);

//Connect to database
connectDB();

//Start server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

module.exports = app;
