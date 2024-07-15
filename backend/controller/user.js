const express = require("express");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,"uploads");
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + "-" + Math.round.apply(Math.random() *1e9);
        const filename = file.originalname.split(".")[0];
    }
})