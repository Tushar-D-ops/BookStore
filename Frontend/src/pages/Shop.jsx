import React, { useEffect, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { categories } from '../assets/data'
import Title from '../components/Title'
import {LuSettings2} from 'react-icons/lu'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'
import Item from '../components/Item'
import Footer from '../components/Footer'
import Header from '../components/Header'
import {motion} from 'framer-motion'

const Shop = () => {


const {books} = useContext(ShopContext);
const [category,setCategory] = useState([]);
const [sortType,setSortType] = useState('relevant');
const [filteredBooks,setFilteredBooks] = useState([]);
const [search,setSearch] = useState('');
const [currentPage,setCurrentPage] = useState(1);

const itemsPerPage = 10;


const toggleFilter=(value,setState)=>{
  setState((prev) => prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]);
}

const applyFilters = () => {
  let filtered = [...books];

  if (category.length) {
    filtered = filtered.filter((book) => category.includes(book.category));
  }

  if (search) {
    filtered = filtered.filter((book) => book.name.toLowerCase().includes(search.toLowerCase()));
  }

  return filtered
 
}

const applySorting=(booksList)=>{
  if (sortType === 'Low') {
    return booksList.sort((a, b) => a.price - b.price);
  } else if (sortType === 'High') {
    return booksList.sort((a, b) => b.price - a.price);
  } else {
    return booksList;
  }
}

useEffect(() => {

 let filtered = applyFilters();
 let sorted = applySorting(filtered);
 setFilteredBooks(sorted);
 setCurrentPage(1); // Reset to first page when filters change

},[category,search,sortType,books])

const getPaginatedBooks = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

   return filteredBooks.slice(startIndex, endIndex);
}

const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  return (
    
    <section className='max-padd-container bg-white'>
      <Header/>
      <div className='pt-28'>
        <div className='w-full flexCenter'>
          <motion.div
          
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5,delay: 0.2 }}
          
          className='inline-flex items-center justify-center bg-primary overflow-hiddenw-full rounded-full p-4 px-5'>
            <div className='text-lg cursor-pointer'><RiSearch2Line/></div>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text"  placeholder='Search Here...' 
             className='border-none outline-none w-full text-sm pl-4 bg-primary'/>
            <div className='flexCenter cursor-pointer text-lg border-1 pl-2'><LuSettings2/></div>          
          </motion.div>
        </div>

        <div className='mt-12 mb-16'>

          <motion.h4 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5,delay: 0.3 }}
          className='h4 mb-4 hidden sm:flex'>Categories:</motion.h4>
          <div className='flexCenter sm:flexStart flex-wrap gap-x-12 gap-7-4'>

            {categories.map((cat,i)=>(
              
               
            <motion.label 
            initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5,delay:i*0.2 }}
            
            key={cat.name}>
              <input value={cat.name} onChange={(e)=>toggleFilter(e.target.value,setCategory)} type="checkbox" className='hidden peer' />
              <div className='flexCenter flex-col gap-2 peer-checked:text-orange-500 cursor-pointer'>
                <div className='bg-primary h-20 w-20 flexCenter rounded-full'>
                    <img src={cat.image} alt="" className='object-cover h-10 w-10' />
                </div>
                <span>{cat.name}</span>

              </div>
            </motion.label>
            ))}
          </div>
        </div>
        <div className='mt-8'>
          <div className='flexBetween !items-start gap-7 flex-wrap pb-17 max-sm:flexCenter text-center'>
            <motion.div 
            initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5,delay: 1 }}
            
            >
            <Title
        title1={"Our "}
        title2={"BookList"}
        titleSyles={"pb-0 text-start"}
        paraStyles={"!block"}
      />
      </motion.div>
      <motion.div
      initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5,delay: 1.4 }}
      
      className='flexCenter gap-x-2'>
        <span className='hidden sm:flex medium medium-16'>Sort By:</span>
        <select onChange={(e)=>setSortType(e.target.value)} className='text-sm p-2.5 outline-none bg-primary text-gray-30 rounded'>
          <option value="relevant">relevant</option>
          <option value="Low">Low</option>
          <option value="High">High</option>
        </select>
      </motion.div>
          </div>
          <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5,delay: 1.6 }}
          className={getPaginatedBooks().length>0 ? `mt-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12`:"max-padd-container py-20 h-[50vh] text-center"}>
            {getPaginatedBooks().length>0 ?
            (
             getPaginatedBooks().map((book) => (
              <Item book={book} key={book._id}/> 
              
            ))
          ):(
            <p className=' text-3xl'>No Books Found For Selected Filters</p>
          )}
          </motion.div>
        </div>
        <div className='flexCenter mt-14 mb-10 gap-4'>
          <button disabled={currentPage===1} onClick={()=>setCurrentPage((prev)=>prev-1)} className={`btn-secondary !py-1 !px-3 ${currentPage===1 && "opacity-50 cursor-not-allowed"}`}>Previous</button>
          {Array.from({length:totalPages},(_,index)=>(
            <button key={index + 1} onClick={()=>setCurrentPage(index + 1)} className={`btn-light !py-1 !px-3 ${currentPage === index + 1 && "!bg-orange-500"}`}>
              {index + 1}
            </button>
          ))}
                    <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage((prev)=>prev+1)} className={`btn-secondary !py-1 !px-3 ${currentPage===totalPages && "opacity-50 cursor-not-allowed"}`}>Next</button>

        </div>
      </div>
      <Footer/>
    </section>
  )
}

export default Shop
