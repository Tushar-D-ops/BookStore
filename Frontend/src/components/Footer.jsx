import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../assets/data'

import { ShopContext } from '../context/ShopContext'



const Footer = () => {

const {navigate}=useContext(ShopContext)
  return (
    <footer className='mb-4'>
      <div className='rounded-tr-3xl rounded-tl-3xl pt-12 xl:pt-20 pb-8'>
        <h3 className='h3'>Discover books that ignite your imagination</h3>
        <p>Explore timeless stories, hidden gems, and new adventures waiting to be opened.</p>
        <hr className='my-8 bg-slate-900/30 h-[2px]' />
        {/* container */}
        <div className='flex justify-between flex-wrap gap-2
                '>
          <div className='max-w-sm'>
            {/* logo */}
            <Link to={'/'} className='flex-1 flex items-center justify-start'>
              <img src={logo} alt="" height={36} width={36} className='hidden sm:flex mr-2' />
              <h4 className='bold-24'>Bacala</h4>
            </Link>
            <p className='py-4'>A cozy corner for every reader — from classic tales to modern marvels, find your next favorite book here.</p>
            <div className=''>
              
              <button onClick={()=>{navigate('/contact')}} className='btn-secondaryOne'>Feel Free To Contact Us !</button> 
             </div>
             
          </div>
          <div className='flex justify-between flex-wrap gap-8'>
            {FOOTER_LINKS.map((col) => (
              <FooterColumn key={col.title} title={col.title}>
                <ul className='flex flex-col gap-4 regular-14'>
                  {col.links.map((link) => (
                    <Link to='/' key={link}>{link}</Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}
            <div className='flex flex-col gap-5'>
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link to='/' key={link.label} className='flex gap-4 md:flex-col lg:flex-row text-black'>
                    <p>{link.label}:</p><p className='bold-15'>{link.value}</p>
                  </Link>
                ))}
              </FooterColumn>
            </div>
            <div className='flex '>
              <FooterColumn title={SOCIALS.title}>
                <ul className='flex gap-4'>
                  {SOCIALS.links.map((link) => (
                    <Link to='/' key={link.id} className='text-xl'>{link.icon}</Link>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
      </div>
      {/* copyrights */}
      <p className='text-white bg-tertiary medium-14 py-2 px-8 rounded flexBetween '><span>2025 Bacala</span><span>All rights reserved</span></p>
    </footer>
  )
}

export default Footer


const FooterColumn = ({ title, children }) => {
  return (
    <div className='flex flex-col gap-5'>
      <h4 className='bold-18 whitespace-nowrap'>{title}</h4>
      {children}
    </div>
  )
}