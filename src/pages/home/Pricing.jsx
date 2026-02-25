
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Crown, Globe } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      desc: "For freelancers just getting started with secure work.",
      features: ["3 Active Contracts", "Standard Support", "Basic Templates", "1.5% Escrow Fee"],
      highlight: false,
      color: "blue",
      icon: <Zap className="w-5 h-5 text-blue-400" />
    },
    {
      name: "Pro Creator",
      price: "19",
      desc: "For high-volume professionals who need total protection.",
      features: ["Unlimited Contracts", "Priority Mediation", "Custom Branding", "0.5% Escrow Fee"],
      highlight: true,
      color: "amber",
      icon: <Crown className="w-5 h-5 text-amber-400" />
    },
    {
      name: "Enterprise",
      price: "49",
      desc: "For agencies and teams requiring massive scale.",
      features: ["Team Management", "API Access", "White-label Portal", "0.1% Escrow Fee"],
      highlight: false,
      color: "purple",
      icon: <Globe className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <section className="relative py-16 md:py-32 bg-[#0a0c10] overflow-hidden text-slate-200">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_10%,rgba(56,189,248,0.1),transparent_60%)]" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-500 font-bold tracking-[0.4em] text-[10px] uppercase mb-4"
          >
            Scale Your Security
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-none"
          >
            Simple fees. <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              No hidden costs.
            </span>
          </motion.h1>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col ${
                plan.highlight 
                ? 'border-amber-500/40 bg-white/5 backdrop-blur-2xl ring-1 ring-amber-500/20 lg:scale-105 z-20 shadow-[0_20px_50px_-15px_rgba(245,158,11,0.2)]' 
                : 'border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-amber-400 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
              )}
              
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  {plan.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 min-h-[40px]">
                {plan.desc}
              </p>
              
              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-6xl font-black text-white">${plan.price}</span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>

              <div className="space-y-5 mb-12 flex-grow">
                {plan.features.map((feat, index) => (
                  <div key={index} className="flex items-center gap-4 text-slate-300">
                    <div className={`p-1 rounded-full ${
                      plan.color === 'blue' ? 'bg-blue-500/20' : 
                      plan.color === 'amber' ? 'bg-amber-500/20' : 'bg-purple-500/20'
                    }`}>
                      <Check className={`w-3 h-3 ${
                        plan.color === 'blue' ? 'text-blue-400' : 
                        plan.color === 'amber' ? 'text-amber-400' : 'text-purple-400'
                      }`} />
                    </div>
                    <span className="text-sm font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                plan.highlight 
                ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-lg' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}>
                {plan.highlight && <ShieldCheck className="w-4 h-4" />}
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;