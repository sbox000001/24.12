
import React, { useState } from 'react';

interface BookingProps {
  summary: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const Booking: React.FC<BookingProps> = ({ summary, onCancel, onSuccess }) => {
  const [type, setType] = useState<'phone' | 'visit'>('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    address: '',
    problemSummary: summary
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuliramo proces slanja podataka na elsintdm@gmail.com
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Uspešno poslato na elsintdm@gmail.com!\n\nProverite Vaš telefon - uskoro Vam stiže Viber potvrda i prvi status servisa.`);
      onSuccess();
    }, 1800);
  };

  return (
    <section className="py-6 px-3 sm:py-12 sm:px-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 uppercase tracking-tighter">Zakažite Servis</h2>

        <div className="flex space-x-2 mb-8 p-1 bg-gray-100 rounded-xl">
          <button 
            onClick={() => setType('phone')}
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition ${type === 'phone' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
          >
            Telefonski Poziv
          </button>
          <button 
            onClick={() => setType('visit')}
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition ${type === 'visit' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
          >
            Dolazak na Adresu
          </button>
        </div>

        {/* Viber Promo Banner u formi */}
        <div className="bg-purple-50 p-4 rounded-2xl mb-6 flex items-center space-x-3 border border-purple-100">
           <div className="text-2xl">📱</div>
           <p className="text-xs font-bold text-purple-900">
             Podaci se šalju direktno na <span className="font-black text-blue-600">elsintdm@gmail.com</span>. Bićete kontaktirani putem <span className="underline">Viber poruke</span>.
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Ime i Prezime</label>
            <input 
              type="text" required 
              placeholder="Puno ime"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 bg-gray-50 text-gray-900 font-bold" 
            />
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Mobilni Telefon (Viber)</label>
            <input 
              type="tel" required 
              placeholder="06x xxx xxxx"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 bg-gray-50 text-gray-900 font-bold" 
            />
          </div>

          {type === 'visit' && (
            <div className="animate-in fade-in duration-300">
              <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Adresa za dolazak</label>
              <input 
                type="text" required 
                placeholder="Ulica i broj, Grad"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 bg-gray-50 text-gray-900 font-bold" 
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Datum</label>
              <input 
                type="date" required 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 bg-gray-50 text-gray-900 font-bold" 
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Vreme</label>
              <select 
                required 
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 bg-gray-50 text-gray-900 font-bold"
              >
                <option value="">Odaberite</option>
                <option value="09:00-11:00">09:00 - 11:00</option>
                <option value="11:00-13:00">11:00 - 13:00</option>
                <option value="13:00-15:00">13:00 - 15:00</option>
                <option value="15:00-17:00">15:00 - 17:00</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">AI Rezime Problema</label>
            <textarea 
              rows={3}
              value={formData.problemSummary}
              onChange={e => setFormData({...formData, problemSummary: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none bg-gray-50 text-gray-900 font-bold resize-none"
            ></textarea>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition disabled:opacity-50"
            >
              {isSubmitting ? 'PROSLEĐIVANJE...' : 'POTVRDI ZAKAZIVANJE'}
            </button>
            <button type="button" onClick={onCancel} className="w-full py-3 text-gray-400 font-black text-sm uppercase tracking-widest hover:text-gray-900 transition">
              ODUSTANI
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Booking;
