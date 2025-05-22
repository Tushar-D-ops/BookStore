import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import NewArrivals from '../components/NewArrivals'
import Hero from '../components/Hero'
import About from '../components/About'
import PopularBooks from '../components/PopularBooks'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BookstoreVibes from '../components/BookstoreVibes.jsx'

const Home = () => {
  const scrollRef = useRef(null)

  // Scroll progress based on the scrollable section
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  // Extended background transitions
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.7, 1],
    ['#b9b0b4', '#ffffff', '#fcb9bf', '#e1e0e0', '#ffffff', '#fff'] // popular section goes from gray to white
  )

  return (
    <>
    <Header/>

      {/* Background animation layer */}
      <motion.div
        style={{ backgroundColor }}
        className="fixed top-0 left-0 w-full h-screen z-0 transition-colors duration-500"
      />

      {/* Scrollable content section (tracked) */}
      <div className="relative z-10" ref={scrollRef}>
        <Hero />
        <NewArrivals />
        <BookstoreVibes />
        <About />
        <PopularBooks />
        <Features />
        <div className="max-padd-container bg-white">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Home
