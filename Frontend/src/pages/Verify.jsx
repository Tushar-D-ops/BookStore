import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { use } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Verify = () => {

  const {navigate,token,setCartItems,backend_url} = useContext(ShopContext)
  const[searchParams,setSearchParams]=useSearchParams()
  
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const userId = searchParams.get("userId");

  const verifyPayment=async()=>{
    try {
      if(!token){
        return null
      }

     const response= await axios.post(backend_url + `/api/order/verifystripe`,{success,orderId},{headers:{token}})
     if(response.data.success){
      setCartItems({})    
      navigate("/orders")

    } 
    else{
      navigate("/")
    }
  }catch (error) {
      if(error.response?.data?.message){
        toast.error(error.response.data.message)
      }
      
    }
  }


  useEffect (()=>{
    verifyPayment()
  },[token])


  return (
    <div>
      
    </div>
  )
}

export default Verify
