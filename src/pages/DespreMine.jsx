import React from 'react';
import { motion } from 'framer-motion';

export default function DespreMine() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col md:flex-row font-sans pt-20 md:pt-0">
      
      {/* Visual Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-16 lg:p-24 relative">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative mb-8 rounded-3xl overflow-hidden glass-panel p-2">
           <img src="/images/photographerimage.jpg" alt="Fredi - Story" className="w-full h-auto rounded-[1.25rem] object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1554046920-90dcac028c24?q=80&w=3049&auto=format&fit=crop'; }} />
        </motion.div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 py-16 md:py-32 px-6 md:px-16 lg:px-24 flex items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-xl mx-auto space-y-8">
          <div className="inline-block px-4 py-1 border border-white/70 rounded-full text-gray-900 text-sm font-bold tracking-widest uppercase mb-4 bg-white/40">
            Despre Mine
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 font-bold leading-snug">
            Hey, eu sunt Fredi...
          </h2>
          
          <div className="text-lg text-gray-700 font-sans font-light leading-relaxed space-y-6">
            <p>
              A fi fotograf înseamnă mai mult decât apăsarea unui buton. Înseamnă a observa, a simți și a păstra o fărâmă din viața oamenilor așa cum este ea.
            </p>
            <p>
              Când am luat pentru prima dată aparatul în mână, nu știam că acesta va deveni modul prin care voi cunoaște sute de suflete pereche. De-a lungul celor 13 ani, am fost onorat să particip la momente unice.
            </p>
            <p>
              Abordarea mea este tip fotojurnalism combinat cu arta portretului. Nu forțez ipostaze care nu vă reprezintă. Prefer să rămân un observator discret și să captez emoțiile reale.
            </p>
            <p>
              Dacă simțiți că rezonăm din punct de vedere artistic, vă aștept cu drag să ne cunoaștem!
            </p>
          </div>

          <div className="pt-10">
            <img src="/images/logo.png" alt="TrueFrame Logo" className="h-16 object-contain brightness-0 invert opacity-90" />
          </div>
        </motion.div>
      </div>
      
    </div>
  );
}
