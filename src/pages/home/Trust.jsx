
import { motion } from 'framer-motion';
console.log(!!motion);

const TrustSection = () => {
  const features = [
    { title: "Smart Escrow", desc: "Payments held by automated smart-contracts.", icon: "🔐" },
    { title: "IP Protection", desc: "Automatic copyright transfer upon payout.", icon: "⚖️" },
    { title: "Global Payouts", desc: "Withdraw to Bank, PayPal, or Crypto.", icon: "🌍" },
    { title: "Dispute Center", desc: "Human-led mediation for complex cases.", icon: "🤝" },
  ];

  return (
    <section className="py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Big Stats */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="text-primary font-black uppercase tracking-widest text-sm">Security at Scale</h2>
              <p className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                Millions secured. <br /> 
                <span className="text-primary italic font-serif">Zero</span> missed payments.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-black">$4.2M+</motion.div>
                <p className="text-sm opacity-60 font-bold uppercase tracking-widest">Total Protected</p>
              </div>
              <div>
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-black">12k+</motion.div>
                <p className="text-sm opacity-60 font-bold uppercase tracking-widest">Active Creators</p>
              </div>
            </div>
          </div>

          {/* Right Side: Feature Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-base-100 border border-base-300 rounded-none hover:border-primary transition-colors group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;