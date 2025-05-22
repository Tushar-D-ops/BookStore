import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import{motion} from 'framer-motion'
import Title from './Title'

const CartTotal = () => {

 const {currency,getCartAmount}=useContext(ShopContext)

  return (
    <div className='w-full'>

      <motion.div
        initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5,delay:0.1}}>
      <Title
        title1={"Cart "}
        title2={"Total"}
        titleSyles={"h3"}
      />
      </motion.div
      
      
      > 
      <motion.div 
      
      initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5,delay:0.3}}
      className='flexBetween pt-3'>
        <h5 className='h5'>SubTotal:</h5>
        <p className='h5'>{currency}{getCartAmount()}.00</p>
      </motion.div>
      <motion.hr 
      initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5,delay:0.4}}

      className="w-full h-px bg-gray-400 border-0 my-3"/>
      <motion.div 
      initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5,delay:0.5}}
      
      className='flexBetween pt-3'>
        <h5 className='h5'>Shipping Fee:</h5>
        <p className='h5'>{currency}{getCartAmount() > 75 || getCartAmount()===0 ? "0.00" :"5.00"}</p>
      </motion.div>
      <motion.hr 
      initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5,delay:0.6}}
      
      className="w-full h-px bg-gray-400 border-0 my-3"/>
      <motion.div
      initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5,delay:0.7}}

      className='flexBetween pt-3'>
        <h5 className='h5'>Grand Total:</h5>
        <p className='h5'>{currency}{getCartAmount() > 75 || getCartAmount()===0  ? `${getCartAmount()}.00` :`${getCartAmount()+5}.00`}</p>
      </motion.div>
      <motion.hr 
      initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5,delay:0.8}}
      
      className="w-full h-px bg-gray-400 border-0 my-3"/>
      
    </div>
  )
}

export default CartTotal
