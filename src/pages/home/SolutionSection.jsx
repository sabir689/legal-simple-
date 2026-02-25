import React from 'react';
import { motion as Motion } from 'framer-motion';

const SolutionSection = () => {
  const features = [
    {
      title: "Smart Contract Builder",
      desc: "Generate bulletproof, jurisdiction-aware contracts in under 60 seconds. No law degree required.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      title: "Escrow-Lite Protection",
      desc: "Funds are verified and held in a secure 'holding tank' before you start. You work knowing the money is already there.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.119c-.035.505-.054 1.015-.054 1.531 0 5.271 3.562 9.756 8.448 11.128 4.886-1.372 8.448-5.857 8.448-11.128 0-.516-.019-1.026-.054-1.531a11.959 11.959 0 01-7.848-4.647z" />
        </svg>
      ),
    },
    {
      title: "Phase-Based Tracking",
      desc: "Break projects into milestones. Payment is released automatically as you hit each goal, keeping cashflow steady.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
        </svg>
      ),
    }
  ];

  return (
    <section className="bg-zinc-950 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <Motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#4f46e5] font-black uppercase tracking-[0.4em] text-[10px] mb-4"
            >
              The Solution
            </Motion.p>
            <Motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter"
            >
              Everything you need to <br />
              <span className="text-primary italic">work with confidence.</span>
            </Motion.h2>
          </div>
          <div className="hidden md:block">
             <div className="h-[1px] w-24 bg-zinc-800 mb-4"></div>
             <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Version 4.0 // 2026</p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5">
          {features.map((item, i) => (
            <Motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-950 p-10 hover:bg-zinc-900/50 transition-colors group"
            >
              <div className="w-14 h-14 bg-[#4f46e5]/10 flex items-center justify-center text-[#4f46e5] mb-8 group-hover:bg-[#4f46e5] group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {item.desc}
              </p>
              
              <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-[1px] w-4 bg-[#4f46e5]"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Learn Tech</span>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;