import React, { useState } from 'react';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-content px-4 py-2 relative overflow-hidden">
      {/* Background decoration for a subtle "legal" feel */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0 L100 100 Z" />
        </svg>
      </div>

      <div className="container mx-auto flex items-center justify-center gap-4 text-sm font-bold tracking-wide">
        <span className="bg-white text-primary px-2 py-0.5 rounded text-[10px] uppercase">New</span>
        <p className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Smart Escrow Milestones are now live for 2026. 
          <a href="#learn-more" className="underline hover:opacity-80 transition-opacity">Learn more &rarr;</a>
        </p>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute right-4 hover:scale-110 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Banner;