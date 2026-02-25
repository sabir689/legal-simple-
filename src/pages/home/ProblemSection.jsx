import React from 'react';
import { motion as Motion } from 'framer-motion';

const ProblemSection = () => {
  const problems = [
    {
      title: "Scope Creep",
      desc: "“Just one more quick change” turns into three weeks of unpaid labor because there was no clear boundary.",
      icon: "🏗️",
      color: "from-orange-500/20 to-transparent"
    },
    {
      title: "Unpaid Invoices",
      desc: "You delivered the final files, but the client went ghost. Without a smart escrow, your hard work is a free gift.",
      icon: "💸",
      color: "from-red-500/20 to-transparent"
    },
    {
      title: "No Legal Protection",
      desc: "Handshake deals are great until they aren't. Without a signed contract, you have zero leverage in a dispute.",
      icon: "⚖️",
      color: "from-purple-500/20 to-transparent"
    }
  ];

  return (
    <section className="bg-black py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <Motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#4f46e5] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
          >
            The Harsh Reality
          </Motion.span>
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
          >
            Ever delivered work and <br />
            <span className="text-zinc-600 italic">never got paid?</span>
          </Motion.h2>
          <p className="mt-6 text-zinc-400 max-w-xl mx-auto font-medium text-sm md:text-base">
            Freelancing shouldn't be a gamble. Traditional contracts are too expensive, and "trust" doesn't pay the rent.
          </p>
        </div>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, i) => (
            <Motion.div
              key={prob.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 border border-white/5 bg-gradient-to-br ${prob.color} hover:border-white/20 transition-all group`}
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {prob.icon}
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">
                {prob.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                {prob.desc}
              </p>
              
              {/* Decorative accent */}
              <div className="absolute bottom-4 right-4 text-[10px] font-black text-white/5 uppercase tracking-widest">
                Critical Issue // 0{i + 1}
              </div>
            </Motion.div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <Motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">
              Stop losing money. Start working secured.
            </span>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;