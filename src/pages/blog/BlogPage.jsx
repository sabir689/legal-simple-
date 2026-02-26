import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Compliance', 'Finance', 'Growth', 'Case Studies'];

  const posts = [
    {
      tag: "Compliance",
      title: "The 2026 Guide to E-Sign Act Compliance",
      excerpt: "Everything you need to know about why digital signatures are now more secure than ink.",
      author: "Legal Team",
      date: "Feb 24",
      img: "bg-indigo-500/20"
    },
    {
      tag: "Finance",
      title: "How Stripe Connect Powers Our Escrow-Lite",
      excerpt: "A deep dive into the financial architecture that keeps your freelance payments safe.",
      author: "FinTech Dept",
      date: "Feb 20",
      img: "bg-purple-500/20"
    },
    {
      tag: "Growth",
      title: "How to Fire a Client Without Breaking Your Contract",
      excerpt: "Using termination clauses to exit toxic relationships professionally and safely.",
      author: "Admin",
      date: "Feb 15",
      img: "bg-emerald-500/20"
    }
  ];

  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen pt-32 pb-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. HERO / HEADER */}
        <header className="mb-16">
          <Motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#4f46e5] font-black uppercase tracking-[0.4em] text-[10px]"
          >
            The Journal
          </Motion.span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 dark:text-white">
            Freelance <span className="italic text-zinc-300 dark:text-zinc-800">Intelligence.</span>
          </h1>
        </header>

        {/* 2. CATEGORY FILTER */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-zinc-100 dark:border-white/5 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? 'bg-[#4f46e5] text-white' 
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-[#4f46e5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. FEATURED POST (Authority Section) */}
        <section className="mb-24">
          <div className="relative group overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/50 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 aspect-video bg-[#4f46e5]/10 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4f46e5]/20 to-transparent" />
                {/* Visual Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20 group-hover:scale-110 transition-transform duration-700">📜</div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="bg-[#4f46e5] text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-sm">Featured</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-6 mb-6 dark:text-white">
                The New Standard of <br /> Digital Trust.
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed font-medium">
                Why we are moving toward a "Code-as-Law" framework for the freelance economy and what it means for your liability in 2026.
              </p>
              <button className="text-[10px] font-black uppercase tracking-widest border-b-2 border-[#4f46e5] pb-1">
                Read Masterclass
              </button>
            </div>
          </div>
        </section>

        {/* 4. MAIN FEED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
          {posts.map((post, i) => (
            <Motion.article 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className={`aspect-square mb-6 rounded-2xl ${post.img} border border-zinc-100 dark:border-white/5 transition-all group-hover:border-[#4f46e5]/40`} />
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#4f46e5] text-[9px] font-black uppercase tracking-widest">{post.tag}</span>
                <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                <span className="text-zinc-400 text-[9px] font-bold uppercase">{post.date}</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-4 dark:text-white group-hover:text-[#4f46e5] transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">By {post.author}</span>
              </div>
            </Motion.article>
          ))}
        </div>

        {/* 5. NEWSLETTER / LEAD CAPTURE (The Waitlist) */}
        <section className="bg-[#4f46e5] rounded-3xl p-12 text-center text-white relative overflow-hidden">
           {/* Abstract Decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Get the Beta Brief.</h3>
             <p className="opacity-80 text-sm font-medium mb-8">Join 1,200+ freelancers getting weekly insights on legal protection and financial growth.</p>
             <div className="flex flex-col sm:flex-row gap-2">
               <input 
                type="email" 
                placeholder="email@example.com" 
                className="flex-grow bg-white/10 border border-white/20 px-6 py-4 rounded-xl placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all text-sm"
               />
               <button className="bg-white text-[#4f46e5] px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-zinc-100 transition-colors">
                 Subscribe
               </button>
             </div>
           </div>
        </section>

      </div>
    </div>
  );
};

export default BlogPage;