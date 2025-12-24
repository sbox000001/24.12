
import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onNavigate: (sectionId?: string) => void;
  onStartAI: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onStartAI }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (id?: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-100 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => handleMenuClick()}
        >
          <div className={`p-2 rounded-xl transition-all duration-500 ${isScrolled ? 'bg-blue-600 shadow-blue-200 shadow-lg' : 'bg-white shadow-xl'}`}>
            <svg className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-black tracking-tighter leading-none transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>ELSINT DM</span>
            <span className={`text-[8px] font-black tech-mono uppercase tracking-[0.3em] ${isScrolled ? 'text-blue-500' : 'text-cyan-200'}`}>Digital Service</span>
          </div>
        </div>

        {/* Navigacija */}
        <div className="flex items-center space-x-4" ref={menuRef}>
          <div className="hidden md:flex items-center space-x-8 mr-8">
            <button onClick={() => handleMenuClick('about-section')} className={`text-xs font-black uppercase tracking-widest hover:text-blue-500 transition-colors ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>O Nama</button>
            <button onClick={() => handleMenuClick('contact-section')} className={`text-xs font-black uppercase tracking-widest hover:text-blue-500 transition-colors ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>Kontakt</button>
          </div>

          <button 
            onClick={onStartAI}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 flex items-center space-x-2 ${isScrolled ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-blue-600 shadow-2xl'}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>AI LAB</span>
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2.5 rounded-2xl transition-all ${isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white border border-white/20'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="absolute top-full right-6 mt-4 w-64 bg-white border border-gray-100 rounded-3xl shadow-2xl py-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="px-6 py-4 border-b border-gray-50 mb-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Glavni Meni</p>
              </div>
              <button onClick={() => handleMenuClick()} className="w-full text-left px-6 py-4 hover:bg-blue-50 text-gray-900 font-black text-sm transition flex items-center justify-between">
                <span>POČETNA</span>
                <span className="text-blue-600">🏠</span>
              </button>
              <button onClick={() => handleMenuClick('about-section')} className="w-full text-left px-6 py-4 hover:bg-blue-50 text-gray-900 font-black text-sm transition flex items-center justify-between">
                <span>O NAMA</span>
                <span className="text-blue-600">🏢</span>
              </button>
              <button onClick={() => handleMenuClick('contact-section')} className="w-full text-left px-6 py-4 hover:bg-blue-50 text-gray-900 font-black text-sm transition flex items-center justify-between">
                <span>KONTAKT</span>
                <span className="text-blue-600">📞</span>
              </button>
              <div className="mt-4 px-6">
                <button onClick={() => { onStartAI(); setIsMenuOpen(false); }} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100">
                  POKRENI ASISTENTA
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
