import React, { use } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar'
import { CgMenuLeft } from 'react-icons/cg'
import logo from '../assets/logo.png'
import { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { AnimatePresence, motion } from 'framer-motion'

import { TbUser, TbUserCircle } from 'react-icons/tb'
import { RiUserLine, RiShoppingBag4Line } from 'react-icons/ri'
import Shop from '../pages/Shop'


const Header = () => {

  const { navigate, token, setToken,getCartCount,setCartItems } = useContext(ShopContext)
  const [active, setActive] = useState(false)
  const [menuOpened, setmenuOpened] = useState(false)
  const [rightbarOpened, setRightbarOpened] = useState(false)

  const toggleMenu = () => {
    setmenuOpened(!menuOpened)

  }

  const handleLogout = () => {
    setToken("")
    localStorage.removeItem("token")
    setCartItems({})
    setRightbarOpened(false)
    // navigate("/login")
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        if (menuOpened) {
          setmenuOpened(false)
        }
      }

      setActive(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpened]);


  return (
    <motion.div 
    
    initial={{y:-50,opacity:0}}
    animate={{ y:0,opacity:1}}
  transition={{ duration: 0.6,delay:0.2 }}
  className='fixed top-0 w-full left-0 right-0 z-50'
    
  >
    
      <motion.div className={`${active ? "bg-white py-2.5" : "py-3"} max-padd-container flexBetween border-b border-slate-900/10 rounded tranistion-all duration-300`}>

        <Link to={"/"} className='flex-1 flex items-center justify-start '>
          <img src={logo} height={36} width={36} className='hidden sm:flex mr-2' />
          <h4 className='bold-24'>Bacala</h4>
        </Link>

        <AnimatePresence>
          {menuOpened && (
            <motion.div
              key="side-menu"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex-1 absolute left-0 top-0"
            >
              <Navbar
                toggleMenu={toggleMenu}
                menuOpened={menuOpened}
                containerStyles="flex flex-col gap-y-16 h-screen w-[222px] absolute left-0 top-0 bg-white z-50 px-10 py-4 shadow-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regular Navbar for large screens */}
        <div className="flex-1">
          <Navbar
            toggleMenu={toggleMenu}
            menuOpened={menuOpened}
            containerStyles="hidden xl:flex justify-center gap-x-8 xl:gap-x-14 medium-15 px-2 py-1"
          />
        </div>


        <div className='flex-1 flex items-center  justify-end gap-x-3 sm:gap-x-10'>
          <CgMenuLeft onClick={toggleMenu} className='text-2xl xl:hidden cursor-pointer' />
          <Link to={"/cart"} className='Flex relative'>
          <RiShoppingBag4Line className='text-[33px] bg-secondary text-primary p-1.5 rounded-full' />
            <span className='bg-primary ring-1 ring-slate-900/5 medium-14 absolute left-5 -top-2.5 flexCenter w-5 h-5 rounded-full shadow-md'>{getCartCount()}</span></Link>
          <div className='relative group'>
            <div  className=''>
              {token ? (
                <div><TbUserCircle onClick={()=>{setRightbarOpened(!rightbarOpened)}} className='text-[40px] cursor-pointer' /></div>

              ) :
                (
                  <button onClick={() => navigate("/login")} className='btn-outline flexCenter gap-x-2'>
                    Login<RiUserLine />
                  </button>
                )}
            </div>
            <AnimatePresence>
  {rightbarOpened && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-primary p-1 w-32 ring-1 ring-slate-900/5 rounded-xl absolute right-0 top-7 shadow-md flex flex-col z-50"
    >
      <ul className="flex flex-col regular-14">
        <li onClick={()=>{navigate('/orders')}} className="p-2 text-tertiary rounded-md hover:bg-white cursor-pointer">
          Orders
        </li>
        <li onClick={()=>{handleLogout()}} className="p-2 text-tertiary rounded-md hover:bg-white cursor-pointer">
          Logout
        </li>
      </ul>
    </motion.div>
  )}
</AnimatePresence>

          </div>
        </div>
      </motion.div>
    
    </motion.div>
  )
}

export default Header
