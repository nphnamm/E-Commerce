const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Please enter your name"],

    },
    email: {
        type: String, 
        required: [true,"Please enter your email!"],
    }, 
    password:{
        type:String, 
        required: [true,"Please enter your password"],
        minLength: [4, "Password should be greater than 4 characters"],
        select: false,
    }, 
    phoneNumber: {
        type: Number
    },
    addresses:[
        {
            country:{
                type:String,
            },
            city:{
                type:String,
            },
            address1:{
                type:String,
            },
            address2:{
                type:String,
            },
            zipCode:{
                type:Number,
            },
            addressType:{
                type:String,
            }

        }
    ],
    role:{
        type:String,
        default:"user"
    },
    avatar:{
        type:String,
        required: true,
    }, 
    createAt:{
        type: Date, 
        default: Date.now(),
    }, 
    resetPasswordToken:String,
    resetPasswordTime: Date
});

//TODO HASH PASSWORD

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
        });

};

//TODO COMPARE PASSWORD
userSchema.methods.comparaPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);

}
module.exports = mongoose.model("User", userSchema);
