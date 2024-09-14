const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// app.use(express.static(__dirname + '/public'));

app.use("/", express.static("/uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// Endpoint lấy file hình ảnh
// GET method to retrieve the uploaded image
app.get("/:filename", (req, res) => {
  const { filename } = req.params;
  const filepath = path.join(__dirname, "..", "uploads", filename);
  console.log("file path", filepath);
  // Check if the file exists
  fs.access(filepath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("File not found.");
    }
    // Send the image file to the client
    res.sendFile(filepath);
  });
});

// CONFIG
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/.env" });
}
app.use(express.json());
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
// // Route Imports
// const product = require("./routes/productRoute");
// app.use("api/v1", product);

//import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupons = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupons);
app.use("/api/v2/order", order);
app.use("/api/v2/payment", payment);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);

app.use(ErrorHandler);

module.exports = app;
