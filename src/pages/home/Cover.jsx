import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Cover = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2000",
      subtitle: "Secure Milestone Payments",
      title: "Contracts built for modern creators",
      description: "Automate your legal workflow and ensure every dollar is held in secure escrow until you deliver.",
      btnText: "Start Creating"
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
      subtitle: "Zero-Risk Freelancing",
      title: "The bridge between talent and trust",
      description: "Stop chasing invoices. Use our smart escrow system to guarantee payment before you start the clock.",
      btnText: "Explore Escrow"
    },
    {
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000",
      subtitle: "Legal Simplicity",
      title: "Airtight agreements in sixty seconds",
      description: "Professionally vetted templates tailored for designers, developers, and consultants.",
      btnText: "View Templates"
    }
  ];

  return (
    <div className="relative h-screen w-full bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              /* FIX: Added pt-20 to push content below the fixed header */
              <div className="relative h-full w-full flex items-center justify-center overflow-hidden pt-20 md:pt-32">
                
                <motion.div 
                  initial={{ scale: 1.1 }}
                  animate={isActive ? { scale: 1 } : { scale: 1.1 }}
                  transition={{ duration: 8, ease: "easeOut" }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
                </motion.div>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div 
                      initial={{ x: '-100vw', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: '100vw', opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        damping: 25, 
                        stiffness: 120,
                        duration: 1.2 
                      }}
                      /* Styling fix: Adjusted padding and background for better legibility */
                      className="relative z-10 w-[92%] max-w-4xl border-l-4 border-primary bg-black/60 backdrop-blur-xl p-8 md:p-16 text-center shadow-2xl"
                    >
                      
                      <motion.div
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
                      >
                        <div className="flex items-center justify-center gap-4 mb-4 text-primary tracking-[0.4em] font-bold text-[10px] md:text-xs uppercase">
                           <div className="h-[1px] w-6 bg-primary hidden md:block"></div>
                           {slide.subtitle}
                           <div className="h-[1px] w-6 bg-primary hidden md:block"></div>
                        </div>
                        
                        <h1 className="text-3xl md:text-6xl lg:text-7xl text-white font-black tracking-tighter leading-[1.1] mb-6">
                          {slide.title}
                        </h1>
                      </motion.div>

                      <motion.div
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
                      >
                        <p className="text-white/70 text-sm md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-medium">
                          "{slide.description}"
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <button className="btn btn-primary btn-lg rounded-none px-12 uppercase tracking-widest text-[10px] font-black">
                            {slide.btnText}
                          </button>
                          <button className="btn btn-outline text-white btn-lg rounded-none px-12 uppercase tracking-widest text-[10px] font-bold hover:bg-white hover:text-black">
                            Watch Demo
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Side Decorative Element - Lower Z-Index so it doesn't overlap header */}
      <div className="absolute bottom-12 right-12 z-10 hidden lg:block overflow-hidden">
         <motion.div 
           initial={{ y: 100 }}
           animate={{ y: 0 }}
           transition={{ delay: 2, duration: 1 }}
           className="flex items-center gap-4 rotate-90 origin-right translate-x-full"
         >
           <div className="h-[1px] w-16 bg-primary/50"></div>
           <p className="text-white/30 text-[9px] tracking-[0.8em] uppercase font-black">
             Legally Simple Protocol v.4.0
           </p>
         </motion.div>
      </div>
    </div>
  );
};

export default Cover;