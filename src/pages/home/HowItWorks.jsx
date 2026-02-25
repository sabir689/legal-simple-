import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const HowItWorks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // FIX: Prevents cascading render error by checking state before updating
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname, isOpen]);

  const steps = [
    {
      step: "01",
      title: "Create Contract",
      desc: "Draft a bulletproof agreement in seconds using our guided builder. Define your milestones and payout terms clearly.",
      icon: "✍️"
    },
    {
      step: "02",
      title: "Client Signs",
      desc: "Both parties sign digitally. The contract is hashed and stored securely, making it legally binding and tamper-proof.",
      icon: "🤝"
    },
    {
      step: "03",
      title: "Funds Locked",
      desc: "The client deposits payment into a secure Escrow-Lite vault. You get notified the moment the money is 'Green-Lit'.",
      icon: "🔒"
    },
    {
      step: "04",
      title: "Work Delivered",
      desc: "Submit your files or project milestones. The system tracks progress against the signed agreement automatically.",
      icon: "🚀"
    },
    {
      step: "05",
      title: "Money Released",
      desc: "Once milestones are marked complete, funds are released to your account instantly. No more chasing invoices.",
      icon: "💰"
    }
  ];

  return (
    <section id="works" className="bg-white dark:bg-black py-24 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <Motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#4f46e5] font-black uppercase tracking-[0.4em] text-[10px] block mb-4"
          >
            The Secure Workflow
          </Motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
            How it <span className="text-zinc-400 dark:text-zinc-700 italic">actually</span> works.
          </h2>
        </div>

        {/* Timeline Visual */}
        <div className="relative">
          {/* Vertical Progress Bar Background */}
          <div className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-zinc-100 dark:bg-zinc-900" />
          
          {/* Animated Progress Filler */}
          <Motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-[#4f46e5] z-10"
          />

          <div className="space-y-24">
            {steps.map((item, i) => (
              <Motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center`}
              >
                {/* Number Circle */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-20 w-12 h-12 rounded-full bg-white dark:bg-black border-2 border-[#4f46e5] flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                  <span className="text-sm font-black text-zinc-900 dark:text-white">{item.step}</span>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                  <div className="bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-sm border border-zinc-100 dark:border-white/5 hover:border-[#4f46e5]/50 transition-colors group">
                    <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">{item.icon}</span>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-3">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[45%]" />
              </Motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <Motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center"
        >
          <Link to="/get-started">
            <button className="bg-[#4f46e5] text-white px-10 py-4 text-xs font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-xl shadow-indigo-500/20">
              Setup Your First Contract
            </button>
          </Link>
        </Motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;