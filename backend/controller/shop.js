const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const { isAuthenticated } = require("../middleware/auth");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendShopToken = require("../utils/shopToken");


router.post('/create-shop',upload.single("file"),catchAsyncErrors(async(req,res,next)=>{

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
          name: req.body.name,
          email: email,
          password: req.body.password,
          avatar:fileUrl,
          address: req.body.address,
          phoneNumber: req.body.phoneNumber,
          zipCode:req.body.zipCode
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


    }catch(error){
         console.log("error!!!", error)
         return next(new ErrorHandler(error.message,500));

    }
}))

// create activation token
const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
};

// activate shop
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

        console.log("check activation", seller);

        sendShopToken(seller, 201, res);
      } catch (error) {
        // console.log(error)
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );


// login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await Shop.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;