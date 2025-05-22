import React, { use, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import {books} from "../assets/data" 
import { createContext, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


export const ShopContext=createContext();
const ShopContextProvider = (props) => {

const currency="$"
const navigate=useNavigate()
const backend_url = import.meta.env.VITE_BACKEND_URL
const [books,setBooks]=useState([])
const [token,setToken]=useState("")
const [cartItems,setCartItems]=useState({})


const getAllBooks=async()=>{

   try {
    const response=await axios.get(backend_url+"/api/product/getAll")
    if(response.data.success){
      setBooks(response.data.products)
    }
    else{
      console.log(response.data.message)
      toast.error(response.data.message)
    }
    
   } catch (error) {  
    console.log(error)
    
   }

}

useEffect(()=>{
  if(!token && localStorage.getItem("token")){
    setToken(localStorage.getItem("token"))
    userCart(localStorage.getItem("token"))
  }
  getAllBooks()
  
},[])

    const addToCart=async(itemId)=>{
          const cartData={...cartItems}
          if(cartData[itemId]){
            cartData[itemId]+=1

          }
          else{
            cartData[itemId]=1
          }

          setCartItems(cartData)

          if(token){
            try {
              
            
            const response = await axios.post(backend_url + "/api/cart/add",{itemId},{headers:{token}})
            if(response.data.success){
              toast.success(response.data.message)
            }
            else{
              toast.error(response.data.message)
            }

          } catch (error) {
              if(error.response?.data?.message){
                toast.error(error.response.data.message)
              }
            }
          
          }

    }

    const userCart=async(token)=>{
      if(token){
        try {
          const response = await axios.post(backend_url + "/api/cart/get",{},{headers:{token}})
          if(response.data.success){
            setCartItems(response.data.data)
          }
          else{
            toast.error(response.data.message)
          }
        } catch (error) {
          if(error.response?.data?.message){
            toast.error(error.response.data.message)
          }
        }
      }
    }

    const getCartCount=()=>{
      let totalCount=0
      for(const item in cartItems){
        try{
              if(cartItems[item] > 0){
                   totalCount+=cartItems[item]
              }
        }
        catch(error){
          console.log(error)
        }
      }
      return totalCount;
    }

   const getCartAmount = () => {
  let totalAmount = 0;
  for (const itemId in cartItems) {
    if (cartItems[itemId] > 0) {
      const item = books.find(book => book._id === itemId);
      if (item) {
        totalAmount += item.price * cartItems[itemId];
      }
    }
  }
  return totalAmount;
};


    const updateQuantity= async(itemId,qty)=>{
     const carData={...cartItems}
     carData[itemId]=qty
     setCartItems(carData)

     if(token){
      try {
        const response = await axios.post(backend_url + "/api/cart/update",{itemId,quantity:qty},{headers:{token}})
        if(response.data.success){
          toast.success(response.data.message)
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error) {
        if(error.response?.data?.message){
          toast.error(error.response.data.message)
        }
      }
     }
    }
    
    const contextValue = {books,currency,navigate,token,setToken,cartItems,setCartItems,addToCart,getCartCount,getCartAmount,updateQuantity,backend_url,userCart}
  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
