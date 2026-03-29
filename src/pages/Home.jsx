import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Clock, ChevronLeft, ChevronRight, MessageCircle, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from './Blog';

const reviews = [
  { name: 'Fischer Nikolett', time: '4 months ago', text: 'Szuper fotók! Nagyon türelmes és kedves, ha nem vagy elég magabiztos a pózolásban akkor ő a töölkéletes választás mert nagyon sokat segít! Egy óra alatt rengeteg kép készült amik egy életen át velünk maradnak! 🥰' },
  { name: 'Dalma Lukács', time: '2 years ago', text: 'Csak a legjobbakat tudom Frédiről írni! Precíz, megbízható, türelmes és még sorolhatnám! Többször is volt már alkalmam a kamerája előtt szerepelni akár egyedül akár a párommal, az eredmény pedig mindig kifogástalan volt! Mindenkinek csak ajánlani tudom!' },
  { name: 'Boglárka Kovács', time: '8 months ago', text: 'Egyszerűen nem találunk szavakat arra, mennyire hálásak vagyunk a fantasztikus fotósunknak, aki életünk egyik legszebb napját örökítette meg nemcsak az esküvőnkön, hanem a másnapi élményfotózáson is! 🥹📸' },
  { name: 'Emese Fuzesi', time: '2 years ago', text: 'Hála és köszönet Feri! 🥰 Mindig mondogattam, hogy te egy varazsló vagy.. de ez így is van! Minden képed egy történetet mesél el.. mindig a legmeghittebb pillanatokat kapod lencsevégre, és úgy játszol a fénnyel ahogy senki! Nyugodt szívvel ajánlak barkinek, mert a te munkádban én még nem csalódtam!👌🏻😊' },
  { name: 'Krisztina Pap', time: '9 months ago', text: 'Nagyon hálásak vagyunk, hogy te örökítetted meg a polgári esküvőnket és a kisbabánk keresztelőjét is. Csodálatos érzés visszanézni ezeket a pillanatokat, amiket ilyen profizmussal kaptál el. Nemcsak tehetséges fotós vagy, hanem olyan ember...' },
  { name: 'Iulia Bortis', time: '2 weeks ago', text: 'Am avut o experienta placuta in a colabora cu Ferenc, fotograful nostru de botez. Profesional, atent, talentat, a surprins momentele importante ale evenimentului. Pozele sunt frumoase, de o calitate foarte buna. Recomand cu incredere!' },
  { name: 'Eszter Ujvárosi', time: '1 year ago', text: 'Am avut norocul să lucrăm cu Balajti Ferenc la nunta noastră, și nu am putea fi mai mulțumiți de alegerea făcută! Este un adevărat artist, iar ceea ce face el este, fără îndoială, artă pură. Fotografiile au ieșit absolut minunate...' },
  { name: 'Krisztina Kovacs', time: '4 months ago', text: 'Domnu Balajti Ferenc a fost recomandat de la o cunostinta. De la inceput a fost foarte amabil si super profesional! Ne-a ajutat foarte multe.' },
  { name: 'Evelyn Nagy', time: '1 year ago', text: 'Am avut plăcerea de a colabora cu Frédi la nunta noastră, și nu am putea fi mai mulțumiți de rezultat! Fotografiile sunt absolut superbe, surprinzând perfect emoțiile și momentele speciale ale zilei noastre. Profesionalismul, creativitatea și atenția la detalii ne-au impresionat cu adevărat. Ne-am simțit în largul nostru pe tot parcursul zilei și asta se vede în fotografii. Recomandăm cu încredere pe Frédi tuturor celor care își doresc amintiri de neuitat! 🤍' },
  { name: 'Reka Kiss', time: '10 months ago', text: 'Am avut onoarea ca acest fotogarf talentat să surprindă cele mai emoționante momente de la botezul băiețelului nostru – și nu putem fi mai recunoscători pentru alegerea făcută! 🙏' },
  { name: 'Claudiu Farcalau (Clauux)', time: '2 years ago', text: 'Recomand pe Freddy cu cel mai mare drag. Un mod de a face poze foarte profesionist dar și cu umor pentru a te face cat mai relaxat în timpul ședinței și a avea cele mai bune rezultate. Mai jos am atașat câteva poze cu partenera și singur pentru a vă face o idee.' }
].sort(() => 0.5 - Math.random());

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);
  const reviewsRef = useRef(null);
  const heroImages = [
    './images/herobackground.jpg',
    './images/photo1.jpg',
    './images/photo4.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const latestPosts = [...blogPosts].slice(0, 3);

  const scrollReviews = (direction) => {
    if (!reviewsRef.current) return;
    const cardWidth = window.innerWidth < 768 ? 350 + 24 : 450 + 24;
    const container = reviewsRef.current;
    if (direction === 'left') {
      container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full font-sans text-zinc-100 bg-zinc-950">
      
      {/* 1. Hero Section with Slideshow */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentHero}
              src={heroImages[currentHero]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2938&auto=format&fit=crop'; }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-white leading-tight mb-8"
          >
            Fotograf de nuntă și evenimente din Oradea.
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <button 
              onClick={() => document.getElementById('bio').scrollIntoView({ behavior: 'smooth' })} 
              className="btn-primary font-medium tracking-wide uppercase shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              Vezi mai mult
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Bio Section */}
      <section id="bio" className="py-24 relative bg-transparent scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="space-y-6 order-2 lg:order-1"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <img 
                  src="./images/photographerimage.jpg" 
                  alt="Fredi - Fotograf" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1554046920-90dcac028c24?q=80&w=3049&auto=format&fit=crop'; }}
                />
              </div>
              <div className="glass-panel p-8 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md">
                <p className="text-sm md:text-base text-white font-medium text-center leading-relaxed italic">
                  “Cred că secretul unei fotografii reușite stă în emoțiile sincere: o îmbrățișare caldă, o privire plină de emoție, o explozie de râs autentic. Te invit să vizualizezi portofoliul meu.”
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="space-y-8 order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-normal text-white mb-6">Hey, eu sunt Fredi...</h2>
              <div className="text-zinc-400 leading-relaxed text-lg font-light space-y-6">
                <p>...fotograf de nuntă și evenimente din Oradea.</p>
                <p>
                  Fotografia nu este doar despre prezent. Cei care mă aleg știu că investesc în viitorul lor – în amintiri care, peste zeci de ani, vor fi și mai valoroase decât în ziua în care au fost create.
                </p>
                <p>
                  Îmi doresc ca fotografiile de nuntă făcute de mine, să fie mai mult decât simple imagini – să fie amintiri vii, care te transportă înapoi în acele clipe speciale.
                </p>
                <p>
                  Îmi place să fotografiez fără ca oamenii să simtă prea mult prezența mea. Nu îți voi cere să pozezi forțat și nu te voi pune în ipostaze nenaturale.
                </p>
              </div>
              
              {/* Desktop Buttons (Hidden on mobile) */}
              <div className="hidden lg:flex gap-4 pt-6">
                <Link to="/portofoliu" className="btn-primary">Explorează Portofoliu</Link>
                <button 
                  onClick={() => document.getElementById('servicii').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-outline"
                >
                  Serviciile mele
                </button>
              </div>
            </motion.div>
          </div>

          {/* Mobile Buttons (Shown ONLY on mobile, under everything else) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:hidden flex flex-col gap-4 pt-12 w-full max-w-sm mx-auto px-4"
          >
            <Link to="/portofoliu" className="btn-primary w-full text-center">Explorează Portofoliu</Link>
            <button 
              onClick={() => document.getElementById('servicii').scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline w-full text-center"
            >
              Serviciile mele
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="py-20 bg-zinc-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-5xl font-serif text-white mb-2">150+</div>
              <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Nunți și evenimente fotografiate</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="text-5xl font-serif text-white mb-2">15+</div>
              <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Ani de experiență</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="text-5xl font-serif text-white mb-2">400.000+</div>
              <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Fotografii realizate</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="text-5xl font-serif text-white mb-2 flex items-center justify-center gap-1">
                5.0 <Star className="fill-yellow-500 text-yellow-500" size={32} />
              </div>
              <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Rating de 5 stele pe Google</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Services Highlight with Background */}
      <section className="py-24 relative overflow-hidden scroll-mt-20" id="servicii">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/photo9.jpg" 
            alt="Services Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-4xl md:text-5xl font-serif font-normal text-white mb-16"
          >
            Ce pot face pentru tine
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: 'Fotografie de nunta', desc: 'Documentarea autentică a celei mai frumoase zile, captând fiecare emoție și detaliu prețios.' },
              { title: 'Fotografie si filmari promotionale', desc: 'Prezentări vizuale profesionale care pun într-o lumină impecabilă brandul sau afacerea ta.' },
              { title: 'Fotografie de brand', desc: 'Imagini strategice și estetice create special pentru a comunica valorile și personalitatea business-ului tău.' },
              { title: 'Boudoir', desc: 'Sesiuni foto artistice care celebrează feminitatea, senzualitatea și încrederea de sine într-un cadru privat.' },
              { title: 'Cabina foto', desc: 'Distracție garantată pentru invitați cu printuri instantanee și accesorii haioase, păstrând vibe-ul petrecerii.' }
            ].map((s, i) => (
              <motion.div 
                key={i} transition={{ delay: i * 0.1 }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="glass-panel p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all group flex flex-col h-full"
              >
                <h3 className="text-2xl font-serif font-normal text-white mb-6">{s.title}</h3>
                <p className="text-zinc-400 mb-8 font-light leading-relaxed flex-grow">{s.desc}</p>
                <Link to="/servicii" className="btn-outline group-hover:bg-white group-hover:text-black transition-all text-center">
                  Află detalii
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Guarantee Section */}
      <section className="py-24 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-b border-white/5 pb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative p-4"
            >
              <img src="./images/garantie.png" alt="Garantie" className="w-full max-w-sm mx-auto h-auto drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-serif text-white">Garanție 100% Satisfacție</h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed">
                Mă angajez să livrez nu doar fotografii, ci emoții reale care dăinuiesc. Fiecare detaliu și privire este surprinsă cu devotament, la cele mai înalte standarde artistice, pentru ca amintirile voastre să fie absolut impecabile. 
              </p>
              <p className="text-zinc-400 text-lg font-light leading-relaxed">
                Dacă nu ești mulțumit de calitatea serviciilor mele, vom lucra împreună până când rezultatul final va fi cel dorit de tine.
              </p>
            </motion.div>
          </div>
          <div className="mt-16 text-center">
            <Link to="/contact" className="btn-primary tracking-wider uppercase shadow-xl hover:scale-105 transition-transform">
              Solicită o ofertă
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Reviews Section with Background */}
      <section className="py-24 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/photo6.jpg" 
            alt="Reviews Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[4px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center text-white relative z-10">
          <div className="inline-flex items-center gap-2 bg-zinc-900/40 border border-white/10 px-6 py-3 rounded-full mb-8">
             <div className="flex text-yellow-500 gap-0.5">
               <Star size={18} className="fill-current" />
               <Star size={18} className="fill-current" />
               <Star size={18} className="fill-current" />
               <Star size={18} className="fill-current" />
               <Star size={18} className="fill-current" />
             </div>
             <span className="font-bold">5.0 Recenzii Google</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Ce spun clienții mei</h2>
          <p className="text-zinc-400">Povești reale din experiențele clienților. Glisează pentru a explora.</p>
        </div>
        
        <div className="relative group max-w-[100vw]">
          {/* Desktop Arrows */}
          <button 
            onClick={() => scrollReviews('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-zinc-900/60 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all hidden md:flex shadow-2xl backdrop-blur-md"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button 
            onClick={() => scrollReviews('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-zinc-900/60 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all hidden md:flex shadow-2xl backdrop-blur-md"
            aria-label="Next reviews"
          >
            <ChevronRight size={32} />
          </button>

          <div 
            ref={reviewsRef} 
            className="relative w-full overflow-x-auto py-10 px-4 md:px-20 no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            <div className="flex gap-6 w-max">
              {reviews.map((review, i) => (
                <div 
                  key={i} 
                  className="w-[350px] md:w-[450px] shrink-0 glass-panel p-10 rounded-[2.5rem] flex flex-col justify-between select-none border border-white/5 snap-center"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h4 className="font-bold text-white text-lg">{review.name}</h4>
                        <p className="text-xs text-zinc-500 mt-1">{review.time}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/5 text-white flex items-center justify-center font-serif text-2xl border border-white/10 uppercase">
                        {review.name[0]}
                      </div>
                    </div>
                    <div className="flex text-yellow-500 mb-6 gap-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-current" />)}
                    </div>
                    <p className="text-zinc-300 text-base italic leading-relaxed">"{review.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section className="py-24 bg-transparent" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-white mb-4">Unde ne găsești</h2>
            <div className="h-1 w-20 bg-white/20 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Area */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
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

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 md:p-12 glass-panel rounded-[2.5rem] space-y-8"
            >
              <div className="pb-6 border-b border-white/10">
                <p className="text-zinc-400 text-lg font-light leading-relaxed">
                  Ai întrebări sau vrei să programezi o ședință? Scrie-ne și îți răspundem imediat!
                </p>
              </div>

              {/* Form Integrated from Contact.jsx */}
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input type="text" id="name" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white placeholder:text-zinc-500 transition-all outline-none" placeholder="Nume și Prenume *" />
                  <input type="tel" id="phone" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white placeholder:text-zinc-500 transition-all outline-none" placeholder="Telefon *" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input type="email" id="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white placeholder:text-zinc-500 transition-all outline-none" placeholder="Email" />
                  <input type="date" id="date" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white transition-all outline-none" />
                </div>

                <select id="eventType" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white transition-all outline-none appearance-none">
                  <option value="" className="bg-zinc-900">Alege tipul de eveniment...</option>
                  <option value="nunta" className="bg-zinc-900">Nuntă</option>
                  <option value="botez" className="bg-zinc-900">Botez</option>
                  <option value="sedinta" className="bg-zinc-900">Ședință Foto</option>
                </select>

                <textarea id="message" rows="3" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white placeholder:text-zinc-500 transition-all outline-none resize-none" placeholder="Mesajul tău *"></textarea>

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
      </section>

      {/* 8. Blog Highlight Section */}
      <section className="py-24 bg-zinc-900/10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-normal text-white mb-16">Cel mai nou pe blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, i) => (
              <motion.article 
                key={post.id} transition={{ delay: i * 0.1 }}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="glass-panel overflow-hidden rounded-3xl flex flex-col group h-full border border-white/5 hover:border-white/20 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-grow text-left">
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 font-bold">{post.category}</p>
                  <h3 className="text-xl font-serif font-normal text-white mb-4 line-clamp-2">{post.title}</h3>
                  <Link to={`/blog/${post.id}`} className="mt-auto text-white flex items-center gap-2 font-medium hover:gap-3 transition-all">
                    Citește articol <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-16">
            <Link to="/blog" className="btn-outline">Toate articolele</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
