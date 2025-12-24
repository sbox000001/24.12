
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Diagnostics from './components/Diagnostics';
import Booking from './components/Booking';

export enum OverlayView {
  None = 'none',
  About = 'about',
  Contact = 'contact',
  Diagnostics = 'diagnostics',
  Booking = 'booking'
}

const App: React.FC = () => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayView>(OverlayView.None);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [diagnosticResult, setDiagnosticResult] = useState<string>('');

  const openOverlay = (view: OverlayView, device?: string) => {
    if (device) setSelectedDevice(device);
    setActiveOverlay(view);
    document.body.style.overflow = 'hidden';
  };

  const closeOverlay = () => {
    setActiveOverlay(OverlayView.None);
    document.body.style.overflow = 'auto';
  };

  const navigateToBooking = (summary: string) => {
    setDiagnosticResult(summary);
    setActiveOverlay(OverlayView.Booking);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-x-hidden font-['Open_Sans']">
      <Header 
        onNavigate={(id) => {
          if (id === 'about-section') openOverlay(OverlayView.About);
          else if (id === 'contact-section') openOverlay(OverlayView.Contact);
          else closeOverlay();
        }} 
        onStartAI={() => openOverlay(OverlayView.Diagnostics)} 
      />
      
      <main className={`flex-grow transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeOverlay !== OverlayView.None ? 'blur-xl scale-90 brightness-50 pointer-events-none' : 'scale-100 opacity-100'}`}>
        <Hero onStart={() => openOverlay(OverlayView.Diagnostics)} />
        
        <div className="container mx-auto px-4 -mt-20 relative z-10 pb-24">
          <div className="flex flex-col space-y-12">
            <Services onSelectService={(dev) => openOverlay(OverlayView.Diagnostics, dev)} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div 
                onClick={() => openOverlay(OverlayView.About)}
                className="group relative bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 cursor-pointer hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform">🏢</div>
                  <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter uppercase">O Nama</h3>
                  <p className="text-gray-400 font-bold italic leading-relaxed">Upoznajte tehnologiju i ljude koji stoje iza najpreciznijeg servisa u regionu.</p>
                  <div className="mt-8 flex items-center space-x-2">
                    <span className="h-1 w-8 bg-blue-600 rounded-full"></span>
                    <span className="tech-mono text-[10px] font-black text-blue-600 uppercase tracking-widest">Read More</span>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => openOverlay(OverlayView.Contact)}
                className="group relative bg-gray-900 p-10 rounded-[3rem] shadow-xl border border-gray-800 cursor-pointer hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-900/20 rounded-full -mr-16 -mb-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">📞</div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase">Kontakt</h3>
                  <p className="text-gray-500 font-bold italic leading-relaxed">Dostupni smo 24/7 za Vaše hitne upite putem Vibera i email-a.</p>
                  <div className="mt-8 flex items-center space-x-2 text-blue-400">
                    <span className="h-1 w-8 bg-blue-400 rounded-full"></span>
                    <span className="tech-mono text-[10px] font-black uppercase tracking-widest">Get in touch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Layer active={activeOverlay === OverlayView.About} onClose={closeOverlay} title="O Nama">
        <About />
      </Layer>

      <Layer active={activeOverlay === OverlayView.Contact} onClose={closeOverlay} title="Kontakt">
        <Contact />
      </Layer>

      <Layer active={activeOverlay === OverlayView.Diagnostics} onClose={closeOverlay} title="AI LAB" isGray>
        <Diagnostics 
          initialDevice={selectedDevice} 
          onCancel={closeOverlay} 
          onProceedToBooking={navigateToBooking} 
        />
      </Layer>

      <Layer active={activeOverlay === OverlayView.Booking} onClose={closeOverlay} title="Sistemska Rezervacija">
        <Booking 
          summary={diagnosticResult} 
          onCancel={() => setActiveOverlay(OverlayView.Diagnostics)} 
          onSuccess={closeOverlay}
        />
      </Layer>

      <footer className="bg-white border-t border-gray-100 py-10 text-center">
        <div className="tech-mono text-[10px] text-gray-300 mb-2 uppercase tracking-[0.5em]">Authored by DM Electronics</div>
        <p className="text-gray-400 text-xs font-black">© {new Date().getFullYear()} ELSINT DM SERVIS • ALL SYSTEMS GO</p>
      </footer>
    </div>
  );
};

const Layer: React.FC<{ active: boolean, onClose: () => void, title: string, children: React.ReactNode, isGray?: boolean }> = ({ active, onClose, title, children, isGray }) => {
  return (
    <div className={`fixed inset-0 z-[100] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${active ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={onClose}></div>
      <div className={`absolute bottom-0 left-0 right-0 top-4 sm:top-10 rounded-t-[3.5rem] shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden ${isGray ? 'bg-slate-50' : 'bg-white'}`}>
        <div className="px-10 py-8 flex justify-between items-center border-b border-gray-100 shrink-0">
          <div className="flex items-center space-x-4">
             <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="group bg-gray-100 text-gray-900 px-6 py-3 rounded-2xl hover:bg-red-600 hover:text-white transition-all font-black text-xs uppercase tracking-widest flex items-center space-x-2"
          >
            <span>Zatvori</span>
            <span className="text-lg leading-none">&times;</span>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto pt-6 pb-20 scroll-smooth">
          {children}
        </div>
      </div>
    </div>
  );
};

export default App;
