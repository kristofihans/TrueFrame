import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Fotografie Nuntă',
    description: 'Documentarea autentică și plină de emoție a celei mai importante zile din viața voastră. De la pregătiri până la petrecere, ne asigurăm că fiecare amănunt este surprins într-o lumină perfectă.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Fotografie Botez',
    description: 'Momente duioase și unice la primul eveniment major din viața copilului tău. Creăm amintiri calde și sincere pe care familia le va prețui generații la rând.',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Sesiuni de Familie / Cuplu',
    description: 'Ședințe foto relaxate în natură sau în studio. Captăm dinamica și conexiunea voastră într-un cadru natural, fără ipostaze rigide, punând accent pe spontaneitate.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Cabină Foto (Photobooth)',
    description: 'Distracție garantată pentru invitații voștri! Oglindă foto interactivă cu recuzită haioasă și printuri instantanee magnetice de înaltă calitate.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Ghidul Miresei',
    description: 'Un suport informativ și prietenos ce te ajută să îți organizezi ziua nunții fără stres. Tips & tricks din culisele evenimentelor pentru ca voi să străluciți.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop',
  }
];

export default function Servicii() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-transparent font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Servicii Foto
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-zinc-400 font-light"
          >
            Fiecare eveniment are propriul ritm. Eu mă adaptez și devin povestitorul tău vizual. 
            Descoperă cum te pot ajuta să îți păstrezi amintirile vii.
          </motion.p>
        </div>

        <div className="space-y-12">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`glass-panel rounded-3xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border border-white/5">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                <div className="inline-block px-4 py-1 bg-zinc-900/40 border border-white/10 text-white text-sm font-bold uppercase tracking-widest rounded-full mb-2">
                  Serviciu Pachet
                </div>
                <h3 className="text-3xl font-serif font-bold text-white">{service.title}</h3>
                <p className="text-lg text-zinc-400 leading-relaxed font-light">{service.description}</p>
                <Link to="/contact" className="btn-primary mt-4 inline-block">
                  Solicită o ofertă
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
