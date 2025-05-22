import React from 'react'
import { useState } from 'react'
import { backend_url } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')


  const handleSubmit =async (e) => {
    try {
       e.preventDefault()
       const response = await axios.post(backend_url + '/api/user/admin', {email,password})
        if(response.data.success){
          setToken(response.data.token)
          toast.success(response.data.message)
        }else{
          toast.error(response.data.message)
        }

    } catch (error) {
      if(error.response.data.message){
        toast.error(error.response.data.message)
      }
      else{
        toast.error("Something went wrong")
      }
      console.log(error)
      
    }
    
  }
  

  return (
    <div className='flex items-center justify-center h-screen bg-primary'>
     <div className={` p-10 flex flex-col justify-center bg-white rounded-2xl`}>
            <h2 className="text-2xl font-bold mb-6 text-secondary">Admin - Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mb-4 p-2 border rounded" />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mb-4 p-2 border rounded" />
            <button type='submit' className="bg-[#452372] text-white py-2 rounded-2xl hover:bg-purple-900 transition">Login</button>
            </form>
          </div>
          </div>
  )
}

export default Login
