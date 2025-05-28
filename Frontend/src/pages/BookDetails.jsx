import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Item from '../components/Item';

import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Autoplay, Pagination,Navigation} from 'swiper/modules';

function BookDetails() {
    const { books,addToCart } = useContext(ShopContext);
  const { id } = useParams();
  const book = books.find(book => book._id === id);


  if (!book) return <p className="text-center text-red-600 mt-10">Book not found</p>;

  return (
    
    <div className='max-padd-container bg-white '>
    <Header/>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col sm:p-8 p-2 justify-center"
    >
      <div className="sm:py-12 px-3 mt-12 rounded-3xl sm:px-12 bg-gradient-to-tr from-secondary via-pink-50 to-secondaryOne min-h-screen flex justify-center items-start">
  <div className="mt-6 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-purple-200">

    {/* LEFT: Book Image and Extra Badges */}
    <div className="space-y-6 relative">
      <img
        src={book.image}
        alt={book.name}
        className="object-cover rounded-2xl shadow-2xl shadow-purple-300"
      />

      {/* Multiple badges and tags stacked */}
      <div className="flex flex-wrap gap-2 mt-4">
        {book.popular && (
          <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            🔥 Popular Pick
          </span>
        )}
        
      </div>

      {/* Mini stats or info cards */}
      

      {/* Small quote / testimonial */}
      <blockquote className="mt-6 italic text-sm text-gray-600 border-l-4 border-purple-300 pl-4">
        “One of the most compelling books I've read this year.” – <span className="font-semibold">Emily R.</span>
      </blockquote>
    </div>

    {/* RIGHT: Book Details - Dense info + buttons */}
    <div className="flex flex-col space-y-4 text-[#452372]">
      <h1 className="lg:text-5xl text-2xl md:text-3xl font-extrabold leading-tight">{book.name}</h1>
      <p className="text-sm text-gray-600 italic mb-1">
        By <span className="font-semibold text-[#452372]">Dr. Jane Smith</span>
      </p>

      <p className="text-gray-700 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100 pr-2">
        {book.description}
      </p>

      <div className="grid grid-cols-3 gap-4 text-sm mt-4">
        <p><strong>Price:</strong> <span className="text-lg font-semibold text-[#452372]">${book.price}</span></p>
        <p><strong>Published:</strong> {new Date(book.date).toDateString()}</p>
        <p><strong>Language:</strong> English</p>
        <p><strong>ISBN:</strong> 978-3-16-148410-0</p>
        <p><strong>Format:</strong> Hardcover</p>
        <p><strong>Availability:</strong> <span className="text-green-600 font-semibold">In Stock</span></p>
      </div>

      {/* Categories and tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="bg-[#452372] text-white text-xs px-3 py-1 rounded-full shadow-md">{book.category}</span>
        
      </div>

      <button
        onClick={() => addToCart(book._id)}
        className="btn-secondaryOne transition-all hover:scale-105 hover:shadow-lg mt-4"
      >
        🛒 Add to Cart
      </button>

      {/* Divider */}
      <hr className="border-[#ffbcb1]/60 my-6" />

      {/* Reviews Preview with avatars */}
      <div>
        <h2 className="text-xl font-semibold mb-3">What Readers Say:</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center font-bold text-white">A</div>
            <p>📖 “Incredibly helpful and easy to understand!” — <span className="italic text-gray-500">Aarav</span></p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center font-bold text-white">M</div>
            <p>📖 “Changed the way I eat and think about health.” — <span className="italic text-gray-500">Mira</span></p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center font-bold text-white">J</div>
            <p>📖 “A must-read for anyone serious about wellness.” — <span className="italic text-gray-500">John</span></p>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

      <div className="mt-6 bg-white rounded-2xl p-6">
            <h2 className="sm:text-3xl text-xl font-semibold mb-3">You May Also Like:</h2>
            <div className="flex gap-5 py-16">
              <Swiper
  autoplay={{
    delay: 3500,
    disableOnInteraction: false,
  }}
  pagination={{ clickable: true }}
  navigation={true} // ✅ Enable arrows
  breakpoints={{
    400: { slidesPerView: 2, spaceBetween: 30 },
    700: { slidesPerView: 3, spaceBetween: 30 },
    1024: { slidesPerView: 4, spaceBetween: 30 },
    1200: { slidesPerView: 5, spaceBetween: 30 },
  }}
  modules={[Autoplay, Pagination, Navigation]} // ✅ Add Navigation module here
  className="h-[455px] sm:h-[488px] xl:h-[499px] mt-5"
>
  {[...books].sort(() => 0.5 - Math.random()).slice(0, 5).map(similar => (
    <SwiperSlide key={similar._id}>
                <Link to={`/book/${similar._id}`}  className=" p-4">
                  <Item book={similar} />
                </Link>
                </SwiperSlide>
              ))}
</Swiper>
            </div>
          </div>
          
    </motion.div>
    <Footer/>
    </div>
    
  );
}

export default BookDetails;
