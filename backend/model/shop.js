const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Please enter your shop name"],

    },
    email: {
        type: String, 
        required: [true,"Please enter your shop email address!"],
    }, 
    password:{
        type:String, 
        required: [true,"Please enter your password"],
        minLength: [6, "Password should be greater than 6 characters"],
        select: false,
    },
    description:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    phoneNumber: {
        type: Number,
        required:true
    },
    role:{
        type:String,
        default:"seller"
    },
    avatar:{
        
            type:String,
            required: true,
        
      
    }, 
    zipCode:{
        type: Number, 
        require: true
    },
   
    createAt:{
        type: Date, 
        default: Date.now(),
    }, 
    resetPasswordToken:String,
    resetPasswordTime: Date
});

//TODO HASH PASSWORD
shopSchema.pre("save", async function (next){
    if(!this.isModified("password")){
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
});
shopSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });

};

//TODO COMPARE PASSWORD
shopSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);

}
module.exports = mongoose.model("Shop", shopSchema);
