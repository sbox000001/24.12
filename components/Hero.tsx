
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="hero-gradient text-white py-20 sm:py-32 px-4 relative overflow-hidden">
      {/* Circuit Overlay */}
      <div className="absolute inset-0 circuit-bg pointer-events-none"></div>
      
      {/* Dekorativni Tech Elementi */}
      <div className="absolute top-10 left-10 opacity-20 hidden md:block">
        <div className="tech-mono text-[10px] space-y-1">
          <p>SYS_STATUS: STABLE</p>
          <p>AI_CORE: ACTIVE</p>
          <p>LOC: 44.7866° N, 20.4489° E</p>
        </div>
      </div>

      <div className="container mx-auto text-center relative z-10 max-w-4xl">
        <div className="inline-flex items-center space-x-2 bg-blue-900/40 border border-blue-400/30 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">EA Assistant v3.1 Online</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black mb-8 leading-[1.1] tracking-tighter text-white">
          Digitalna Hirurgija <br /> Za Vašu <span className="text-cyan-300">Elektroniku</span>
        </h1>
        
        <p className="text-lg sm:text-xl mb-12 opacity-80 font-medium max-w-2xl mx-auto leading-relaxed text-blue-50">
          Koristimo preciznu AI dijagnostiku da vratimo Vaše uređaje u fabričko stanje. Brzo, transparentno i sigurno.
        </p>

        <div className="flex justify-center">
          <button 
            onClick={onStart}
            className="group relative bg-white text-blue-600 px-12 py-6 rounded-2xl text-xl font-black shadow-2xl transition transform hover:scale-105 active:scale-95 flex items-center space-x-4 btn-glow"
          >
            <span className="relative z-10">POKRENI DIJAGNOSTIKU</span>
            <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
