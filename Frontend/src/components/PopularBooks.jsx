import React, { useContext, useEffect, useRef, useState } from 'react';
import Title from './Title';
import Item from './Item';
import { FaArrowRight,FaArrowLeft } from "react-icons/fa";
import { ShopContext } from '../context/ShopContext';

const PopularBooks = () => {
  const { books } = useContext(ShopContext);
  const [popularBooks, setPopularBooks] = useState([]);
  const scrollRef = useRef();

  // Convert vertical scroll to horizontal
  useEffect(() => {
    const container = scrollRef.current;

    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY*3, // Scroll horizontally with vertical movement
          behavior: 'smooth',
        });
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });

    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const data = books.filter((book) => book.popular === true);
    setPopularBooks(data.slice(0, 10)); // show 10 books
  }, [books]);

  return (
    <section className="max-padd-container py-16 xl:py-24">
      <Title
        title1="Popular "
        title2="Books"
        titleSyles="pb-10"
        paraStyles="!block"
      />
      <div className='h5 text-xl flexCenter gap-2 items-center'> <FaArrowLeft />Slide<FaArrowRight /> </div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar px-2 cursor-pointer"
      >
        {popularBooks.map((book) => (
          <div key={book.id} className="min-w-[250px] p-4 ">
            <Item book={book} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularBooks;
