import React from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useContext, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'


const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const {books,navigate,backend_url,token,cartItems,setCartItems,getCartAmount,} = useContext(ShopContext);
  const [fromData, setFromData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    
    
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFromData(data => ({ ...data, [name]: value }))

  }

  const onSubmitHandler =async (e) => {
    e.preventDefault();
   try {
        let orderItems=[]
        for (const itemId in cartItems) {
          if (cartItems[itemId] > 0) {
            const itemInfo=books.find((book)=> book._id===itemId)
            if(itemInfo){
              orderItems.push({...itemInfo,quantity:cartItems[itemId]})
          }
        }
        }
        console.log(orderItems)
        console.log(fromData)

        let orderData={
          address:fromData,
          items:orderItems,
          amount:getCartAmount()+ 5.00,

        }
        console.log(orderData)
        switch (method) {
          case 'cod':
            const response= await axios.post(backend_url + "/api/order/place",orderData,{headers:{token}})
            if(response.data.success){
              toast.success(response.data.message)
              setCartItems({})
              navigate("/orders")
            }
            else{
              toast.error(response.data.message)
            }
            break;
            case 'stripe':
            const stripeResponse= await axios.post(backend_url + "/api/order/stripe",orderData,{headers:{token}})
            if(stripeResponse.data.success){
              const {session_url}=stripeResponse.data
              window.location.replace(session_url)
            }
            else{
              toast.error(stripeResponse.data.message)
            }
            break;

          default:
            break;
          }

    
   } catch (error) {
    if(error.response?.data?.message){
      toast.error(error.response.data.message)
    }
    else{
      console.log(error)
    }
    
   }

  }

  return (
    <section className='max-padd-container bg-white'>
      <Header />
      <form className='pt-28' onSubmit={onSubmitHandler}>
        <div className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
          <div className='flex flex-1 flex-col gap-3 text-[95%]'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}

            >
              <Title
                title1="Delivery "
                title2="Information"
                titleSyles="h3"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}


              className='flex gap-3'>
              <input onChange={onChangeHandler} value={fromData.firstName} type="text" name='firstName' placeholder='First Name' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2' required />
              <input onChange={onChangeHandler} value={fromData.lastName} type="text" name='lastName' placeholder='Last Name' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2' required />
            </motion.div>
            <motion.input
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onChange={onChangeHandler} value={fromData.email} required
              type="email" name='email' placeholder='Email' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
            <motion.input
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onChange={onChangeHandler} value={fromData.phone} required
              type="text" name='phone' placeholder='Phone Number' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
            <motion.input
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onChange={onChangeHandler} value={fromData.street} required
              type="text" name='street' placeholder='Street' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}

              className='flex gap-3'>
              <input onChange={onChangeHandler} value={fromData.city} type="text" name='city' placeholder='City' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2' required />
              <input onChange={onChangeHandler} value={fromData.state} type="text" name='state' placeholder='State' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2' required />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}

              className='flex gap-3'>
              <input onChange={onChangeHandler} value={fromData.zipcode} type="text" name='zipcode' placeholder='Zip Code' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2' required />
              <input onChange={onChangeHandler} value={fromData.country} type="text" name='country' placeholder='Country' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2'  required />
            </motion.div>
          </div>

          <div className='flex flex-1 flex-col'>
            <CartTotal />
            <div className='my-6'>
              <motion.h3
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}

                className='bold-20 mb-5'>Payment <span className='text-secondary'>Method</span></motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}

                className='flex gap-3'>
                <div onClick={() => setMethod("stripe")} className={`${method === 'stripe' ? 'btn-secondary' : 'btn-white'} !py-1 text-xs cursor-pointer`} >Stripe</div>
                <div onClick={() => setMethod("cod")} className={`${method === 'cod' ? 'btn-secondary' : 'btn-white'} !py-1 text-xs cursor-pointer`} >Cash On delivery</div>

              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}

            >
              <button type='submit' className='btn-secondaryOne w-full' >Place Order</button>
            </motion.div>
          </div>
        </div>


      </form>
      <Footer />
    </section>
  )
}

export default PlaceOrder
