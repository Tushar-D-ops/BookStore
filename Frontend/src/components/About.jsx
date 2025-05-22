import React from 'react'
import { TbTruckReturn } from 'react-icons/tb'
import { MdOutlinePayment } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import Title from './Title'
import about from '../assets/book_1.png'

const About = () => {
  return (
    <section className='max-padd-container px-auto py-12 xl:py-24 bg-primary'>
      <div className='flexCenter flex-col gap-16 xl:gap-8 xl:flex-row'>
        <div className='flex-1'>
          <Title title1={"Unveiling Our "} title2={"Store's Key Features"} titleSyles={'pb-10'} paraStyles={"!block"}  />
          <div className='flex flex-col items-start gap-y-4 mt-4' >
            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
                <MdOutlinePayment className='text-2xl'/>
              </div>
              <div>
                <h4 className='medium-18'>Secure Payment Options</h4>
                <p>We offer encrypted, trusted payment gateways ensuring your transactions are safe, private, and fully protected at every step.</p>
              </div>
            </div>
            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
                <TbTruckReturn className='text-2xl'/>
              </div>
              <div>
                <h4 className='medium-18'>Easy Return Process</h4>
                <p>Not satisfied? Our simple, hassle-free return policy lets you initiate returns easily within the return period, no questions asked.</p>
              </div>
            </div>
            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
                <IoCallOutline className='text-2xl'/>
              </div>
              <div>
                <h4 className='medium-18'>Live Customer Support</h4>
                <p>Need help? Our friendly customer support team is available 24/7 via chat, email, or call to assist you instantly.</p>
              </div>
            </div>
            
          </div>
        </div>

        <div className='flex-1 flexCenter ' >
          <div className=' flexCenter  max-h-[33rem] max-w-[33rem] rounded-3xl'>
            <img src="https://blog.shift4shop.com/hubfs/iStock-1413684635.jpg" alt=""   className='p-0 shadow-2xl shadow-slate-900/50 rounded-lg'/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
