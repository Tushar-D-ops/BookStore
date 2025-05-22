
import jwt from "jsonwebtoken"


export const authenticateAdminToken=(req,res,next)=>{
try {
  

const {token} =req.headers

  if(!token){
    return next(errorHandler(401,"Unauthorized"))
  }
 const toke_decode= jwt.verify(token, process.env.JWT_SECRET)
  if(toke_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
    return next(errorHandler(401,"Unauthorized"))
  }
  next()
} catch (error) {
  next(error)
}
}


export const authenticateUserToken=(req,res,next)=>{
try {
  

const {token} =req.headers

  if(!token){
    return next(errorHandler(401,"unauthorized"))
  }
 const toke_decode= jwt.verify(token, process.env.JWT_SECRET)
  req.body.userId=toke_decode.id
  
  next()
} catch (error) {
  next(error)
}
}

export const errorHandler=(statusCode, Message)=>{
  const error = new Error();
  error.statusCode=statusCode
  error.message=Message
  return error
}
