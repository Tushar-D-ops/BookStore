import express from 'express';

import { createProduct, deleteProduct, getAllProducts, getProductById } from '../Controller/product.controller.js';
import upload from '../middleware/multer.js';
import { authenticateAdminToken } from '../utilities.js';


const productRouter=express.Router();
productRouter.post("/create",authenticateAdminToken,upload.single("image"), createProduct);
productRouter.delete("/delete/:id", authenticateAdminToken,deleteProduct);
productRouter.get("/getAll", getAllProducts);
productRouter.get("/getById/:id", getProductById);


export default productRouter