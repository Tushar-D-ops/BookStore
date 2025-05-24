import React, { useContext, useState } from 'react'
import { motion,AnimatePresence } from 'framer-motion'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const[username,setUserName] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

  const {token,setToken,navigate,backend_url} = useContext(ShopContext)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  


  const handleSubmit = async(e) => {
    e.preventDefault()

    if(isLogin){


      try {
        const response =await axios.post(backend_url + "/api/user/signin",{email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
          navigate('/')
          toast.success(response.data.message)
        }
        else{
          console.log(response.data.message)
          toast.error(response.data.message)
        }
      
    } catch (error) {
      if(error.response?.data?.message){
        toast.error(error.response.data.message)
      }
      
    }

    }
    else{


      try {
        const response = await axios.post(backend_url + "/api/user/signup",{username,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
          navigate('/')
          toast.success(response.data.message)
        }
        else{
          console.log(response.data.message)
          toast.error(response.data.message)
        }
      
    } catch (error) {
      if(error.response?.data?.message){
        toast.error(error.response.data.message)
      }

    }
    
  }
}

  return (
    <motion.div 
    initial={{y:50,opacity:0}}
    animate={{ y:0,opacity:1}}
    transition={{ duration: 0.5,delay:0.2 }}
    
    className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      {isMobile? 
      (

      <div className="min-h-screen w-full flex flex-col items-center gap-3 justify-center bg-gray-100 p-4">
        <AnimatePresence mode="wait">
  {isLogin ? (
    <motion.div
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative z-10 text-center p-6 flex flex-col justify-center items-center gap-4 bg-secondary w-full rounded-xl max-w-md"
    >
      <div className="relative">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4086/4086679.png"
          alt="Welcome Icon"
          className="w-16 h-16 mx-auto animate-bounce opacity-90 z-10 relative"
        />
        <div className="absolute top-1 left-1 w-16 h-16 bg-white/10 rounded-full blur-2xl z-0" />
      </div>

      <h2 className="text-4xl font-extrabold tracking-wider text-white drop-shadow-md max-sm:text-2xl">
        Welcome Back!
      </h2>

      <blockquote className="italic text-sm text-white/80 mt-4 border-l-4 border-white/30 pl-3 max-w-xs mx-auto">
        “Books are a uniquely portable magic.”
      </blockquote>

      <div className="relative w-24 h-[2px] bg-white/30 mt-4 mb-2 rounded-full overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-white/70 blur-sm w-1/3" />
      </div>
    </motion.div>
  ) : (
    <motion.div
      key="signup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative z-10 text-center p-6 flex flex-col justify-center items-center gap-4 bg-secondary w-full rounded-xl max-w-md"
    >
      <div className="relative">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4086/4086679.png"
          alt="Welcome Icon"
          className="w-16 h-16 mx-auto animate-bounce opacity-90 z-10 relative"
        />
        <div className="absolute top-1 left-1 w-16 h-16 bg-white/10 rounded-full blur-2xl z-0" />
      </div>

      <h2 className="text-4xl font-extrabold tracking-wider text-white drop-shadow-md max-sm:text-2xl">
        Hello, Friend!
      </h2>

      <blockquote className="italic text-sm text-white/80 mt-4 border-l-4 border-white/30 pl-3 max-w-xs mx-auto">
        “A reader lives a thousand lives before he dies.”
      </blockquote>

      <div className="relative w-24 h-[2px] bg-white/30 mt-4 mb-2 rounded-full overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-white/70 blur-sm w-1/3" />
      </div>
    </motion.div>
  )}
</AnimatePresence>

        
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-2xl font-bold text-center">Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded"
              />
              <button
                onClick={handleSubmit}
                className="bg-[#452372] text-white py-2 rounded hover:bg-purple-900 transition"
              >
                Login
              </button>
              <p className="text-center text-sm text-gray-600">
                New here?{' '}
                <span
                  className="text-secondary font-semibold cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </span>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-2xl font-bold text-center">Sign Up</h2>
              <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded"
              />
              <button
                onClick={handleSubmit}
                className="bg-[#452372] text-white py-2 rounded hover:bg-purple-900 transition"
              >
                Sign Up
              </button>
              <p className="text-center text-sm text-gray-600">
                Already a user?{' '}
                <span
                  className="text-secondary font-semibold cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
)
    :(

<div className="relative w-full max-w-4xl h-70vh  bg-white overflow-hidden rounded-xl shadow-xl shadow-slate-500 flex">

        
        <div className="w-full flex transition-transform duration-700 ease-in-out" >
          
          <div className={`w-1/2 p-10 flex flex-col justify-center bg-white transition-opacity duration-700 ease-in-out
  ${isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5 pointer-events-none'}`}>
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mb-4 p-2 border rounded" />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mb-4 p-2 border rounded" />
            <button type='submit' onClick={(e)=>{handleSubmit(e)}} className="bg-[#452372] text-white py-2 rounded hover:bg-purple-900 transition">Login</button>
            <p className="mt-4 text-sm text-gray-600">
              New user?{' '}
              <span className="text-[#452372] font-semibold cursor-pointer" onClick={() => setIsLogin(false)}>
                Sign up
              </span>
            </p>
          </div>

          
          <div className={`w-1/2 p-10 flex flex-col justify-center bg-white transition-opacity duration-700 ease-in-out
  ${!isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5 pointer-events-none'}`}>
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <input type="text" placeholder="Name" value={username} onChange={(e)=>setUserName(e.target.value)} className="mb-4 p-2 border rounded" />
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mb-4 p-2 border rounded" />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mb-4 p-2 border rounded" />
            <button type='submit' onClick={(e)=>{handleSubmit(e)}} className="bg-[#452372] text-white py-2 rounded hover:bg-purple-900 transition">Sign Up</button>
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{' '}
              <span className="text-[#452372] font-semibold cursor-pointer" onClick={() => setIsLogin(true)}>
                Login
              </span>
            </p>
          </div>
        </div>

        
<div
  className={`absolute top-0 left-0 w-1/2 h-full bg-[#452372] text-white px-8 py-12 flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out rounded-xl overflow-hidden
    ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}
>
  
  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-[#452372]/80 opacity-30 mix-blend-screen pointer-events-none z-0 blur-xl" />

  
  <div className="relative z-10 text-center px-6 py-10 h-full w-full flex flex-col justify-center items-center gap-4">

  
  <div className="relative">
    <img
      src="https://cdn-icons-png.flaticon.com/512/4086/4086679.png"
      alt="Welcome Icon"
      className="w-16 h-16 mx-auto animate-bounce opacity-90 z-10 relative"
    />

    
    <div className="absolute top-1 left-1 w-16 h-16 bg-white/10 rounded-full blur-2xl z-0" />
  </div>

  
  <h2 className="text-4xl font-extrabold tracking-wider text-white drop-shadow-md max-sm:text-2xl">
    {isLogin ? 'Welcome Back!' : 'Hello, Friend!'}
  </h2>

  
  <p className="text-base max-sm:hidden max-w-sm text-gray-200 leading-relaxed opacity-90">
    {isLogin
      ? 'We missed you! Sign in and continue exploring amazing reads, exclusive discounts & personal recommendations.'
      : 'Enter your details to begin your adventure. Discover new stories, save favorites, and more.'}
  </p>

  
  <blockquote className="italic text-sm text-white/80 mt-4 border-l-4 border-white/30 pl-3 max-w-xs mx-auto">
    {isLogin
      ? '“Books are a uniquely portable magic.”'
      : '“A reader lives a thousand lives before he dies.”'}
  </blockquote>

  
  <div className="relative w-24 h-[2px] bg-white/30 mt-4 mb-2 rounded-full overflow-hidden">
    <div className="absolute inset-0 animate-pulse bg-white/70 blur-sm w-1/3" />
  </div>

  
</div>

  
  <div className="absolute w-44 h-44 bg-white/10 rounded-full top-[-30px] left-[-30px] blur-3xl z-0" />
  <div className="absolute w-32 h-32 bg-white/10 rounded-full bottom-[-20px] right-[-20px] blur-2xl z-0" />
</div>

      </div>

    )
      
    }
      
    </motion.div>
  )
}

export default Login
