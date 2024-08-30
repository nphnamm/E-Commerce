const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {upload} = require("../multer");
const Event = require("../model/event");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();


// create product
router.post("/create-event",upload.array("images"), catchAsyncErrors(async(req,res,next)=>{
    try{
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop){
            return next(new ErrorHandler("Shop Id is invalid!", 400));

        }else{
            const files = req.files;
            const imageUrls = files.map((file)=> `${file.filename}`);

            const eventData = req.body;
            eventData.images = imageUrls
            eventData.shop = shop;
            const product = await Event.create(eventData);
            res.status(201).json({
                success: true,
                product,
            })
        }

    }catch(error){
        console.log('error',error);
         return next(new ErrorHandler(error,400))
    }
}));
// get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all events of a shop
router.get(
    "/get-all-events/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const events = await Event.find({ shopId: req.params.id });
  
        res.status(201).json({
          success: true,
          events,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );
  
module.exports = router; 
