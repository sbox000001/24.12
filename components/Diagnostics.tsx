
import React, { useState, useRef } from 'react';
import { DeviceType, DiagnosticSolution } from '../types';
import { analyzeProblem } from '../services/geminiService';

interface DiagnosticsProps {
  initialDevice: string | null;
  onCancel: () => void;
  onProceedToBooking: (summary: string) => void;
}

const DEVICES: { id: DeviceType; name: string; icon: string }[] = [
  { id: 'laptop', name: 'Laptopi', icon: '💻' },
  { id: 'tv', name: 'Televizor', icon: '📺' },
  { id: 'ac', name: 'Klima', icon: '❄️' },
  { id: 'washing-machine', name: 'Bela Tehnika', icon: '🧺' },
  { id: 'network', name: 'Mreža', icon: '🌐' },
  { id: 'other', name: 'Ostalo', icon: '❓' },
];

const TV_PROBLEMS = [
  { id: 'tv-no-pic-sound', label: 'Ima ton, nema slike' },
  { id: 'tv-no-power-led', label: 'Sija lampica, ne pali' },
  { id: 'tv-no-power-no-led', label: 'Mrtav (nema lampice)' },
  { id: 'tv-flickering-pic', label: 'Slika treperi' },
  { id: 'tv-lines-on-screen', label: 'Linije na ekranu' },
  { id: 'tv-blue-pic', label: 'Plava slika' },
];

const Diagnostics: React.FC<DiagnosticsProps> = ({ initialDevice, onCancel, onProceedToBooking }) => {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | null>(initialDevice as DeviceType || null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [solutions, setSolutions] = useState<DiagnosticSolution[]>([]);
  
  const [mediaData, setMediaData] = useState<{ data: string, mimeType: string, previewUrl: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeviceSelect = (dev: DeviceType) => {
    setSelectedDevice(dev);
    setStep(2);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setMediaData({
        data: base64String,
        mimeType: file.type,
        previewUrl: URL.createObjectURL(file)
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedDevice || !description) return;
    setLoading(true);
    const results = await analyzeProblem(
      selectedDevice, 
      description, 
      mediaData ? { data: mediaData.data, mimeType: mediaData.mimeType } : undefined
    );
    setSolutions(results);
    setLoading(false);
    setStep(3);
  };

  return (
    <div className="pb-12 px-4 sm:px-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-sm border border-gray-100 overflow-hidden relative">
        {/* Suptilna tech pozadina u asistentu */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none select-none tech-mono text-[10px] p-4 text-blue-900 leading-tight">
          0x4F 0x6E 0x20<br/>SCANNING...<br/>CORE_V3
        </div>

        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">AI LAB</h2>
              <p className="text-[10px] font-black text-blue-500 tech-mono uppercase tracking-widest">Diagnostic Engine v4.0</p>
            </div>
          </div>
          <button onClick={onCancel} className="bg-gray-100 text-gray-400 hover:text-gray-900 p-2 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Stepper */}
        <div className="flex justify-center space-x-12 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center space-y-2">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all border-4 ${step >= s ? 'bg-blue-600 text-white border-blue-100 shadow-md' : 'bg-gray-50 text-gray-300 border-transparent'}`}>
                {step > s ? '✓' : s}
              </div>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-black mb-8 text-center text-gray-900 uppercase tracking-tight">Selektujte Kategoriju Hardvera</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {DEVICES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDeviceSelect(d.id)}
                  className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center space-y-4 hover:border-blue-400 hover:shadow-lg active:scale-95 ${selectedDevice === d.id ? 'border-blue-600 bg-blue-50' : 'border-gray-50 bg-gray-50'}`}
                >
                  <span className="text-5xl drop-shadow-sm">{d.icon}</span>
                  <span className="font-black text-gray-900 text-sm uppercase tracking-tight">{d.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-black mb-6 text-center text-gray-900 uppercase tracking-tight">Logovanje Simptoma</h3>
            
            {selectedDevice === 'tv' && (
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {TV_PROBLEMS.map((p) => (
                  <button 
                    key={p.id}
                    onClick={() => setDescription(p.label)}
                    className={`px-5 py-2.5 rounded-full border-2 text-xs font-black uppercase tracking-tighter transition-all ${description === p.label ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 bg-white text-gray-500 hover:border-blue-200'}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Unesite detaljan opis kvara..."
                className="w-full p-6 rounded-[2rem] border-2 border-gray-100 focus:border-blue-500 outline-none h-48 resize-none transition-all bg-gray-50 text-gray-900 font-bold placeholder:text-gray-300 shadow-inner"
              />
              <div className="absolute bottom-4 right-6 tech-mono text-[9px] text-gray-300 uppercase">Input buffer: active</div>
            </div>

            <div className="mt-8">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,video/*" className="hidden" />
              {!mediaData ? (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-6 border-2 border-dashed border-gray-200 rounded-[2rem] text-blue-600 font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center space-x-3 group"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">📷</span>
                  <span>Učitaj vizuelni log (foto/video)</span>
                </button>
              ) : (
                <div className="flex items-center justify-between p-5 bg-blue-50 rounded-[2rem] border border-blue-100 animate-in zoom-in duration-300">
                  <div className="flex items-center space-x-4">
                    <img src={mediaData.previewUrl} className="w-16 h-16 object-cover rounded-2xl shadow-md border-2 border-white" alt="Preview" />
                    <div>
                      <p className="font-black text-blue-900 text-sm uppercase tracking-tight">Fajl uspešno dodat</p>
                      <p className="text-[10px] tech-mono text-blue-400">STATUS: READY_FOR_ANALYSIS</p>
                    </div>
                  </div>
                  <button onClick={() => setMediaData(null)} className="bg-white text-red-500 p-2 rounded-xl shadow-sm hover:bg-red-50 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button 
                disabled={!description || loading}
                onClick={handleAnalyze}
                className="w-full sm:order-2 py-6 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-2xl shadow-blue-100 hover:bg-blue-700 transition transform active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="tech-mono text-xs tracking-widest">ANALYZING...</span>
                  </>
                ) : 'POKRENI ANALIZU'}
              </button>
              <button onClick={() => setStep(1)} className="w-full sm:order-1 py-6 rounded-2xl bg-gray-50 font-black text-gray-400 text-xs uppercase tracking-widest hover:bg-gray-100 transition">
                Nazad
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-center space-x-3 mb-8">
               <div className="h-px w-12 bg-gray-200"></div>
               <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">Izveštaj Dijagnostike</h3>
               <div className="h-px w-12 bg-gray-200"></div>
            </div>

            <div className="space-y-6 mb-12">
              {solutions.map((sol, idx) => (
                <div key={idx} className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                       <h4 className="text-xl font-black text-gray-900 mb-1 tracking-tight uppercase">{sol.title}</h4>
                       <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-[10px] tech-mono font-black text-blue-400 uppercase">Vector #{idx + 1042}</span>
                       </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                      sol.difficulty === 'Lako' ? 'bg-green-50 text-green-600' : 
                      sol.difficulty === 'Srednje' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                    }`}>
                      Težina: {sol.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 font-bold leading-relaxed mb-6">{sol.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sol.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start space-x-3 bg-gray-50/50 p-4 rounded-2xl border border-transparent hover:border-blue-100 transition-colors">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-black mt-0.5 shadow-sm">{sIdx + 1}</div>
                        <span className="text-xs font-black text-gray-700 leading-tight uppercase tracking-tighter">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 text-white p-10 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <h4 className="text-2xl font-black mb-3 uppercase tracking-tighter">Zahteva Stručnu Intervenciju?</h4>
              <p className="text-gray-400 mb-10 font-bold max-w-sm mx-auto">Nemojte rizikovati gubitak podataka ili trajno oštećenje hardvera. ELSINT DM tim je spreman.</p>
              
              <button 
                onClick={() => onProceedToBooking(description)}
                className="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black text-lg shadow-xl shadow-blue-900/50 hover:bg-blue-700 transition transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-3"
              >
                <span>ZAKAŽITE PROFESIONALNI SERVIS</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              <button onClick={() => setStep(2)} className="mt-8 text-gray-500 font-black text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors">
                 &larr; Pokrenite novu dijagnostiku
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diagnostics;
