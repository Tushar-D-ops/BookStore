import React from 'react'
import { FaSquarePlus } from 'react-icons/fa6'
import { FaListAlt } from 'react-icons/fa'
import { MdFactCheck } from 'react-icons/md'
import { BiLogOut } from 'react-icons/bi'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../index.css'
import { toast } from 'react-toastify'

const Sidebar = () => {

const HandleLogout=()=>{
  localStorage.removeItem('token')
  
  toast.success("Logout Successfully")
  setTimeout(() => {
    window.location.href = '/'
  }, 1000);
}




  return (
    <div className="bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden sm:flex flex-col h-screen items-start pt-10 pl-6 pr-4 gap-y-10">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-secondary">
          <img src={logo} alt="logo" width={28} height={28} />
          <span>Bacala</span>
        </Link>

        <nav className="flex flex-col gap-y-6 w-full">
          <NavItem to="/" label="Add" icon={<FaSquarePlus />} />
          <NavItem to="/list" label="List" icon={<FaListAlt />} />
          <NavItem to="/orders" label="Orders" icon={<MdFactCheck />} />
          <button onClick={()=>{HandleLogout()}} className="flex items-center gap-2 text-red-600 hover:text-red-800 px-4 py-2 rounded-xl transition">
            <BiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="sm:hidden bg-white border-gray-200 flex justify-around items-center py-2">
        <NavIcon to="/" icon={<FaSquarePlus />} />
        <NavIcon to="/list" icon={<FaListAlt />} />
        <NavIcon to="/orders" icon={<MdFactCheck />} />
        <button >
          <BiLogOut onClick={()=>{HandleLogout()}} className="text-xl text-red-600" />
        </button>
      </div>
    </div>
  )
}

// Reusable desktop nav item
const NavItem = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? 'bg-gray-100 text-blue-600 flex items-center gap-3 px-4 py-2 rounded-xl'
        : 'flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-xl transition'
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
)

// Reusable mobile nav icon
const NavIcon = ({ to, icon }) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <div className={`text-xl ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
        {icon}
      </div>
    )}
  </NavLink>
)

export default Sidebar
