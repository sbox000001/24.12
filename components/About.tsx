
import React from 'react';

const IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
    alt: "Matična ploča macro"
  },
  {
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    alt: "Precizno lemljenje"
  },
  {
    url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    alt: "Laboratorijski uslovi"
  },
  {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    alt: "Elektronske komponente"
  }
];

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-12">
      {/* Moderna Galerija Slika */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 h-64 sm:h-80">
        {IMAGES.map((img, idx) => (
          <div key={idx} className={`relative overflow-hidden rounded-3xl shadow-md group ${idx % 2 !== 0 ? 'mt-4 mb-0' : 'mb-4 mt-0'}`}>
            <img 
              src={img.url} 
              alt={img.alt} 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      <div className="rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 bg-white p-8 sm:p-12">
        <div className="space-y-8 text-gray-900 text-lg font-medium leading-relaxed">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
                Vaš Servis <span className="text-blue-600">Digitalne Ere</span>
              </h3>
              <p>
                <span className="text-blue-600 font-extrabold">ELSINT DM</span> postavlja nove standarde u održavanju elektronike. Naša laboratorija je opremljena najmodernijim alatima za mikrolemljenje i sistemsku dijagnostiku, ali ono što nas izdvaja je način na koji komuniciramo sa Vama.
              </p>
            </div>
            <div className="w-full md:w-1/3 aspect-square rounded-[2rem] overflow-hidden shadow-inner border-4 border-gray-50">
               <img 
                src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=500" 
                alt="Servis Detalj" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* KLJUČNI FOKUS: Viber Obaveštenja */}
          <div className="bg-purple-50 border border-purple-100 p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 shadow-sm">
            <div className="bg-white p-4 rounded-2xl shadow-sm shrink-0">
               <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M19.336 4.331c-2.434-2.434-5.671-3.774-9.115-3.774-7.105 0-12.887 5.782-12.887 12.887 0 2.271.594 4.485 1.72 6.442l-1.832 6.69 6.845-1.795c1.895 1.033 4.025 1.577 6.155 1.577h.005c7.104 0 12.888-5.783 12.888-12.888 0-3.444-1.34-6.681-3.779-9.119zm-9.115 19.866c-2.023 0-4.008-.543-5.738-1.571l-.412-.245-4.264 1.119 1.138-4.157-.269-.428c-1.13-1.799-1.727-3.896-1.727-6.046 0-6.136 4.991-11.127 11.127-11.127 2.973 0 5.768 1.157 7.871 3.26 2.103 2.103 3.26 4.899 3.26 7.872.001 6.137-4.99 11.127-11.127 11.127zm6.096-8.328c-.334-.167-1.976-.975-2.281-1.087-.306-.111-.528-.167-.75.167-.222.334-.861 1.087-1.056 1.309-.194.222-.389.25-.722.083-.334-.167-1.408-.52-2.682-1.656-1.002-.894-1.678-2-1.873-2.334-.194-.334-.021-.514.145-.68.15-.149.334-.389.5-.583.167-.194.222-.334.334-.556.111-.222.056-.417-.028-.583-.083-.167-.75-1.808-1.028-2.478-.271-.652-.544-.564-.75-.574-.194-.01-.417-.01-.639-.01-.222 0-.583.083-.889.417-.306.334-1.167 1.139-1.167 2.778 0 1.639 1.194 3.223 1.361 3.445.167.222 2.35 3.589 5.694 5.035.795.345 1.416.551 1.9.708.8.254 1.528.218 2.103.132.641-.096 1.976-.807 2.254-1.586.278-.779.278-1.446.194-1.586-.083-.14-.306-.222-.64-.389z"/>
               </svg>
            </div>
            <div>
               <h4 className="text-purple-900 font-black uppercase tracking-tight text-xl mb-2">Automatska Viber Obaveštenja</h4>
               <p className="text-gray-700 font-bold leading-relaxed">
                 Uveli smo sistem koji ceni Vaše vreme: <span className="text-purple-600 font-black">svaki naš korisnik dobija direktne Viber poruke</span> o svakoj fazi popravke. Čim završimo dijagnostiku, zamenimo deo ili testiramo uređaj, dobićete informaciju na dlanu.
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
            <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 transition-all hover:bg-blue-50">
              <div className="text-3xl mb-4">🔬</div>
              <h4 className="text-blue-600 font-black mb-2 uppercase tracking-wider text-sm">Brza Dijagnostika</h4>
              <p className="text-sm text-gray-700 font-bold leading-relaxed">
                Kombinujemo AI tehnologiju i iskustvo kako bismo u rekordnom roku otkrili pravi uzrok kvara.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 transition-all hover:bg-white hover:shadow-md">
              <div className="text-3xl mb-4">💎</div>
              <h4 className="text-gray-900 font-black mb-2 uppercase tracking-wider text-sm">Čista Transparentnost</h4>
              <p className="text-sm text-gray-700 font-bold leading-relaxed">
                Bez skrivenih troškova i bez potrebe za stalnim pozivima. Informacije stižu Vama, a ne obrnuto.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-10 border-t border-gray-100 flex items-center justify-around text-center">
          <div>
            <span className="block text-4xl font-black text-blue-600">10+</span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Godina rada</span>
          </div>
          <div className="h-10 w-px bg-gray-200"></div>
          <div>
            <span className="block text-4xl font-black text-blue-600">5k+</span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Uspešnih servisa</span>
          </div>
          <div className="h-10 w-px bg-gray-200"></div>
          <div>
            <span className="block text-4xl font-black text-blue-600">100%</span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Viber Status</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
