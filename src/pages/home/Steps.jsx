import React from 'react';
import { motion } from 'framer-motion';
console.log(!!motion);

const Steps = () => {
  const steps = [
    {
      number: "01",
      title: "Draft the Agreement",
      desc: "Use our simple builder to define milestones, deadlines, and payment terms in minutes.",
      icon: "🖋️",
      color: "from-emerald-400 to-cyan-400",
      shadow: "shadow-emerald-500/20"
    },
    {
      number: "02",
      title: "Client Funds Escrow",
      desc: "Work begins only after the client deposits the total project fee into our secure vault.",
      icon: "🛡️",
      color: "from-orange-400 to-yellow-400",
      shadow: "shadow-orange-500/20"
    },
    {
      number: "03",
      title: "Deliver & Get Paid",
      desc: "Submit work, get approval, and funds are released instantly to your wallet. No chasing.",
      icon: "💰",
      color: "from-pink-500 to-purple-500",
      shadow: "shadow-pink-500/20"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Animation */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            className="text-primary font-bold text-xs uppercase block mb-4"
          >
            THE PROTOCOL
          </motion.span>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter"
          >
            How LegallySimple <span className="italic text-primary">Works</span>
          </motion.h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* The Glowing Gradient Border Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${step.color} rounded-2xl opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 blur`}></div>
              
              {/* Card Content */}
              <div className="relative h-full bg-[#161616] rounded-2xl p-10 flex flex-col items-start border border-white/5 shadow-2xl">
                
                <div className="flex justify-between w-full items-start mb-8">
                  <span className="text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                    {step.number}
                  </span>
                  <div className="text-4xl p-3 bg-white/5 rounded-xl border border-white/10 grayscale group-hover:grayscale-0 transition-all">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed italic font-medium">
                  {step.desc}
                </p>

                {/* Bottom Decorative Line */}
                <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 mt-8 bg-gradient-to-r ${step.color}`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;