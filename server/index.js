const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./dbConnect.js");

dotenv.config();

//Import routes
const productRoute = require("./routes/productRoutes.js");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

//Set up routes
app.use("/api/v1", productRoute);

//Connect to database
connectDB();

//Start server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
