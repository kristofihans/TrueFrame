import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const Instagram = ({ size = 24, className = "" }) => (
  // SVG omitted string
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Facebook = ({ size = 24, className = "" }) => (
  // SVG omitted string
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

export default function Contact() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-transparent font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
          >
            Să scriem povestea împreună
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-700 font-light"
          >
            Fie că aveți deja data stabilită sau doar doriți detalii suplimentare, lăsați-mi un mesaj și vă voi răspunde cu cel mai mare drag.
          </motion.p>
        </div>

        {/* Top Info Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center text-center">
            <div className="p-4 bg-white/60 rounded-full text-gray-900 mb-4"><MapPin size={28} /></div>
            <strong className="block text-gray-900 mb-2 text-lg font-serif">Locație</strong>
            <span className="text-gray-700 font-light">Oradea, Bihor</span>
            <span className="text-sm text-gray-500 mt-2">Disponibil pentru deplasări interne.</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center text-center">
            <div className="p-4 bg-white/60 rounded-full text-gray-900 mb-4"><Phone size={28} /></div>
            <strong className="block text-gray-900 mb-2 text-lg font-serif">Telefon</strong>
            <a href="tel:+40727854187" className="text-gray-700 font-light hover:text-gray-900 transition-colors">+40 727 854 187</a>
          </div>

          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center text-center">
            <div className="p-4 bg-white/60 rounded-full text-gray-900 mb-4"><Mail size={28} /></div>
            <strong className="block text-gray-900 mb-2 text-lg font-serif">Email & Socials</strong>
            <a href="mailto:contact@trueframe.example" className="text-gray-700 font-light hover:text-gray-900 transition-colors mb-4">contact@trueframe.example</a>
            <div className="flex justify-center gap-3">
              <a href="#" className="p-3 bg-white/40 border border-white/50 rounded-xl hover:bg-white/20 transition-all text-gray-700 hover:text-gray-900"><Instagram size={20} /></a>
              <a href="#" className="p-3 bg-white/40 border border-white/50 rounded-xl hover:bg-white/20 transition-all text-gray-700 hover:text-gray-900"><Facebook size={20} /></a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Split (Form Left, Map Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-8 md:p-12 rounded-3xl h-full flex flex-col justify-center"
          >
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-white/50 pb-4">Îmi doresc o colaborare</h3>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <input type="text" id="name" required className="w-full px-4 py-3 bg-white/40 border border-gray-900/30 rounded-xl focus:ring-2 focus:ring-gray-900/40 focus:border-gray-900 focus:bg-white/60 text-gray-900 placeholder:text-gray-600 transition-all outline-none" placeholder="Nume și Prenume *" />
                </div>
                <div>
                  <input type="tel" id="phone" required className="w-full px-4 py-3 bg-white/40 border border-gray-900/30 rounded-xl focus:ring-2 focus:ring-gray-900/40 focus:border-gray-900 focus:bg-white/60 text-gray-900 placeholder:text-gray-600 transition-all outline-none" placeholder="Telefon *" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <input type="email" id="email" className="w-full px-4 py-3 bg-white/40 border border-gray-900/30 rounded-xl focus:ring-2 focus:ring-gray-900/40 focus:border-gray-900 focus:bg-white/60 text-gray-900 placeholder:text-gray-600 transition-all outline-none" placeholder="Email" />
                </div>
                <div>
                  <input type="date" id="date" className="w-full px-4 py-3 bg-white/40 border border-gray-900/30 rounded-xl focus:ring-2 focus:ring-gray-900/40 focus:border-gray-900 focus:bg-white/60 text-gray-900 transition-all outline-none" />
                </div>
              </div>

              <div>
                <select id="eventType" className="w-full px-4 py-3 bg-white/40 border border-gray-900/30 rounded-xl focus:ring-2 focus:ring-gray-900/40 focus:border-gray-900 focus:bg-white/60 text-gray-900 transition-all outline-none appearance-none">
                  <option value="">Alege tipul de eveniment...</option>
                  <option value="nunta">Nuntă</option>
                  <option value="botez">Botez</option>
                  <option value="sedinta">Ședință Foto</option>
                </select>
              </div>

              <div>
                <textarea id="message" rows="4" required className="w-full px-4 py-3 bg-white/40 border border-gray-900/30 rounded-xl focus:ring-2 focus:ring-gray-900/40 focus:border-gray-900 focus:bg-white/60 text-gray-900 placeholder:text-gray-600 transition-all outline-none resize-none" placeholder="Mesajul tău *"></textarea>
              </div>

              <button type="submit" className="w-full btn-primary !py-4 text-base tracking-wide uppercase mt-4">
                Trimite Solicitarea
              </button>
            </form>
          </motion.div>

          {/* Contact Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-3xl overflow-hidden glass-panel h-[50vh] lg:h-auto border border-white/50"
          >
            <iframe 
              title="Locatie Oradea"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87361.64208493035!2d21.849187399347576!3d47.05141940984852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474647e366035eb5%3A0xe138f310f8a8cf3!2sOradea!5e0!3m2!1sen!2sro!4v1700000000000!5m2!1sen!2sro" 
              className="w-full h-full border-0 rounded-2xl" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
