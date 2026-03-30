import React from 'react';
import { motion } from 'framer-motion';

export default function DespreMine() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col md:flex-row font-sans pt-20 md:pt-0">
      
      {/* Visual Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-16 lg:p-24 relative">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="space-y-6">
           <div className="relative rounded-3xl overflow-hidden glass-panel p-2">
             <img src="./images/photographerimage.jpg" alt="Fredi - Story" className="w-full h-auto rounded-[1.25rem] object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1554046920-90dcac028c24?q=80&w=3049&auto=format&fit=crop'; }} />
           </div>
 
        </motion.div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 py-16 md:py-32 px-4 md:px-16 lg:px-24 flex items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-xl mx-auto space-y-8">
          <div className="inline-block px-4 py-1 border border-white/10 rounded-full text-zinc-300 text-sm tracking-widest uppercase mb-4 bg-zinc-900/40">
            Povestea Mea
          </div>
          
          <div className="text-zinc-400 leading-relaxed text-lg font-light space-y-2">
            <p className="text-white text-4xl font-serif mb-6 leading-tight">Hey, eu sunt Fredi…</p>
            <p>fotograf din Oradea.</p>
            <p>Nu fotografiez tot. Și nu pentru oricine.</p>
            <p>Nu caut perfecțiunea. Caut ce este real.</p>
            <p>Momente sincere,</p>
            <p>detalii care contează</p>
            <p>și lucruri care nu pot fi repetate.</p>
            <p>Nu regizez excesiv.</p>
            <p>Prefer să observ și să surprind lucrurile așa cum sunt.</p>
            <p>Nu este pentru toată lumea.</p>
            <p>Dar dacă rezonezi cu stilul meu, probabil ai găsit ceea ce cauți.</p>
          </div>

          <div className="pt-10 flex items-center gap-6">
            <img src="./images/logo.png" alt="TrueFrame Logo" className="h-10 object-contain brightness-0 invert opacity-60" />
            <div className="h-px bg-white/10 flex-grow" />
          </div>
        </motion.div>
      </div>
      
    </div>
  );
}
