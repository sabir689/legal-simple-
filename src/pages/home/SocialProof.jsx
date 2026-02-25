import React from 'react';
import { motion as Motion } from 'framer-motion';
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const SocialProof = ({ feedbacks = [] }) => {
  // Default data if no feedbacks are passed from your CMS/API
  const defaultFeedbacks = [
    {
      quote: "LegallySimple saved me $4k when a client tried to disappear mid-project. The Escrow-Lite feature is a lifesaver.",
      author: "Sarah J.",
      role: "Brand Designer",
      avatar: "🎨"
    },
    {
      quote: "I used to spend hours drafting contracts. Now it takes 60 seconds and I know I'm protected. Best beta I've joined.",
      author: "Marcus T.",
      role: "Full-Stack Dev",
      avatar: "💻"
    },
    {
      quote: "I used to spend hours drafting contracts. Now it takes 60 seconds and I know I'm protected. Best beta I've joined.",
      author: "Marcus T.",
      role: "Full-Stack Dev",
      avatar: "💻"
    },
    {
      quote: "I used to spend hours drafting contracts. Now it takes 60 seconds and I know I'm protected. Best beta I've joined.",
      author: "Marcus T.",
      role: "Full-Stack Dev",
      avatar: "💻"
    },
    {
      quote: "The phase-based payments keep my cashflow steady. No more waiting 30 days for an invoice to be processed.",
      author: "Elena R.",
      role: "Copywriter",
      avatar: "✍️"
    }
  ];

  const displayData = feedbacks.length > 0 ? feedbacks : defaultFeedbacks;

  return (
    <section className="bg-zinc-50 dark:bg-black py-24 px-6 border-t border-zinc-100 dark:border-white/5 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Trust Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-zinc-900 dark:text-white text-3xl md:text-5xl font-black uppercase tracking-tighter"
          >
            Trusted by the <span className="text-[#4f46e5]">Top 1%</span>
          </Motion.h2>
          <p className="text-zinc-500 text-xs mt-4 uppercase font-bold tracking-[0.3em]">
            Real Feedback from Beta Users
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="pb-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonial-swiper"
          >
            {displayData.map((item, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="h-full bg-white dark:bg-zinc-900/50 p-10 border border-zinc-100 dark:border-white/5 rounded-sm flex flex-col justify-between group hover:border-[#4f46e5]/40 transition-all duration-500">
                  <div>
                    <div className="text-[#4f46e5] text-5xl font-serif mb-6 opacity-20 italic">“</div>
                    <p className="text-zinc-700 dark:text-zinc-300 font-medium text-lg leading-relaxed mb-8">
                      {item.quote}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 border-t border-zinc-100 dark:border-white/5 pt-6">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center rounded-full text-xl shadow-inner">
                      {item.avatar || "👤"}
                    </div>
                    <div>
                      <p className="text-zinc-900 dark:text-white font-black uppercase text-xs tracking-widest">
                        {item.author}
                      </p>
                      <p className="text-[#4f46e5] text-[10px] font-bold uppercase tracking-tighter">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Swiper Styles (Global or Tailwind) */}
        <style dangerouslySetInnerHTML={{ __html: `
          .testimonial-swiper .swiper-pagination-bullet {
            background: #4f46e5 !important;
          }
          .testimonial-swiper {
            padding-bottom: 50px !important;
          }
        `}} />

      </div>
    </section>
  );
};

export default SocialProof;