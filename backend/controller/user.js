const express = require("express")
const path = require("path");
const router = express.Router();
const User = require("../model/user");
const {uplload} = require('../multer');
const ErrorHandler = require("../utils/ErrorHandler");



router.post("/create-user", upload.single("file"), async(req,res)=>{
    const {name, email,password} = req.body;


    const userEmail = await User.findOne({email});

    if(userEmail){
        return next(new ErrorHandler("User already exists",400));

    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const avatar = filter
    const user = {
        name: name,
        email: email, 
        password: password,
        avatar: file

    };
    console.log(user);


})

module.exports = router;
