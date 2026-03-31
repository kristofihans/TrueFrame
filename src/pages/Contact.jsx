import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Calendar } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-transparent font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section matching Home.jsx */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Hai să ne cunoaștem mai bine</h1>
          <div className="h-1 w-20 bg-white/20 mx-auto rounded-full" />
          <p className="mt-8 text-lg text-zinc-400 font-light max-w-2xl mx-auto italic">
            "Să scriem povestea împreună. Fie că aveți deja data stabilită sau doar doriți detalii suplimentare, lăsați-mi un mesaj și vă voi răspunde cu cel mai mare drag."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Map Area matching Home.jsx */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="aspect-square w-full rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5434.035881533315!2d21.9213121!3d47.0791118!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4746499da3c0a119%3A0x90dbc64492002a6!2sFotograf%20nunta%20Oradea%20-%20Ferenc%20Balajti!5e0!3m2!1sen!2sro!4v1774720564508!5m2!1sen!2sro" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Locație Ferenc Balajti Photography"
            ></iframe>
          </motion.div>

          {/* Form & WhatsApp Side matching Home.jsx */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 md:p-12 glass-panel rounded-[2.5rem] space-y-8"
          >
            <div className="pb-6 border-b border-white/10">
              <p className="text-zinc-400 text-lg font-light leading-relaxed">
                Am un număr limitat de locuri, deci dacă vrei să colaborăm, nu ezita să-mi lași un mesaj
              </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" id="name" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white placeholder:text-zinc-500 transition-all outline-none" placeholder="Nume și Prenume *" />
                <input type="tel" id="phone" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white placeholder:text-zinc-500 transition-all outline-none" placeholder="Telefon *" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="email" id="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white placeholder:text-zinc-500 transition-all outline-none" placeholder="Email" />
                <div className="relative group/date">
                   <input 
                    type="date" 
                    id="date" 
                    required
                    onClick={(e) => {
                      if (window.innerWidth >= 768 && e.target.showPicker) {
                        try { e.target.showPicker(); } catch(err) {}
                      }
                    }}
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white transition-all outline-none appearance-none cursor-text md:cursor-pointer" 
                  />
                  <div 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer hover:text-white transition-colors group-focus-within/date:text-white"
                    onClick={() => {
                      const input = document.getElementById('date');
                      if (input && input.showPicker) {
                        try { input.showPicker(); } catch(err) {}
                      }
                    }}
                  >
                    <Calendar size={24} />
                  </div>
                </div>
              </div>

              <select id="eventType" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white transition-all outline-none appearance-none">
                <option value="" className="bg-zinc-900">Alege serviciul dorit</option>
                <option value="Fotografie de nuntă" className="bg-zinc-900">Fotografie de nuntă</option>
                <option value="Fotografie/filmare promoțională" className="bg-zinc-900">Fotografie/filmare promoțională</option>
                <option value="Fotografie de brand" className="bg-zinc-900">Fotografie de brand</option>
                <option value="Boudoir" className="bg-zinc-900">Boudoir</option>
                <option value="Închiriere cabină foto (photobooth)" className="bg-zinc-900">Închiriere cabină foto (photobooth)</option>
              </select>

              <textarea id="message" rows="3" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white placeholder:text-zinc-500 transition-all outline-none resize-none" placeholder="Scrie-mi pe scurt despre evenimetul/proiectul tau"></textarea>

              <button type="submit" className="w-full btn-primary !py-4 text-base tracking-wide uppercase mt-2 shadow-lg">
                Trimite Mesajul
              </button>
            </form>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-900/40 border border-white/10 px-4 py-1 rounded-full text-zinc-500">sau</span></div>
            </div>

            <div className="pt-2">
              <a 
                href="https://wa.me/40727854187" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-green-600/90 hover:bg-green-600 text-white px-10 py-5 rounded-full text-xl font-bold transition-all shadow-[0_10px_30px_rgba(22,163,74,0.15)] w-full justify-center group"
              >
                <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
                Contactează-mă pe WhatsApp
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
