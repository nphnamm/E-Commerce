const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());
app.use(cors());
  app.use("/", express.static("/uploads"))
app.use(bodyParser.urlencoded({extended:true}));



// CONFIG
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path: "backend/config/.env"});
}

// app.use(express.json());

// // Route Imports
// const product = require("./routes/productRoute");
// app.use("api/v1", product);

//import routes
const user= require("./controller/user");
app.use("/api/v2/user",user);


app.use(ErrorHandler);
module.exports = app;
