const mongoose = require("mongoose");

const coupounCodeSchema = new mongoose.Schema({
   name:{
    type:String,
    required: [true,"Please enter your event product name"],
    unique:true,
   },
   value:{
    type:Number,
   },
   minAmount:{
    type:Number
   },
   maxAmount:{
    type:Number
   },
   shop:{
    type:Object,
    required:true
   },
   createdAt:{
    type:Date,
    default: Date.now()
   }
   
});

module.exports = mongoose.model("CoupounCodes", coupounCodeSchema);