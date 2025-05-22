
import orderModel from "../models/orderModel.js"
import UserModel from "../models/userModel.js"
import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config()

const currency= 'usd'
const deliveryCharges=5

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)


const placeOrder = async (req, res,next) => {
    try {
        const {userId,items,amount,address} = req.body
        const neworder = new orderModel({
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        })
        await(neworder.save())

        await UserModel.findByIdAndUpdate(userId, {cartData:{}})
        return res.status(201).json({
            success:true,
            message:"Order Placed Successfully",
        })  
        
    } catch (error) {
        next(error)
    }
}

const placeOrderStripe = async (req, res,next) => {
    try {

         const {userId,items,amount,address} = req.body
         const {origin} =req.headers
        const neworder = new orderModel({
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        })
        await(neworder.save())




        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
            

        })) 
        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount: deliveryCharges*100
            },
            quantity: 1
        })
        const session= await stripe.checkout.sessions.create({
            
            line_items,
            mode:"payment",
            success_url:`${origin}/verify?success=true&orderId=${neworder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${neworder._id}`,
        })
        return res.status(201).json({
            success:true,
            message:"Order Placed Successfully",
            sessionId: session.id,
            session_url: session.url
        })
        
    } catch (error) {
        next(error)
    }
}
const verifyStripe = async (req, res,next) => {
  try {
    const { success, orderId,userId } = req.body;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Order Placed",
      });
      await UserModel.findByIdAndUpdate(userId, { cartData: {} });
      res.status(201).json({
        success: true,
        message: "Order Placed Successfully",})
    } else {
      await orderModel.findOneAndDelete(orderId); // optionally remove failed orders
      return res.json({ success: false, message: "Failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Stripe verification failed", error });
  }
};

const allOrders = async (req, res,next) => {
    try {
        const orders= await orderModel.find().sort({date:-1})
        return res.status(200).json({
            success:true,
            message:"Orders fetched successfully",
            orders:orders
        })
        
    } catch (error) {
        next(error)
    }
}

const userOrders = async (req, res,next) => {
    try {

        const {userId} = req.body
        const orders= await orderModel.find({userId}).sort({date:-1})
        return res.status(200).json({
            success:true,
            message:"Orders fetched successfully",
            orders:orders
        })
        
    } catch (error) {
        next(error)
    }
}


const updateStatus = async (req, res) => {
    try {
        const {orderId,status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        return res.status(200).json({
            success:true,
            message:"Order status updated successfully",
        })
        
    } catch (error) {
        next(error)
    }
}

export {
    placeOrder,
    placeOrderStripe,
    verifyStripe,
    allOrders,
    userOrders,
    updateStatus
}