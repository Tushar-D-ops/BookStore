import React from 'react'
import { Link } from 'react-router-dom'
import bg_2 from '../assets/bg_2.png'
import pencil from '../assets/pencil.png'
import { motion } from 'framer-motion'

const Hero = () => {
    const bg_4="https://image.slidesdocs.com/responsive-images/background/pink-creativity-light-fashion-creative-powerpoint-background_f778d02989__960_540.jpg"
  return (
    <section className="relative h-[100vh] w-full">
  {/* 🔻 Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent z-10"></div>

  {/* 🔻 Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
    style={{
      backgroundImage: "url('https://wallpaperaccess.com/full/2735062.jpg')",
    }}
  ></div>

  {/* 🔻 Content */}
  <div className="relative z-20 h-full flex items-center justify-end px-4 md:12 xl:px-24">
    <div className="text-white max-w-[600px] max-lg:max-w-[400px] flex flex-col gap-6 ">
      <motion.h1 
      initial={{y:50,opacity:0}}
      animate={{ y:0,opacity:1}}
      transition={{ duration: 0.6,delay:0.4 }}
      
      className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight">
        Discover{" "}
        <span className="inline-flex">
          <span className="inline-flex items-center justify-center p-5 h-16 w-16 bg-secondary text-white rounded-full -rotate-[31deg]">
            B
          </span>
          ooks
        </span>{" "}
        <img
          src={pencil}
          alt="pencil"
          height={49}
          width={49}
          className="inline-flex relative bottom-2"
        />{" "}
        That Inspire Your World
      </motion.h1>

      <motion.p 
      initial={{y:50,opacity:0}}
      animate={{ y:0,opacity:1}}
      transition={{ duration: 0.6,delay:0.6 }}
      
      
      className="text-lg text-white/70 ">
        Explore a world of stories, knowledge, and inspiration. Discover books
        that ignite your imagination, broaden your perspective, and enrich your
        journey. From timeless classics to modern masterpieces, find the perfect
        read for every moment.
      </motion.p>

      <motion.div 
      initial={{y:50,opacity:0}}
      animate={{ y:0,opacity:1}}
      transition={{ duration: 0.6,delay:0.6 }}
      
      className=''>
        <Link to={"/shop"} className="btn-secondaryOne">
         <span className='relative z-10'>Explore Now</span>
        </Link>
      </motion.div>
    </div>
  </div>
</section>


  )
}

export default Hero

{/* <div className='flex flex-1 relative z-10 top-12'>
                <div>
                    <img className='bg-transparent rounded-3xl' src={bg_2} alt=""  height={588} width={588}/>
                </div>
            </div> */}