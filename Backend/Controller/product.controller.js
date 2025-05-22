import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

const createProduct = async (req, res) => {

  try {
    console.log("hi");
    const{ name, description, price, category, popular } = req.body
    if (!name || !description || !price || !category || !popular) {
      return res.status(400).json({ message: "All fields are required" });
    }
 
    let imageUrl = "https://static.thenounproject.com/png/1077596-200.png";
    if(req.file){
        console.log("Uploaded File:", req.file);
        imageUrl=await cloudinary.uploader.upload(req.file.path, {resource_type:"image"}).then(res=>res.secure_url)
    }

    const productData= {
      name,
      image: imageUrl,
      category,
      price,
      desc: description,
      date: Date.now(),
      popular:popular==="true"?true:false,
    }
    const product = new productModel(productData);
    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });

    
  } catch (error) {
    next(error)
  }



}
const deleteProduct = async (req, res) => {

  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
    
  } catch (error) {
    next(error)
  }



}
const getAllProducts = async (req, res) => {

  try {
    const products = await productModel.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: products,
    });
    
  } catch (error) {
    next(error)
  }



}
const getProductById = async (req, res) => {

  try {
    const product = await productModel.findById(req.params.id);
    if (product) {
      return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: product,
    });  
    }
    else{
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    
    
  } catch (error) {
    next(error)
  }



}

export {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById
}