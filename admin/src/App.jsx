import React from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { useState } from 'react'
import Login from './components/Login'
import { useEffect } from 'react'


export const backend_url = import.meta.env.VITE_BACKEND_URL
export const currency = "$"

const App = () => {

  const [token, setToken] = useState(localStorage.getItem("token")? localStorage.getItem("token") : "")

 useEffect(()=>{
  localStorage.setItem('token', token)
 },[token])


  return (
    <div className=' bg-primary min-h-screen'>
      
      <ToastContainer/>
      {token === "" ?
( <Login setToken={setToken}/>)   
  :(<div className='bg-primary text-white'>
        <div className='flex flex-col sm:flex-row  '>
          <Sidebar token={token} setToken={setToken} className=""/>
          <Routes>
            <Route path="/" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token}/>} />
            <Route path="/orders" element={<Orders token={token}/>} />
            
          </Routes>
        </div>
      </div>
      )}
    </div>
  )
}

export default App
