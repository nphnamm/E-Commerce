const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
  app.use("/", express.static("/uploads"))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));



// CONFIG
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path: "config/.env"});
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
const user= require("./controller/user");
app.use("/api/v2/user",user);

app.use(ErrorHandler);

module.exports = app;
