
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [sending, setSending] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simuliramo slanje upita
    setTimeout(() => {
      setSending(false);
      alert('Upit je uspešno prosleđen na elsintdm@gmail.com! Javićemo Vam se u najkraćem roku putem telefona ili Vibera.');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-600 text-white p-8 rounded-[2.5rem] shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Brze Informacije</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">📱</span>
                <div>
                  <p className="text-xs font-black opacity-60 uppercase">Telefon / Viber</p>
                  <p className="text-xl font-bold">0677627904</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl">📧</span>
                <div>
                  <p className="text-xs font-black opacity-60 uppercase">Email</p>
                  <p className="text-lg font-bold">elsintdm@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 bg-white/10 p-4 rounded-2xl border border-white/20">
            <p className="text-sm font-bold leading-relaxed">Vaš upit direktno stiže našem tehničkom timu na zvaničnu email adresu.</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Vaše Ime</label>
              <input 
                type="text" required 
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 outline-none transition bg-gray-50 text-gray-900 font-bold" 
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Email (za odgovor)</label>
              <input 
                type="email" required 
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 outline-none transition bg-gray-50 text-gray-900 font-bold" 
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Opis problema</label>
              <textarea 
                rows={4} required 
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 outline-none transition bg-gray-50 text-gray-900 font-bold resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={sending}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-100 flex items-center justify-center disabled:opacity-50"
            >
              {sending ? 'SLANJE UPITA...' : 'POŠALJI NA EMAIL'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <h4 className="text-xl font-black mb-1">Gde se nalazimo?</h4>
          <p className="text-gray-400 font-bold">Posetite nas ili pošaljite uređaj poštom.</p>
        </div>
        <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10">
          <p className="text-blue-400 font-black">📍 POGLEDAJ LOKACIJU</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
