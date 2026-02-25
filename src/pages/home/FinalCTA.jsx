import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Background Decorative Element: Subtle Indigo Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4f46e5]/10 dark:bg-[#4f46e5]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Small Tagline */}
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-black text-zinc-500 dark:text-zinc-300 uppercase tracking-widest">
            Beta Access Open // 2026
          </span>
        </Motion.div>

        {/* Main Headline */}
        <Motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-8"
        >
          Protect your next <br />
          <span className="text-[#4f46e5] italic">project today.</span>
        </Motion.h2>

        {/* Subtext */}
        <Motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-zinc-500 dark:text-zinc-400 text-lg mb-12 max-w-xl mx-auto font-medium"
        >
          Stop chasing invoices and start working with total legal security. 
          Join 120+ freelancers who get paid on time, every time.
        </Motion.p>

        {/* Primary Action Button */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link to="/create-contract">
            <button className="group relative bg-[#4f46e5] text-white px-12 py-5 text-sm font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/40">
              <span className="relative z-10">Create Free Contract</span>
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </button>
          </Link>
          
          <Link to="/pricing" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors border-b border-transparent hover:border-zinc-900 dark:hover:border-white pb-1">
            View Pricing Tiers
          </Link>
        </Motion.div>

        {/* Trust Note */}
        <p className="mt-12 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.3em]">
          No credit card required for beta // encrypted by AES-256
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;