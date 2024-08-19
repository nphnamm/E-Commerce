const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");
const shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");


router.post('/create-shop',upload.single("file"),async(req,res,next)=>{

    try{
        const {email} = req.body; 
        const sellerEmail = await shop.findOne({email});
        if(sellerEmail){
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath,(err)=>{
                if(err){
                    console.log(err);
                    res.status(500).json({message: "Error deleting file"})
                }
            });
            return next(new ErrorHandler("Shop already exists",400));

        }
        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        const seller = {
          name: name,
          email: email,
          password: password,
          avatar: fileUrl,
        };
        const activationToken = createActivationToken(seller);
        const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;
        console.log("check", activationUrl);
        try {
            await sendMail({
              email: seller.email,
              subject: "Activate your shop",
              message: `Hello ${seller.name}, please click on the link to active your account: ${activationUrl}`,
            });
            res.status(201).json({
              success: true,
              message: `please check your email: ${seller.email} to activate your shop`,
            });
          } catch (error) {
            console.log("Error", error);
            return next(new ErrorHandler(error.message, 500));
          }


    }catch(eror){
        return next(new ErrorHandler(error.message,400));

    }
})

// create activation token
const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
};

// activate user
router.post(
    "/activation",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { activation_token } = req.body;
  
        const newSeller = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET
        );
  
        if (!newSeller) {
          return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, avatar, zipCode, address, phoneNumber } =
          newSeller;
  
        let seller = await Shop.findOne({ email });
  
        if (seller) {
          return next(new ErrorHandler("User already exists", 400));
        }
  
        seller = await Shop.create({
          name,
          email,
          avatar,
          password,
          zipCode,
          address,
          phoneNumber,
        });
  
        sendShopToken(seller, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
module.exports = router;