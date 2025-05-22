import React from 'react'
import { use } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { backend_url } from '../App'
import axios from 'axios'
import { TbTrash } from 'react-icons/tb'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const currency = "$"

const [books, setBooks] = useState([])


const fetchList = async () => {
 
  try{
    const response = await axios.get(`${backend_url}/api/product/getAll`)
    if(response.data.success){
      setBooks(response.data.products)
    }
    else{
      toast.error(response.data.message)
    }
    
    
  }catch(error){
    if(error.response?.data?.message){
      toast.error(error.response.data.message)
    }
    else{
      toast.error("Something went wrong")
    }
    console.log(error)
  }

}

const HandleRemove = async (id) => {
  try{
    const response = await axios.delete(`${backend_url}/api/product/delete/${id}`,{headers : {token}})
    if(response.data.success){
      toast.success(response.data.message)
      await fetchList()
    }
    else{
      toast.error(response.data.message)
    }
  }
  
  catch(error){
    if(error.response?.data?.message){
      toast.error(error.response.data.message)
    }
    else{
      toast.error("Something went wrong")
    }
    console.log(error)
  }
}


useEffect(() => {
  fetchList()
}, [])



  return (
    <div className="text-secondary px-2 sm:px-8 mt-4 sm:mt-14">
  <h2 className="text-2xl font-bold mb-6 text-secondary mx-4">Books List</h2>
  <div className="flex flex-col gap-2 mb-6">
    
    {/* Header */}
    <div className="max-sm:flex max-sm:mx-4 max-sm:text-sm max-sm:gap-2 grid grid-cols-5 items-center justify-around gap-4 bg-white py-3 px-2 mb-1 rounded-xl font-bold text-lg">
      <h5>Image</h5>
      <h5>Name</h5>
      <h5>Category</h5>
      <h5>Price</h5>
      <h5>Remove</h5>
    </div>

    {/* Each Book */}
    {books.map((item) => (
      <div
        key={item._id}
        className="max-sm:flex  max-sm:gap-2 max-sm:mx-4 max-sm:text-sm grid grid-cols-5 items-center justify-around gap-4 bg-white rounded-xl py-3 px-2 mb-1 shadow-md shadow-slate-500 p-4"
      >
        {/* Row for mobile label display */}
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 rounded-lg"
          />
          
  

        <h5 className="sm:pt-4 font-semibold sm:block">{item.name}</h5>
        <h5 className="pt-1 sm:pt-4 font-semibold">{item.category}</h5>
        <h5 className="text-orange-500 pt-1 sm:pt-4 font-semibold">
          {currency}
          {item.price}
        </h5>
        <button
          className="text-red-500 font-semibold"
          onClick={() => HandleRemove(item._id)}
        >
          <TbTrash />
        </button>
      </div>
    ))}
  </div>
</div>

  )
}

export default List
