
import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onNavigate: (sectionId?: string) => void;
  onStartAI: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onStartAI }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Zatvaranje menija na klik van njega
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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer transition active:scale-95"
          onClick={() => handleMenuClick()}
        >
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">ELSINT DM</span>
        </div>

        {/* Navigacija */}
        <div className="flex items-center space-x-3 sm:space-x-4 relative" ref={menuRef}>
          {/* Padajući meni dugme */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-1 bg-gray-50 text-gray-900 px-4 py-2 rounded-xl font-bold border border-gray-100 shadow-sm hover:bg-gray-100 transition active:scale-95"
          >
            <span>Meni</span>
            <svg className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Sam padajući meni (Layer) */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 sm:w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-[60]">
              <button 
                onClick={() => handleMenuClick()}
                className="w-full text-left px-5 py-3 hover:bg-blue-50 text-gray-900 font-bold transition flex items-center space-x-3"
              >
                <span className="text-blue-600">🏠</span>
                <span>Početna</span>
              </button>
              <button 
                onClick={() => handleMenuClick('about-section')}
                className="w-full text-left px-5 py-3 hover:bg-blue-50 text-gray-900 font-bold transition flex items-center space-x-3"
              >
                <span className="text-blue-600">ℹ️</span>
                <span>O nama</span>
              </button>
              <button 
                onClick={() => handleMenuClick('contact-section')}
                className="w-full text-left px-5 py-3 hover:bg-blue-50 text-gray-900 font-bold transition flex items-center space-x-3"
              >
                <span className="text-blue-600">📞</span>
                <span>Kontakt</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button 
                onClick={() => { onStartAI(); setIsMenuOpen(false); }}
                className="w-full text-left px-5 py-3 hover:bg-green-50 text-green-700 font-bold transition flex items-center space-x-3"
              >
                <span className="text-green-600">⚡</span>
                <span>AI Pomoć</span>
              </button>
            </div>
          )}

          {/* EA Asistent prečica (samo desktop) */}
          <button 
            onClick={onStartAI}
            className="hidden sm:flex bg-green-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md hover:bg-green-700 transition active:scale-95 items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>EA Asistent</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
