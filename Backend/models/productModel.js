import mongoose from "mongoose";

const productSchema  = new mongoose.Schema({
 
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    date:{
        type:Number,
        required:true,
    },
    popular:{
        type:Boolean,
    },
 
}
);

const productModel = mongoose.model("product",productSchema);
export default productModel