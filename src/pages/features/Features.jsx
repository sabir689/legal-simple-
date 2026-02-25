import React from 'react';
import { motion as Motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      title: "Smart Contract Builder",
      desc: "Our guided builder turns complex legal jargon into plain English. Just fill in your project details, and we generate a bulletproof contract tailored to your local jurisdiction.",
      icon: "🏗️",
      visual: "bg-indigo-500/10 border-indigo-500/20",
      tag: "CORE"
    },
    {
      title: "Phase-Based Payments",
      desc: "Break projects into manageable milestones. Funds are released automatically as you hit specific goals, ensuring you're never working for free on long-term projects.",
      icon: "📈",
      visual: "bg-emerald-500/10 border-emerald-500/20",
      tag: "CASHFLOW"
    },
    {
      title: "Escrow-Lite Protection",
      desc: "We don't hold the money indefinitely—we verify it. Clients deposit funds into a secure vault before you start, and they are green-lit for release upon delivery.",
      icon: "🛡️",
      visual: "bg-amber-500/10 border-amber-500/20",
      tag: "SECURITY"
    },
    {
      title: "Digital Signatures",
      desc: "Legally binding e-signatures included. No more printing, scanning, or third-party apps. Everything is signed and timestamped directly on the platform.",
      icon: "✍️",
      visual: "bg-blue-500/10 border-blue-500/20",
      tag: "LEGAL"
    },
    {
      title: "PDF Storage & Versioning",
      desc: "Every contract is archived with a unique hash. Download high-quality PDFs for your records anytime. We keep a permanent audit trail of all changes.",
      icon: "📂",
      visual: "bg-purple-500/10 border-purple-500/20",
      tag: "ADMIN"
    },
    {
      title: "Dispute Handling",
      desc: "Coming soon: A neutral mediation layer. If a project goes sideways, our system provides a structured framework for resolution based on the original contract terms.",
      icon: "⚖️",
      visual: "bg-rose-500/10 border-rose-500/20",
      tag: "FUTURE"
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20">
          <Motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#4f46e5] font-black uppercase tracking-[0.4em] text-[10px]"
          >
            Capabilities
          </Motion.span>
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mt-4"
          >
            Built for the <br /> 
            <span className="text-zinc-400 dark:text-zinc-700 italic">Modern Freelancer.</span>
          </Motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col h-full"
            >
              <div className={`p-8 border ${feature.visual} rounded-sm h-full flex flex-col transition-all hover:border-[#4f46e5]/40`}>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-3xl">{feature.icon}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-200 dark:border-white/10 px-2 py-1 rounded-sm">
                    {feature.tag}
                  </span>
                </div>
                
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-4 group-hover:text-[#4f46e5] transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                  {feature.desc}
                </p>

                {/* Visual Placeholder / Micro-Graphic */}
                <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-white/5">
                  <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <Motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-[#4f46e5]"
                    />
                  </div>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>

        {/* Integration Note */}
        <Motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 border border-dashed border-zinc-200 dark:border-white/10 text-center"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            More features being added weekly by our beta community
          </p>
        </Motion.div>
      </div>
    </section>
  );
};

export default Features;