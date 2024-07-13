const express = require("express");
const app = express();

// CONFIG
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path: "backend/config/.env"});
}
// app.use(express.json());

// // Route Imports
// const product = require("./routes/productRoute");
// app.use("api/v1", product);

module.exports = app;
