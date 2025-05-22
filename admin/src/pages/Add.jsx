import React from 'react'
import upload_icon from '../assets/upload_icon.png'
import {TbTrash} from 'react-icons/tb'
import {FaPlus} from 'react-icons/fa6'
import axios from 'axios'
import { backend_url } from '../App'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Add = ({token}) => {

const[image, setImage] = useState(null)
const[name, setName] = useState('')
const[description, setDescription] = useState('')
const[price, setPrice] = useState('')
const[category, setCategory] = useState('Fiction')
const[popular, setPopular] = useState(false)

const handleImage = (e) => {
  setImage(e.target.files[0])

}
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
     
   const formData = new FormData()
   formData.append('name', name)
   
   formData.append('category', category)
   
   formData.append('price', price)
   formData.append('description', description)
   formData.append('popular', popular)
   formData.append('image', image)
   const response= await axios.post(backend_url + "/api/product/create",formData, {headers : {token}})
    if(response.data.success){
      setName('')
      setDescription('')
      setPrice('')
      setCategory('Fiction')
      setImage(null)
      setPopular(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  } catch (error) {
    if(error.response && error.response.data && error.response.data.message){
            toast.error(error.response.data.message)
          }
          else{
            toast.error("Something went wrong")
          }
          console.log(error)
  }

}

  return (
    <div className='text-secondary px-2 sm:px-8 sm:pt-8 pt-4 pb-16 w-full h-[100vh]'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-3 medium-14 lg:w-[777px]'>
        <h2 className='text-2xl font-bold'>Add Product</h2>

        <div className='w-full'>
          <h5 className='h5'>Product Name</h5>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='write here...'  className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-full max-w-lg'/>
        </div>
        <div className='w-full'>
          <h5 className='h5'>Product Description</h5>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" rows={5} placeholder='write here...' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-full max-w-lg'/>
        </div>
        
        <div className='max-w-lg' >
          <h5 className='h5'>Category</h5>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='px-3 py-2 ring-1 ring-slate-900/10 rounded bg-white mt-1 sm:w-full' >
            <option value="Fiction">Fiction</option>
            <option value="Children">Children</option>
            <option value="Health">Health</option>
            <option value="Academic">Academic</option>
            <option value="Business">Business</option>
            <option value="Religious">Religious</option>

          </select>
        </div>
       
      
         <div className=' gap-x-2 pt-2 max-w-lg'>
          <h5 className='h5'>Image</h5>
          <label htmlFor="image" className='flex  gap-x-3'>
           <img src={image? URL.createObjectURL(image): upload_icon } className='w-14 h-10 aspect-square
            object-cover ring-1 ring-slate-900/10 rounded bg-white ' />
            <input type="file" id='image' accept='image/*' onChange={handleImage} className=''/>
          </label>
          </div>

        <div className=''>
          <h5 className='h5'>Price</h5>
          <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='Price' min={0} className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white w-20' />
        </div>
        <div className='flexStart gap-2 my-2'> 
          <input  type="checkbox"  id='popular' checked={popular} onChange={(e) => setPopular(e.target.checked)}/>
          <label htmlFor="popular" className='cursor-pointer h5'>Add to Popular</label>
        </div>
        <button type='submit' className='btn-secondaryOne mt-3 max-w-44 sm:w-full'>Add Product</button>
      </form>
    
    </div>
  )
}

export default Add
