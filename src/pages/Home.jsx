import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Camera, Heart, PartyPopper, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const reviews = [
  { name: "Fischer Nikolett", time: "4 months ago", text: "Szuper fotók! Nagyon türelmes és kedves, ha nem vagy elég magabiztos a pózolásban atunci el te ajuta extrem de mult!" },
  { name: "Dalma Lukács", time: "2 years ago", text: "Csak a legjobbakat tudom Frédiről írni! Precíz, megbízható, türelmes și profesionist desăvârșit." },
  { name: "Boglárka Kovács", time: "8 months ago", text: "Egyszerűen nem találunk szavakat arra, mennyire hálásak vagyunk. Minunat!" },
  { name: "Emese Fuzesi", time: "2 years ago", text: "Hála și köszönet Feri! 🥰 Minden képed egy történetet mesél el.." },
  { name: "Krisztina Pap", time: "9 months ago", text: "Nagyon hálásak vagyunk, hogy te örökítetted meg a polgári esküvőnket și a kisbabánk keresztelőjét is." },
  { name: "Iulia Bortis", time: "2 weeks ago", text: "Am avut o experienta placuta in a colabora cu Ferenc. Profesional, atent, talentat." },
  { name: "Eszter Ujvárosi", time: "1 year ago", text: "Am avut norocul să lucrăm cu Balajti Ferenc la nunta noastră. Este un adevărat artist." },
  { name: "Krisztina Kovacs", time: "4 months ago", text: "Foarte amabil si super profesional! Ne-a ajutat foarte mult." },
  { name: "Evelyn Nagy", time: "1 year ago", text: "Fotografiile sunt absolut superbe, amintiri de neuitat alături de el." },
  { name: "Reka Kiss", time: "10 months ago", text: "Acest fotograf talentat a surprins cele mai emoționante momente la botez." },
  { name: "Claudiu Farcalau", time: "2 years ago", text: "Recomand pe Freddy cu cel mai mare drag. Extrem de profesionist si amabil." }
].sort(() => 0.5 - Math.random());

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <div className="w-full font-sans text-gray-200">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-between overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/herobackground.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2938&auto=format&fit=crop'; }}
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight drop-shadow-2xl"
          >
            Fotograf de nuntă și evenimente din Oradea.
          </motion.h1>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full mt-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-200 mb-10 font-light drop-shadow-md"
          >
            Cele mai frumoase momente povestite prin fotografii...
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <a href="#bio" className="btn-primary px-8 py-4 text-lg">Vezi mai mult</a>
          </motion.div>
        </div>
      </section>

      {/* Second Section: Bio & Stats */}
      <section id="bio" className="py-24 relative bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
            >
              <img 
                src="/images/photographerimage.jpg" 
                alt="Fredi - Photographer" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1554046920-90dcac028c24?q=80&w=3049&auto=format&fit=crop'; }}
              />
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Salut! Eu sunt Fredi.</h2>
                <p className="text-gray-700 leading-relaxed text-lg font-light">
                  Pasiunea mea pentru fotografie s-a născut din dorința de a opri timpul în loc pentru câteva frânturi de secundă. 
                  Fiecare eveniment este o poveste unică, iar misiunea mea este să documentez aceste momente neprețuite cu autenticitate și emoție.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/50">
                <div className="glass-panel p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
                  <div className="text-sm text-gray-700 font-medium tracking-wide uppercase">Evenimente</div>
                </div>
                <div className="glass-panel p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">13+</div>
                  <div className="text-sm text-gray-700 font-medium tracking-wide uppercase">Experiență</div>
                </div>
                <div className="glass-panel p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">400k+</div>
                  <div className="text-sm text-gray-700 font-medium tracking-wide uppercase">Fotografii</div>
                </div>
                <div className="glass-panel p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2 flex justify-center items-center gap-1">
                    5.0 <Star size={20} className="fill-white text-gray-900" />
                  </div>
                  <div className="text-sm text-gray-700 font-medium tracking-wide uppercase">Rating</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                 <a href="#servicii-highlight" className="btn-primary">Serviciile mele</a>
                 <Link to="/contact" className="btn-outline">Contactează-mă</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Third Section: Servicii Highlight */}
      <section id="servicii-highlight" className="py-24 relative bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Fotografie cu Suflet</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg font-light">Indiferent de evenimentul tău, abordarea mea este adaptată pentru a capta magia fiecărui moment.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-3xl text-left hover:-translate-y-2 transition-transform duration-300">
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600" alt="Fotografie Nunta" className="w-full h-48 object-cover rounded-2xl mb-6 shadow-md" />
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Fotografie Nuntă</h3>
              <p className="text-gray-700 font-light leading-relaxed mb-6">Documentarea autentică și plină de emoție a celei mai importante zile din viața voastră, de la emoțiile mirilor până la lacrimile bunicilor.</p>
              <Link to="/servicii" className="text-gray-900 font-medium hover:text-gray-800 transition-colors inline-flex items-center gap-2">Detalii Nuntă &rarr;</Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-3xl text-left hover:-translate-y-2 transition-transform duration-300">
              <img src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=600" alt="Sesiuni Foto" className="w-full h-48 object-cover rounded-2xl mb-6 shadow-md" />
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Sesiuni Foto</h3>
              <p className="text-gray-700 font-light leading-relaxed mb-6">Fie că e o sesiune de logodnă, Save-the-Date, Maternitate sau doar Familie, surprind gesturile naturale într-un mediu complet relaxat.</p>
              <Link to="/servicii" className="text-gray-900 font-medium hover:text-gray-800 transition-colors inline-flex items-center gap-2">Vezi Sesiuni &rarr;</Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-3xl text-left hover:-translate-y-2 transition-transform duration-300">
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600" alt="Cabina Foto" className="w-full h-48 object-cover rounded-2xl mb-6 shadow-md" />
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Cabină Foto</h3>
              <p className="text-gray-700 font-light leading-relaxed mb-6">Distracție absolută și o atmosferă efervescentă asigurată invitaților prin oglinda noastră foto dotată cu props-uri distractive și print rapid.</p>
              <Link to="/servicii" className="text-gray-900 font-medium hover:text-gray-800 transition-colors inline-flex items-center gap-2">Detalii Cabină &rarr;</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 bg-transparent border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="inline-flex items-center gap-2 bg-white/40 border border-white/50 px-6 py-3 rounded-full mb-8 shadow-sm">
             <div className="flex text-yellow-500 gap-0.5">
               <Star size={18} className="fill-current" />
               <Star size={18} className="fill-current" />
               <Star size={18} className="fill-current" />
               <Star size={18} className="fill-current" />
               <Star size={18} className="fill-current" />
             </div>
             <span className="text-gray-900 font-bold tracking-wide">5.0 Recenzii Google</span>
          </motion.div>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Ce spun clienții mei</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-gray-700">Glisează sau folosește săgețile pentru a citi recenziile. Povești reale din experiențele clienților.</motion.p>
        </div>
        
        {/* Swipable Container */}
        <div className="max-w-[90rem] mx-auto px-2 sm:px-4 lg:px-8 flex items-center gap-2 lg:gap-6">
          <button onClick={scrollLeft} className="hidden md:flex shrink-0 p-4 rounded-full bg-white/70 border border-white hover:bg-white shadow-xl text-gray-900 transition-transform hover:-translate-x-1" aria-label="Recenzia Precedenta">
            <ChevronLeft size={24} />
          </button>
          
          <div ref={scrollRef} className="flex-1 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-2 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {reviews.map((review, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="snap-center lg:snap-start shrink-0 w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] glass-panel p-8 rounded-3xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                      <p className="text-xs text-gray-700 mt-1">{review.time}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/60 text-gray-900 flex items-center justify-center font-serif text-xl border border-white/50 uppercase shadow-inner">
                      {review.name[0]}
                    </div>
                  </div>
                  <div className="flex text-yellow-500 mb-4 gap-0.5">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-current" />)}
                  </div>
                  <p className="text-gray-800 text-sm md:text-base italic leading-relaxed">"{review.text}"</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button onClick={scrollRight} className="hidden md:flex shrink-0 p-4 rounded-full bg-white/70 border border-white hover:bg-white shadow-xl text-gray-900 transition-transform hover:translate-x-1" aria-label="Recenzia Urmatoare">
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-32 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="glass-panel p-12 md:p-20 rounded-[2.5rem] text-center"
          >
            <div className="mx-auto w-24 h-24 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 mb-10 border border-white/70">
              <CheckCircle size={48} strokeWidth={1} />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-8 tracking-wide">
              Garanție 100% Satisfacție
            </h2>
            <div className="w-24 h-px bg-white/20 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
              Mă angajez să livrez nu doar fotografii, ci emoții reale care dăinuiesc. Fiecare detaliu și privire este surprinsă cu devotament, la cele mai înalte standarde artistice, pentru ca amintirile voastre să fie absolut impecabile.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
