import React from 'react'
import { useState,useEffect } from 'react'
import {backend_url} from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { TfiPackage } from 'react-icons/tfi'
const Orders = ({token}) => {

 const [orders, setOrders] = useState([])
 const currency = "$"

   const allOrders= async () => {
    if(!token){
      return null
    }
    try {
      const response = await axios.post(backend_url + "/api/order/allorders", {},{ headers: {token}})
      if (response.data.success) {
        setOrders(response.data.orders)
        console.log(response.data.orders)
      }
    } 
    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Something went wrong")
      }
      console.log(error)
    }
  }


  const statusHandler=async(e,orderId)=>{
   try {
      const response = await axios.post(backend_url + `/api/order/status`, {orderId,status:e.target.value},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await allOrders()
      }
      else{
        toast.error(response.data.message)
      }
   } catch (error) {
     if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Something went wrong")
      }
      console.log(error)
    
   }
  }

  useEffect(() => {
    allOrders()
  }, [token])

  return (
    <section className='px-2 sm:px-8 mt-4 sm:mt-14 text-secondary '>
      <div className='flex flex-col gap-4'>
        {orders.map((order)=>(
          <div key={order._id} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] gap-4 items-start p-4 rounded-lg bg-white text-secondary shadow-sm">
  
  
  <div className="hidden xl:flex items-center justify-center bg-primary rounded p-6 ring-1 ring-slate-900/5">
    <TfiPackage className="text-3xl text-secondary" />
  </div>

  
  <div className="space-y-2">
    <div>
      <span className="medium-14">Items:</span>
      <div className="mt-1 space-y-2">
        {order.items.map((item, index) => (
          <div key={index}>
            <p className="text-secondary">{item.name} x {item.quantity}</p>
            {index < order.items.length - 1 && <hr className="my-1" />}
          </div>
        ))}
      </div>
    </div>

    <div>
      <p><span className="medium-14">Name: </span>{order.address.firstName + " " + order.address.lastName}</p>
      <p><span className="medium-14">Address: </span>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
      <p><span className="medium-14">Phone: </span>{order.address.phone}</p>
    </div>
  </div>

  
  <div className="space-y-1">
    <p><span className="medium-14">Total Items:</span> {order.items.length}</p>
    <p><span className="medium-14">Method:</span> {order.paymentMethod}</p>
    <p><span className="medium-14">Payment:</span> {order.payment ? "Paid" : "Pending"}</p>
    <p><span className="medium-14">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
    <p><span className="medium-14">Price:</span> {currency}{order.amount}</p>
  </div>

 
  <div className="hidden xl:flex items-center justify-center">
    <span className="text-sm font-semibold text-secondary  px-3 py-1 rounded-full">
      {order.status}
    </span>
  </div>

  
  <div className="flex items-center xl:items-start justify-start xl:justify-end">
    <select
      onChange={(e) => statusHandler(e, order._id)}
      value={order.status}
      className="p-2 ring-1 ring-slate-300 rounded bg-primary text-sm font-semibold max-w-[180px] w-full"
    >
      <option value="Order Placed">Order Placed</option>
      <option value="Packing">Packing</option>
      <option value="Shipped">Shipped</option>
      <option value="Out for Delivery">Out for Delivery</option>
      <option value="Delivered">Delivered</option>
    </select>
  </div>
</div>

        ))}
      </div>
    </section>
  )
}

export default Orders
