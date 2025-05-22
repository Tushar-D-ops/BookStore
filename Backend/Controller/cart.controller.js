import UserModel from "../models/userModel.js";
export const addToCart = async (req, res) => {
  try {
    const {userId,itemId} = req.body
    if(!userId || !itemId){
      return res.status(400).json({
        success:false,
        message:"User ID and Item ID are required"
      })
    }

    const userData= await UserModel.findById(userId)
    const cartData= userData.cartData

    if(cartData[itemId]){
      cartData[itemId]+=1
    }
    else{
      cartData[itemId]=1
    }
    await UserModel.findByIdAndUpdate(userId,{cartData})
    return res.status(200).json({
      success:true,
      message:"Item added to cart successfully",
    })  
    
  } catch (error) {
    next(error)
    
  }
}

export const updateCart = async (req, res) => {
     try {
            const {userId,itemId,quantity} = req.body
            const userData= await UserModel.findById(userId)
            const cartData= userData.cartData
            cartData[itemId]=quantity
            await UserModel.findByIdAndUpdate(userId,{cartData})
    return res.status(200).json({
      success:true,
      message:"Cart updated successfully",
    })
        
     } catch (error) {
        next(error)
     }
}


export const getUserCart = async (req, res) => {
  try {
         const {userId} = req.body
            const userData= await UserModel.findById(userId)
            const cartData= userData.cartData
            return res.status(200).json({
              success:true,
              data:cartData
            })

    
  } catch (error) {
    next(error)
  }
}

