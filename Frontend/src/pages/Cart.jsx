import { Section } from 'lucide-react'
import React, { use } from 'react'
import { TbTrash } from 'react-icons/tb'
import { FaMinus, FaPlus } from 'react-icons/fa'
import Title from '../components/Title'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
const Cart = () => {

    const { books, navigate, currency, cartItems,updateQuantity,totalAmount,userCart } = useContext(ShopContext)
    
    useEffect(() => {
        userCart();
      }, []);


    return (
        <>
        <Header/>
        <section className='max-padd-container'>
            <div className='pt-28'>
                <motion.div
                initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5,delay:0.2}}
                
                >
                <Title
                    title1={"Cart "}
                    title2={"List"}
                    titleSyles={"h3"}
                />
                </motion.div>
                <div className='mt-6'>
                    {books.map((item,i) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <motion.div 
                                
                                initial={{opacity:0, y:50}}
                                 animate={{opacity:1, y:0}}
                                 transition={{duration:0.5,delay:i*0.05}}
                                
                                key={item._id} className='bg-white p-2 mt-3 rounded-lg shadow-md shadow-slate-400'>
                                    <div className='flex gap-x-3'>
                                        <div className='flex items-start gap-6'>
                                            <img src={item.image} alt="" className='w-14 rounded' />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <h5 className='h5 !my-0 line-clamp-1'>{item.name}</h5>
                                            <div className='flex items-strat justify-between'>
                                                <div><p className='mb-1.5'>{item.category}</p>
                                                    <div className='flex item-center ring-1 ringe-slate-900/5 rounded-full overflow-hidden bg-primary'>
                                                        <button onClick={()=>{updateQuantity(item._id,cartItems[item._id]-1)}} className='p-1.5 bg-white rounded-full shadow-md'><FaMinus /></button>
                                                        <p className='px-2 pt-1'>{cartItems[item._id]}</p>
                                                        <button onClick={()=>{updateQuantity(item._id,cartItems[item._id]+1)}} className='p-1.5 bg-white rounded-full shadow-md'><FaPlus className='text-xs' /></button>
                                                    </div></div>
                                                <h4 className='h4 text-orange-500'>{currency}{item.price}</h4>
                                                <TbTrash 
                                                onClick={()=>updateQuantity(item._id,0)} className='cursor-pointer text-xl text-secondary' />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        }
                        return null;
                    })}


                </div>
                <div className='flex mt-20'>
                    <div className='w-full sm:w-[450px]'>
                        <CartTotal/>
                        <motion.div
                        initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5,delay:1}}
                        
                        >
                        <button onClick={()=>navigate('/place-order')} className='btn-secondaryOne mt-7'>Proceed to Checkout</button>
                    </motion.div>
                    </div>
                </div>

            </div>
            <Footer/>
        </section>
        </>
    )
}

export default Cart
