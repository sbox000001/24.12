
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
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">AI Asistent</h2>
          </div>
          <button onClick={onCancel} className="bg-gray-100 text-gray-400 hover:text-gray-900 p-2 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Stepper */}
        <div className="flex justify-center space-x-12 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-4 ${step >= s ? 'bg-blue-600 text-white border-blue-100' : 'bg-gray-100 text-gray-400 border-transparent'}`}>
                {s}
              </div>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <h3 className="text-xl font-bold mb-6 text-center text-gray-900">Odaberite uređaj:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {DEVICES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDeviceSelect(d.id)}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center space-y-3 hover:border-blue-300 active:scale-95 ${selectedDevice === d.id ? 'border-blue-600 bg-blue-50' : 'border-gray-50 bg-gray-50'}`}
                >
                  <span className="text-4xl">{d.icon}</span>
                  <span className="font-bold text-gray-900">{d.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <h3 className="text-xl font-bold mb-6 text-center text-gray-900">Opišite šta se dešava</h3>
            
            {selectedDevice === 'tv' && (
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {TV_PROBLEMS.map((p) => (
                  <button 
                    key={p.id}
                    onClick={() => setDescription(p.label)}
                    className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${description === p.label ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 bg-white text-gray-600'}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Npr. Laptop se pregreva i gasi..."
              className="w-full p-5 rounded-2xl border-2 border-gray-100 focus:border-blue-500 outline-none h-40 resize-none transition-all bg-gray-50 text-gray-900 font-bold"
            />

            <div className="mt-6">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,video/*" className="hidden" />
              {!mediaData ? (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-5 border-2 border-dashed border-gray-200 rounded-2xl text-blue-600 font-bold hover:bg-blue-50 transition-all flex items-center justify-center space-x-2"
                >
                  <span>📷 Priloži dokaz (foto/video)</span>
                </button>
              ) : (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center space-x-3">
                    <img src={mediaData.previewUrl} className="w-14 h-14 object-cover rounded-xl shadow-sm" alt="Preview" />
                    <span className="font-bold text-blue-900">Dokaz dodat</span>
                  </div>
                  <button onClick={() => setMediaData(null)} className="p-2 text-red-500 font-bold">Ukloni</button>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button 
                disabled={!description || loading}
                onClick={handleAnalyze}
                className="w-full sm:order-2 py-5 rounded-2xl bg-blue-600 text-white font-bold text-lg shadow-xl hover:bg-blue-700 transition disabled:opacity-50 active:scale-95"
              >
                {loading ? 'Razmišljam...' : 'Analiziraj'}
              </button>
              <button onClick={() => setStep(1)} className="w-full sm:order-1 py-5 rounded-2xl bg-gray-100 font-bold text-gray-600 hover:bg-gray-200 transition">
                Nazad
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <h3 className="text-xl font-bold mb-8 text-center text-gray-900">Predložena rešenja:</h3>
            <div className="space-y-6 mb-10">
              {solutions.map((sol, idx) => (
                <div key={idx} className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-bold text-blue-900">{sol.title}</h4>
                    <span className="px-3 py-1 bg-white text-blue-600 text-xs font-black rounded-full shadow-sm">
                      {sol.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium mb-4">{sol.description}</p>
                  <div className="space-y-2">
                    {sol.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start space-x-3 text-sm font-bold text-gray-700">
                        <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex-shrink-0 flex items-center justify-center text-[10px] mt-0.5">{sIdx + 1}</div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 text-white p-8 rounded-3xl text-center shadow-2xl">
              <h4 className="text-xl font-bold mb-2">Rešenje zahteva stručnjaka?</h4>
              <p className="text-gray-400 mb-6 font-medium">Ne rizikujte dodatno oštećenje, tu smo za Vas.</p>
              <button 
                onClick={() => onProceedToBooking(description)}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition active:scale-95"
              >
                Zakažite naš servis
              </button>
              <button onClick={() => setStep(2)} className="mt-4 text-gray-400 font-bold text-sm">Pokušaj sa drugim opisom</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diagnostics;
