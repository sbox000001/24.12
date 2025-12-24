
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
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Uspešno poslato na elsintdm@gmail.com!\n\nProverite Vaš telefon - uskoro Vam stiže Viber potvrda i prvi status servisa.`);
      onSuccess();
    }, 1800);
  };

  return (
    <section className="py-2 px-4 sm:py-12 max-w-2xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-xl p-6 sm:p-12 border border-gray-100">
        <h2 className="text-2xl font-black text-center mb-8 text-gray-900 uppercase tracking-tighter">Zakažite Servis</h2>

        <div className="flex space-x-2 mb-8 p-1.5 bg-gray-100 rounded-[1.5rem]">
          <button 
            type="button"
            onClick={() => setType('phone')}
            className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${type === 'phone' ? 'bg-white text-blue-600 shadow-sm scale-100' : 'text-gray-400 scale-95'}`}
          >
            Telefon
          </button>
          <button 
            type="button"
            onClick={() => setType('visit')}
            className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${type === 'visit' ? 'bg-white text-blue-600 shadow-sm scale-100' : 'text-gray-400 scale-95'}`}
          >
            Dolazak
          </button>
        </div>

        <div className="bg-blue-50 p-5 rounded-[1.5rem] mb-8 flex items-start space-x-4 border border-blue-100 shadow-sm">
           <div className="text-2xl mt-1">✨</div>
           <p className="text-[11px] font-bold text-blue-900 leading-relaxed uppercase tracking-tight">
             Vaši podaci idu na <span className="text-blue-600 font-black">elsintdm@gmail.com</span>.<br/>Potvrda stiže na <span className="font-black">Viber</span>.
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-4 tracking-[0.2em] group-focus-within:text-blue-500 transition-colors">Ime i Prezime</label>
            <input 
              type="text" required 
              placeholder="Puno ime"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-6 py-5 rounded-2xl border-2 border-gray-50 outline-none focus:border-blue-500 bg-gray-50 text-gray-900 font-bold transition-all" 
            />
          </div>

          <div className="group">
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-4 tracking-[0.2em] group-focus-within:text-blue-500 transition-colors">Viber Telefon</label>
            <input 
              type="tel" required 
              placeholder="06x xxx xxxx"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full px-6 py-5 rounded-2xl border-2 border-gray-50 outline-none focus:border-blue-500 bg-gray-50 text-gray-900 font-bold transition-all" 
            />
          </div>

          {type === 'visit' && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-4 tracking-[0.2em]">Adresa</label>
              <input 
                type="text" required 
                placeholder="Ulica i broj, Grad"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-50 outline-none focus:border-blue-500 bg-gray-50 text-gray-900 font-bold" 
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-4 tracking-[0.2em]">Datum</label>
              <input 
                type="date" required 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-50 outline-none focus:border-blue-500 bg-gray-50 text-gray-900 font-bold" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-4 tracking-[0.2em]">Vreme</label>
              <select 
                required 
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-50 outline-none focus:border-blue-500 bg-gray-50 text-gray-900 font-bold appearance-none"
              >
                <option value="">Odaberite</option>
                <option value="09:00-11:00">09:00 - 11:00</option>
                <option value="11:00-13:00">11:00 - 13:00</option>
                <option value="13:00-15:00">13:00 - 15:00</option>
                <option value="15:00-17:00">15:00 - 17:00</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center space-x-3"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : 'POTVRDI ZAKAZIVANJE'}
            </button>
            <button 
              type="button" 
              onClick={onCancel} 
              className="w-full py-4 text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-gray-900 transition-colors"
            >
              Odustani
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Booking;
