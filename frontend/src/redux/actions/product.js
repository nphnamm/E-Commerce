import axios from "axios";
import { server } from "../../server";
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create product 
export const createProduct = (newForm)=> async (dispatch)=>{
    try{
        dispatch({
            type:"productCreateRequest",
        });
        const config = {headers :{"Content-Type":"multipart/form-data"}};
  
        const {data }= await axios.post(`${server }/product/create-product`,newForm, config);

        dispatch({
            type:"productCreateSuccess",
            payload:data.product
        })
    }catch(error){
        dispatch({
            type:"productCreateFail",
            payload: error.response.data.message
        })
    }
    
}

//get all products of a shop 
Router.get("/get-all-products-shop/:id",catchAsyncErrors(async(req,res,next)=>{
    try{
        const products = await Product.find({shopId:req.params.id});
        res.status(201).json({
            success:true,
            products,
        })

    }catch(error){
        return next(new ErrorHandler(error,400));
    }
}))

