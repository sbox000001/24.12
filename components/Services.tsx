
import React from 'react';

const SERVICES = [
  { id: 'laptop', name: 'Laptopi', icon: '💻', desc: 'Chip-level servis' },
  { id: 'tv', name: 'Televizori', icon: '📺', desc: 'Reparacija panela' },
  { id: 'ac', name: 'Klima', icon: '❄️', desc: 'Sistemski servis' },
  { id: 'washing-machine', name: 'Bela Tehnika', icon: '🧺', desc: 'Moduli i kontroleri' },
  { id: 'network', name: 'Mreže', icon: '🌐', desc: 'Konfiguracija' },
  { id: 'other', name: 'Ostalo', icon: '❓', desc: 'Specijalni uređaji' },
];

interface ServicesProps {
  onSelectService: (id: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl p-8 sm:p-14 border border-white/50 relative overflow-hidden">
      {/* Suptilni pozadinski brojčani nizovi (Matrix style lite) */}
      <div className="absolute top-0 right-0 p-8 tech-mono text-[8px] text-blue-100 hidden lg:block select-none leading-none">
        01011010<br/>11001010<br/>10101111<br/>00110011
      </div>

      <div className="flex flex-col sm:flex-row items-end justify-between mb-12 text-center sm:text-left gap-4">
        <div>
          <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter uppercase">Servisni Moduli</h2>
          <p className="text-gray-400 font-bold tech-mono text-xs uppercase tracking-widest">Select hardware category for AI scanning</p>
        </div>
        <div className="bg-gray-900 text-white px-6 py-2 rounded-2xl text-[10px] font-black tech-mono border border-gray-700">
          DB_VER: 2025.04
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {SERVICES.map((s) => (
          <button 
            key={s.id} 
            onClick={() => onSelectService(s.id)}
            className="relative overflow-hidden p-8 sm:p-10 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 hover:border-blue-500 hover:bg-white transition-all group flex flex-col items-center sm:items-start text-left shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            {/* Scan Line Effect */}
            <div className="scan-line"></div>
            
            <div className="text-5xl sm:text-6xl mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 drop-shadow-md">
              {s.icon}
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-1 tracking-tight">{s.name}</h3>
            <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest opacity-70">{s.desc}</p>
            
            {/* Dekorativni ugao */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Services;
