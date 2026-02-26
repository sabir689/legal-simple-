import React from 'react';
import { motion as Motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { name: 'Smart Builder', href: '#builder' },
      { name: 'Escrow-Lite', href: '#escrow' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Beta Access', href: '/join' },
    ],
    Resources: [
      { name: 'Legal Journal', href: '/blog' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
    ],
    Legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security Audit', href: '/security' },
    ],
  };

  return (
    <footer className="relative bg-white dark:bg-[#050505] pt-24 pb-12 px-6 border-t border-zinc-100 dark:border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#4f46e5]/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-black uppercase tracking-tighter mb-6 dark:text-white">
              Legally<span className="text-[#4f46e5] italic">Simple</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-sm mb-8">
              The infrastructure of trust for the global freelance economy. 
              Engineering legal finality through code and cryptographic certainty.
            </p>
            
            {/* System Status Indicator */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                System Status: <span className="text-emerald-500">Operational</span>
              </span>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4f46e5] mb-6">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-tight"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-zinc-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            © {currentYear} LegallySimple Protocol. All Rights Reserved.
          </div>
          
          <div className="flex gap-8 items-center grayscale opacity-50 hover:opacity-100 transition-opacity">
            <span className="text-[9px] font-black uppercase tracking-widest">PCI-DSS L1</span>
            <span className="text-[9px] font-black uppercase tracking-widest">AES-256</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Stripe Certified</span>
          </div>

          <div className="flex gap-6">
            {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
              <a 
                key={social} 
                href={`#${social.toLowerCase()}`} 
                className="text-zinc-400 hover:text-[#4f46e5] transition-colors"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">{social}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;