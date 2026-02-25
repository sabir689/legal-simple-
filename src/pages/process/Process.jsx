import React, { useState, useLayoutEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// --- COMPONENTS ---

const StepCard = ({ number, title, sub, desc, icon }) => (
  <Motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative p-8 border border-zinc-100 dark:border-white/5 bg-white dark:bg-black hover:border-[#4f46e5]/50 transition-all duration-500"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
      <span className="text-4xl">{icon}</span>
    </div>
    <span className="text-[#4f46e5] font-black text-[10px] uppercase tracking-[0.4em] block mb-2">
      Step {number} — {sub}
    </span>
    <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase mb-4 tracking-tight">
      {title}
    </h3>
    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
      {desc}
    </p>
  </Motion.div>
);

const SecurityModule = ({ title, desc, icon }) => (
  <div className="p-8 border-l-2 border-zinc-100 dark:border-white/10 hover:border-[#4f46e5] transition-colors">
    <div className="text-2xl mb-4">{icon}</div>
    <h4 className="text-sm font-black uppercase text-zinc-900 dark:text-white mb-2">{title}</h4>
    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{desc}</p>
  </div>
);

// --- MAIN PAGE ---

const Process = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 selection:bg-[#4f46e5] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="border-l-4 border-[#4f46e5] pl-8"
          >
            <span className="text-[#4f46e5] font-black uppercase tracking-[0.5em] text-[10px]">
              Platform Architecture
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mt-4 leading-[0.9]">
              Built for <br />
              <span className="italic text-zinc-200 dark:text-zinc-800">Legal Certainty.</span>
            </h1>
          </Motion.div>
        </div>
      </section>

      {/* 2. THE CORE WORKFLOW (DETAILED STEPS) */}
      <section className="py-20 px-6 border-t border-zinc-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StepCard 
              number="01" 
              sub="Sanitization"
              title="Smart Builder" 
              icon="🏗️"
              desc="Our Node.js backend processes your project scope into a legally-vetted JSON schema. We strip complexity while maintaining legal enforceability."
            />
            <StepCard 
              number="02" 
              sub="Authentication"
              title="E-Signature" 
              icon="✍️"
              desc="Signatures are tied to IP addresses, timestamps, and browser fingerprints, creating a robust chain of custody for every agreement."
            />
            <StepCard 
              number="03" 
              sub="Verification"
              title="Stripe Escrow" 
              icon="🏦"
              desc="Funds are authorized via 3D Secure 2.0 and held in a non-custodial Stripe Connect vault. You only start work once the 'Funds Locked' status appears."
            />
            <StepCard 
              number="04" 
              sub="Execution"
              title="Milestone Release" 
              icon="💰"
              desc="Upon milestone approval, our API triggers an immediate transfer from the vault to your bank. No manual invoices, no chasing payments."
            />
          </div>
        </div>
      </section>


      {/* 3. TECHNICAL SECURITY STACK */}
      <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-8">
                The Security Protocol
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <SecurityModule 
                  icon="🔐"
                  title="AES-256 Storage"
                  desc="Contracts and PII are encrypted at rest. Not even our database admins can read your project details."
                />
                <SecurityModule 
                  icon="🧬"
                  title="SHA-256 Hashing"
                  desc="Every document is hashed. If the file is altered by even 1 byte, the digital signature becomes void."
                />
                <SecurityModule 
                  icon="🛂"
                  title="JWT Sessions"
                  desc="Stateful authentication ensures that only you and your specific client can access sensitive PDFs."
                />
                <SecurityModule 
                  icon="⚖️"
                  title="PCI-DSS Level 1"
                  desc="We use Stripe's highest security tier. We never store credit card data on our own servers."
                />
              </div>
            </div>
            
            <div className="bg-white dark:bg-black border border-zinc-200 dark:border-white/10 p-10 rounded-sm shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#4f46e5] text-white text-[8px] font-black px-4 py-1 uppercase tracking-widest">
                Real-time Monitor
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-white/5 pb-4">
                  <span className="text-[10px] font-black uppercase text-zinc-400">Escrow Status</span>
                  <span className="text-[10px] font-black uppercase text-emerald-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Funds Verified
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-white/5 pb-4">
                  <span className="text-[10px] font-black uppercase text-zinc-400">Encryption Level</span>
                  <span className="text-[10px] font-black uppercase text-zinc-900 dark:text-white">AES-256-GCM</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-white/5 pb-4">
                  <span className="text-[10px] font-black uppercase text-zinc-400">Chain of Custody</span>
                  <span className="text-[10px] font-black uppercase text-zinc-900 dark:text-white">Active Hashing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-100 dark:border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase">Technical Security Stack</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "AES-256 Storage", icon: "🛡️" },
                { label: "SHA-256 Hashing", icon: "🧬" },
                { label: "JWT Sessions", icon: "🔑" },
                { label: "PCI-DSS Level 1", icon: "💳" }
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg">{s.icon}</span> {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC MONITOR UI */}
          <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-[#4f46e5]/40 to-transparent">
            <div className="bg-[#0A0A0A] rounded-3xl p-8 relative overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Real-time Monitor</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black text-emerald-500 uppercase">Funds Verified</span>
                </div>
              </div>
              
              <div className="h-40 w-full flex items-end gap-2">
                {[50, 80, 40, 95, 70, 85, 45, 90, 60, 75].map((h, i) => (
                  <Motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-[#4f46e5]/50 to-[#4f46e5] rounded-t-sm"
                  />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Latency: 14ms</span>
                <span className="text-[10px] font-bold text-[#818cf8] uppercase tracking-widest">Active Resistance ON</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DISPUTE RESOLUTION LAYER */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-8">
            The Mediation <span className="text-[#4f46e5] italic">Safety Net.</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-12">
            Disputes happen. We provide a structured environment to resolve them without expensive legal fees.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-white/5">
              <h4 className="font-black uppercase text-sm mb-4">Phase 1: Direct Negotiation</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                Parties can propose project pivots or mutual cancellations. Our system tracks all counter-offers for legal record.
              </p>
            </div>
            <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-white/5">
              <h4 className="font-black uppercase text-sm mb-4">Phase 2: Administrative Review</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                If a stalemate occurs, LegallySimple reviewers examine the milestone deliverables against the original contract hash to provide a resolution.
              </p>
            </div>
          </div>
        </div>
      </section>
      

      {/* 5. FINAL TRUST SIGNALS */}
      <footer className="py-20 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white border-r border-zinc-300 dark:border-zinc-700 pr-12">Verified by Stripe</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white border-r border-zinc-300 dark:border-zinc-700 pr-12">E-Sign Act Compliant</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">UETA Ready</span>
          </div>
          
          <div className="text-center mt-20">
            <button 
              onClick={toggleTheme}
              className="px-6 py-2 border border-zinc-200 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-[#4f46e5] transition-colors"
            >
              Mode: {theme}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Process;