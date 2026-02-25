import React from 'react';
import { motion as Motion } from 'framer-motion';

const Pricing = () => {
  const tiers = [
    {
      name: "Beta Member",
      price: "0",
      desc: "For the early adopters helping us build the future of freelance security.",
      features: [
        "Unlimited Contract Drafts",
        "Digital E-Signatures",
        "Basic Escrow-Lite Verification",
        "PDF Exports",
        "Community Support"
      ],
      cta: "Join Beta",
      highlight: false
    },
    {
      name: "Professional",
      price: "19",
      desc: "Everything you need to run a high-volume freelance business safely.",
      features: [
        "Everything in Beta",
        "Phase-Based Payment Tracking",
        "Priority Dispute Resolution",
        "Custom Branding on Contracts",
        "Bulk PDF Archiving",
        "API Access (Upcoming)"
      ],
      cta: "Get Started",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For agencies and teams managing 50+ active contracts simultaneously.",
      features: [
        "Multi-User Team Seats",
        "Legal Counsel Review",
        "White-Label Portal",
        "Dedicated Account Manager",
        "Custom Integration Support"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <Motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#4f46e5] font-black uppercase tracking-[0.4em] text-[10px]"
          >
            Flexible Tiers
          </Motion.span>
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mt-4"
          >
            Transparent <span className="text-zinc-400 dark:text-zinc-700 italic">Pricing.</span>
          </Motion.h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-10 border rounded-sm transition-all flex flex-col h-full ${
                tier.highlight 
                ? 'border-[#4f46e5] bg-zinc-50 dark:bg-zinc-900/40 shadow-2xl shadow-indigo-500/10' 
                : 'border-zinc-100 dark:border-white/5 bg-white dark:bg-black'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#4f46e5] text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-black text-[#4f46e5] uppercase tracking-widest mb-4">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-zinc-900 dark:text-white">
                    {tier.price !== "Custom" ? `$${tier.price}` : tier.price}
                  </span>
                  {tier.price !== "Custom" && (
                    <span className="text-zinc-400 text-xs font-bold uppercase">/mo</span>
                  )}
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-4 leading-relaxed font-medium">
                  {tier.desc}
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-tight">
                    <svg className="w-3 h-3 text-[#4f46e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 ${
                tier.highlight 
                ? 'bg-[#4f46e5] text-white hover:brightness-110 shadow-lg shadow-indigo-500/30' 
                : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90'
              }`}>
                {tier.cta}
              </button>
            </Motion.div>
          ))}
        </div>

        {/* FAQ/Footnote */}
        <p className="text-center mt-16 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
          * Beta members get 50% off for life when Professional tier launches.
        </p>

      </div>
    </section>
  );
};

export default Pricing;