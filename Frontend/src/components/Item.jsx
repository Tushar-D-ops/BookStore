import React, { useContext } from 'react'
import { TbShoppingBagPlus } from 'react-icons/tb'
import { ShopContext } from '../context/ShopContext'
import { motion } from 'framer-motion'


const Item = ({book}) => {
    const {currency,addToCart}=useContext(ShopContext)
  return (
    <div className='shadow-lg shadow-slate-900/30 bg-slate-100 rounded-3xl overflow-hidden hover:scale-110 transition-all duration-300 cursor-pointer'>
      <div className='flexCenter bg-primary p-6 rounded-3xl overflow-hidden relative group hover:p-2 transition-all duration-300 cursor-pointer'>
        <img src={book.image} className=' shadow-xl shadow-slate-900/30 rounded-lg' alt="" />
      </div>
      <div className='p-3'>
        <div className='flexBetween'>
            <h4 className='h4 line-clamp-1 !my-0'>{book.name}</h4>
            <span
  onClick={() => addToCart(book._id)}
>
  <motion.div
    whileTap={{ scale: 0.8, rotate: 30 }} // Click animation
    whileHover={{ scale: 1.2 }} // Optional hover effect
    className='flexCenter h-8 w-8 rounded cursor-pointer hover:bg-primary'
  >
    <TbShoppingBagPlus className='text-lg' />
  </motion.div>
</span>
        </div>
        <div className='flexBetween pt-1'>
            <p className='font-bold capitalize'>{book.category}</p>
            <h5 className='h5 text-orange-500 pr-2'>{currency}{book.price}</h5>
        </div>
        <p className='line-clamp-2 py-1'>{book.description}</p>
      </div>
    </div>
  )
}

export default Item
