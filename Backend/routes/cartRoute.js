import express from 'express';
import { addToCart, getUserCart, updateCart } from '../Controller/cart.controller.js';
import { authenticateUserToken } from '../utilities.js';

const cartRoute=express.Router();

cartRoute.post('/add',authenticateUserToken,addToCart)
cartRoute.post('/update',authenticateUserToken,updateCart)
cartRoute.post('/get',authenticateUserToken,getUserCart)
export default cartRoute;