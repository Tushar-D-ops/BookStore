import express from 'express';
import { authenticateAdminToken,authenticateUserToken } from '../utilities.js';
import { allOrders, updateStatus,placeOrder, placeOrderStripe,verifyStripe,userOrders } from '../Controller/order.controller.js';

const orderRouter = express.Router();

orderRouter.post('/allorders',authenticateAdminToken,allOrders)
orderRouter.post('/status',authenticateAdminToken,updateStatus)
orderRouter.post('/place',authenticateUserToken,placeOrder)
orderRouter.post('/stripe',authenticateUserToken,placeOrderStripe)
orderRouter.post('/verifystripe',authenticateUserToken,verifyStripe)
orderRouter.post('/userorders',authenticateUserToken,userOrders)


export default orderRouter