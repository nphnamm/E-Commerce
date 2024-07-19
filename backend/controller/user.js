const express = require("express")
const path = require("path");
const router = express.Router();
const User = require("../model/user");
const {upload} = require('../multer');
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");

router.post("/create-user", upload.single("file"), async(req,res,next)=>{
    
    try {
    const {name, email,password} = req.body;

    const userEmail = await User.findOne({email});

    if(userEmail){
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;

        // fs.unlink is a Node. js function used to delete a file from the filesystem. 
        // It's part of the fsmodule, which provides an interface for 
        //interacting with the file system.
        fs.unlink(filePath, (err)=>{
            if(err){
                console.log(err);
                res.status(500).json({message: "Error deleting file"});

            }else{
                res.json({message: "File deleted successfully"});

            }
        });
        return next(new ErrorHandler("User already exists", 400));


    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
        name: name,
        email: email, 
        password: password,
        avatar: fileUrl

    };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    console.log('check', activationUrl);
    try {
        await sendMail({
            email: user.email,
            subject: "Activate your account",
            message: `Hello ${user.name}, please click on the link to active your account: ${activationUrl}`,

        })
        res.status(201).json({
            success:true,
            message: `please check your email: -${user.email} to activate your account`
        })

    }catch(error){
        console.log("Error", error);
        return next(new ErrorHandler(error.message,500));

    }


    console.log(user);
    const newUser = await User.create(user);
    res.status(201).json({
        success: true,
        newUser,

    })
    } catch (error) {
    return next(new ErrorHandler(error.message, 500));
    }

});

// Crete Activation Token
const createActivationToken = (user) =>{
    return jwt.sign(user,process.env.ACTIVATION_SECRET,{expiresIn:"5m"});
}


module.exports = router;
