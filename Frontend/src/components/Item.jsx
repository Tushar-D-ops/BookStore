import React, { useContext } from 'react'
import { TbShoppingBagPlus } from 'react-icons/tb'
import { ShopContext } from '../context/ShopContext'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const Item = ({book}) => {
    const {currency,addToCart}=useContext(ShopContext)
  return (
    <Link to={`/book/${book._id}`}>
    <div className='shadow-lg shadow-slate-900/30 bg-slate-100 rounded-3xl overflow-hidden hover:scale-110 transition-all duration-300 cursor-pointer max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto'>
  <div className='flexCenter bg-primary p-4 sm:p-6 rounded-3xl overflow-hidden relative group hover:p-2 transition-all duration-300 cursor-pointer'>
    <img 
      src={book.image} 
      className='shadow-xl shadow-slate-900/30 rounded-lg w-full h-auto object-cover' 
      alt={book.name} 
    />
  </div>
  <div className='p-3'>
    <div className='flexBetween'>
      <h4 className='h4 line-clamp-1 !my-0 text-sm sm:text-base md:text-lg'>{book.name}</h4>
      <span
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          addToCart(book._id);
        }}
      >
        <motion.div
          whileTap={{ scale: 0.8, rotate: 30 }}
          whileHover={{ scale: 1.2 }}
          className='flexCenter h-8 w-8 rounded cursor-pointer hover:bg-primary'
        >
          <TbShoppingBagPlus className='text-lg' />
        </motion.div>
      </span>
    </div>
    <div className='flexBetween pt-1'>
      <p className='font-bold capitalize text-xs sm:text-sm md:text-base'>{book.category}</p>
      <h5 className='h5 text-orange-500 pr-2 text-sm sm:text-base md:text-lg'>{currency}{book.price}</h5>
    </div>
  </div>
</div>

    </Link>
  )
}

export default Item
