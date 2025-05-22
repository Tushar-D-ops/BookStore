import React from 'react';
import { Book, Quote, Star, Bookmark, Coffee } from 'lucide-react';
import Title from './Title';
import bg_2 from '../assets/bg_2.png'; 
import th from '../assets/th.png';
import th2 from '../assets/th2.png';

const BookstoreVibes = () => {
  return (
    <section className="bg-cover bg-center bg-no-repeat z-0 relative  py-20 px-4 sm:px-10 overflow-hidden font-serif"
    
    style={{
      backgroundImage: "url('https://image.slidesdocs.com/responsive-images/background/pink-creativity-light-fashion-creative-powerpoint-background_f778d02989__960_540.jpg')",
    }}>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Floating Quote & Symbol Row */}
        <div className="flex justify-between items-center text-gray-700 text-sm uppercase tracking-widest">
          <span className="flex items-center gap-2"><Quote size={16} /> Literary Escapes</span>
          <span className="flex items-center gap-2"><Star size={16} /> Curated with Passion</span>
          <span className="flex items-center gap-2"><Bookmark size={16} /> Bookmarked Moments</span>
        </div>

        {/* Central Story + Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Story */}
          <div className="space-y-6 text-gray-800">
            
            <Title title1={'A BookStore'} title2={' Where Stories Breathe.'} titleStyles= {'pb-10'} paraStyles={"!block"}   />
            <p className="text-lg leading-relaxed text-[#4a3628]">
              Welcome to <strong>Bacala</strong>, a realm where every shelf tells a story, every page is a journey,
              and every corner smells like coffee and curiosity.
              From gripping thrillers and magical tales to mindful self-help, we house stories that stick.
            </p>
            <p className="text-base italic text-[#6b4f3b]">
              “Books are uniquely portable magic.” – Stephen King
            </p>
          </div>

          {/* Right: Visual Cluster */}
         <div className="relative h-[450px] sm:h-[500px] md:h-[600px]">
  {/* 📘 Left Book */}
  <img
    src={th}
    alt="Open Book"
    className="absolute top-16 left-2 w-28 sm:w-36 md:w-48 lg:w-56 rotate-[-10deg] drop-shadow-2xl z-10"
  />

  {/* 📚 Stack of Books - Top Right */}
  <img
    src={th2}
    alt="Stack"
    className="absolute top-24 right-4 w-24 sm:w-32 md:w-40 lg:w-48 rotate-6 drop-shadow-xl z-10"
  />

  {/* ☕ Coffee - Bottom Right */}
  <img
    src="https://static.vecteezy.com/system/resources/previews/023/575/435/original/an-organized-and-neat-stack-of-books-is-displayed-on-a-transparent-background-in-a-highly-realistic-design-generative-ai-png.png"
    alt="Coffee"
    className="absolute bottom-4 right-2 w-20 sm:w-24 md:w-28 lg:w-36 rotate-[15deg] opacity-95 drop-shadow-md z-10"
  />

  {/* 🌟 Main Center Image */}
  <img
    src={bg_2}
    alt="Main Center Image"
    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-52 md:w-64 lg:w-80 z-20 drop-shadow-2xl transition duration-300 hover:scale-105"
  />

  {/* 📝 Tagline */}
  <div className="absolute bottom-4 left-4 text-[#a16e50] text-xs sm:text-sm md:text-base font-serif">
    Curated Reads • Hidden Gems • Cozy Vibes
  </div>
</div>




        </div>

        {/* Footer Details Row */}
        <div className="flex justify-around text-[#7b5a45] text-sm mt-10 border-t pt-6 border-[#e4d5c6]">
          <span className="flex items-center gap-2"><Book size={16} /> 5000+ Titles</span>
          <span className="flex items-center gap-2"><Coffee size={16} /> Café Style Browsing</span>
          <span className="flex items-center gap-2"><Star size={16} /> Loved by 10K+ Readers</span>
          <span className="flex items-center gap-2"><Bookmark size={16} /> Personal Picks Weekly</span>
        </div>
      </div>
    </section>
  );
};

export default BookstoreVibes;
