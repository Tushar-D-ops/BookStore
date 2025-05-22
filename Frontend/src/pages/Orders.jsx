import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Title from '../components/Title'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { motion } from 'framer-motion'

const Orders = () => {

    const {backend_url,token,currency}=useContext(ShopContext)
    const [orders, setOrders] = useState([])

    const loadOrders=async () =>{
        try {

            if(!token){
                return null
            }
            const response= await axios.post(backend_url + "/api/order/userorders",{},{headers:{token}})
            console.log(response)
            if(response.data.success){
                let allOrdersItem=[]
                response.data.orders.map((order)=>{
                    order.items.map((item)=>{
                        item['status']=order.status
                        item['payment']=order.payment
                        item['paymentMethod']=order.paymentMethod
                        item['date']=order.date
                        allOrdersItem.push(item)
                    })
                })
                setOrders(allOrdersItem)
                console.log(orders)
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

    useEffect(() => {
        loadOrders()
    }, [token])

  return (
    <section className='max-padd-container'>
  <Header />
  <div className='pt-28'>
    <motion.div
    initial={{opacity:0, y:50}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5,delay:0.1}}
    
    
    >
    <Title title1={"Order "} title2={'List'} title1Styles={"h3"} />
    </motion.div>
    {orders.map((item, i) => (
      <motion.div
      initial={{opacity:0, y:50}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5,delay:i*0.2}}
      
      key={i} className='bg-white p-4 mt-4 rounded-lg shadow-sm'>
        <div className='text-gray-700 flex flex-col gap-4 sm:flex-row'>
          
          {/* Image Section */}
          <div className='flex-shrink-0'>
            <img
              src={item.image}
              alt=""
              className='object-cover rounded aspect-square w-[70px] sm:w-[100px]'
            />
          </div>

          {/* Details Section */}
          <div className='flex flex-col flex-grow justify-between w-full'>
            <h5 className='text-base font-semibold line-clamp-1 mb-2'>{item.name}</h5>

            <div className='flex flex-col gap-2 sm:flex-row md:justify-between'>

              {/* Left Group */}
              <div className='flex flex-wrap gap-3 text-sm'>
                <div className='flex items-center gap-x-1'>
                  <span className='font-medium'>Price:</span>
                  <p>{currency}{item.price}</p>
                </div>

                <div className='flex items-center gap-x-1'>
                  <span className='font-medium'>Quantity:</span>
                  <p>{item.quantity}</p>
                </div>

                <div className='flex items-center gap-x-1'>
                  <span className='font-medium'>Payment:</span>
                  <p>{item.paymentMethod}</p>
                </div>

                <div className='flex items-center gap-x-1'>
                  <span className='font-medium'>Date:</span>
                  <p className='text-gray-500'>{new Date(item.date).toDateString()}</p>
                </div>
              </div>

              {/* Right Group */}
              <div className='flex flex-col items-start gap-2 sm:items-end'>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-secondary'></span>
                  <p className='text-sm'>{item.status}</p>
                  
                </div>
                <button onClick={loadOrders} className='btn-secondaryOne !px-2 !py-1 !text-xs'>
                  Refresh Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
  <Footer />
</section>

  )
}

export default Orders
