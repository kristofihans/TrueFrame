import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  CheckCircle, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Camera, 
  Mail, 
  Calendar, 
  ArrowLeft,
  Sparkles,
  Heart,
  Users,
  Compass,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const reviews = [
  { name: 'Fischer Nikolett', time: '4 months ago', text: 'Fotografii superbe! Este foarte răbdător și amabil, dacă nu ai destulă încredere la pozat, el este alegerea perfectă pentru că te ajută extrem de mult! Într-o singură oră s-au făcut o mulțime de poze care vor rămâne cu noi pentru o viață întreagă! 🥰' },
  { name: 'Dalma Lukács', time: '2 years ago', text: 'Pot scrie doar cuvinte de laudă despre Frédi! Precis, de încredere, răbdător și lista poate continua! Am avut deja ocazia de mai multe ori să mă aflu în fața camerei sale, fie singură, fie cu partenerul meu, iar rezultatul a fost întotdeauna impecabil! Îl recomand cu căldură tuturor!' },
  { name: 'Boglárka Kovács', time: '8 months ago', text: 'Pur și simplu nu ne găsim cuvintele pentru a exprima cât de recunoscători suntem fotografului nostru fantastic, care a imortalizat una dintre cele mai frumoase zile din viața noastră, nu doar la nuntă, ci și la ședința foto de a doua zi! 🥹📸' },
  { name: 'Emese Fuzesi', time: '2 years ago', text: 'Recunoștință și mulțumiri, Feri! 🥰 Mereu spuneam că ești un magician... și chiar așa este! Fiecare fotografie a ta spune o poveste... surprinzi întotdeauna cele mai intime momente și te joci cu lumina cum nu o face nimeni! Te recomand cu toată încrederea oricui, pentru că munca ta nu m-a dezamăgit niciodată!👌🏻😊' },
  { name: 'Krisztina Pap', time: '9 months ago', text: 'Suntem extrem de recunoscători că ai imortalizat cununia noastră civilă și botezul bebelușului nostru. Este un sentiment minunat să retrăim aceste momente surprinse cu atâta profesionalism. Nu ești doar un fotograf talentat, ci și un om deosebit...' },
  { name: 'Iulia Bortis', time: '2 weeks ago', text: 'Am avut o experienta placuta in a colabora cu Ferenc, fotograful nostru de botez. Profesional, atent, talentat, a surprins momentele importante ale evenimentului. Pozele sunt frumoase, de o calitate foarte buna. Recomand cu incredere!' },
  { name: 'Eszter Ujvárosi', time: '1 year ago', text: 'Am avut norocul să lucrăm cu Balajti Ferenc la nunta noastră, și nu am putea fi mai mulțumiți de alegerea făcută! Este un adevărat artist, iar ceea ce face el este, fără îndoială, artă pură. Fotografiile au ieșit absolut minunate...' },
  { name: 'Krisztina Kovacs', time: '4 months ago', text: 'Domnu Balajti Ferenc a fost recomandat de la o cunostinta. De la inceput a fost foarte amabil si super profesional! Ne-a ajutat foarte multe.' },
  { name: 'Evelyn Nagy', time: '1 year ago', text: 'Am avut plăcerea de a colabora cu Frédi la nunta noastră, și nu am putea fi mai mulțumiți de rezultat! Fotografiile sunt absolut superbe, surprinzând perfect emoțiile și momentele speciale ale zilei noastre. Profesionalismul, creativitatea și atenția la detalii ne-au impresionat cu adevărat. Ne-am simțit în largul nostru pe tot parcursul zilei și asta se vede în fotografii. Recomandăm cu încredere pe Frédi tuturor celor care își doresc amintiri de neuitat! 🤍' },
  { name: 'Reka Kiss', time: '10 months ago', text: 'Am avut onoarea ca acest fotogarf talentat să surprindă cele mai emoționante momente de la botezul băiețelului nostru – și nu putem fi mai recunoscători pentru alegerea făcută! 🙏' },
  { name: 'Claudiu Farcalau (Clauux)', time: '2 years ago', text: 'Recomand pe Freddy cu cel mai mare drag. Un mod de a face poze foarte profesionist dar și cu umor pentru a te face cat mai relaxat în timpul ședinței și a avea cele mai bune rezultate. Mai jos am atașat câteva poze cu partenera și singur pentru a vă face o idee.' }
];

const weddingFaqs = [
  {
    question: "AI ȘI SERVICII VIDEO? / FILMEZI LA NUNȚI?",
    answer: "Nu ofer servicii de filmare la nunți, însă colaborez de mult timp cu videografi pe care îi recomand cu toată încrederea, pentru că știu că fac o treabă excelentă. Dacă vă doriți și filmare, spuneți-mi și vă ofer datele lor de contact."
  },
  {
    question: "CUM PRIMIM FOTOGRAFIILE?",
    answer: "Fotografiile sunt livrate printr-o galerie online. Puteți trimite linkul invitaților, rudelor și prietenilor, astfel încât să își poată descărca și ei fotografiile. (Linkul de descărcare este disponibil timp de 6 luni.)"
  },
  {
    question: "CE ESTE UN MOODBOARD? / LA CE FOLOSEȘTE?",
    answer: "Un moodboard este o colecție de imagini inspiraționale (pe care o realizăm împreună), care ilustrează atmosfera și stilul nunții pe care vi le imaginați. Vă ajută să adunați și să armonizați ideile, pentru a vedea mai clar direcția în care doriți să mergeți. Nu trebuie ca fiecare detaliu să arate exact așa – important este să ofere o imagine de ansamblu a ceea ce vă doriți."
  },
  {
    question: "CÂT ESTE AVANSUL?",
    answer: "Puteți rezerva data nunții prin achitarea unui avans la semnarea contractului. Avansul este de 200 de euro."
  },
  {
    question: "CE SE ÎNTÂMPLĂ DACĂ CUNUNIA CIVILĂ ARE LOC ÎN ALTĂ ZI?",
    answer: "Încerc să fiu cât mai flexibil, iar dacă alegeți unul dintre pachetele Essential Plus, Gold sau Diamond, pot fi prezent fără costuri suplimentare și la cununia civilă organizată într-o altă zi. Stabilim, bineînțeles, data din timp, pentru a mă asigura că nu am un alt eveniment atunci."
  },
  {
    question: "CE E SHOOTINGUL AFTER WEDDING / TRASH THE DRESS?",
    answer: "Este o ședință foto creativă, realizată după nuntă, într-o altă zi. Această ședință este dedicată doar vouă și poate dura chiar câteva ore, pentru a obține cele mai reușite fotografii. Marele avantaj este că îi putem dedica aproape oricât timp dorim și nu suntem limitați nici în alegerea locației."
  },
  {
    question: "CE ÎNSEAMNĂ ȘEDINȚA FOTO SAVE THE DATE / DE LOGODNĂ?",
    answer: "Această ședință foto are loc înainte de nuntă, iar scopul ei principal este să realizăm o serie frumoasă de fotografii cu voi, prin care să vă anunțați nunta. În plus, ne ajută să ne obișnuim unii cu alții și să vă simțiți confortabil în fața aparatului foto, care vă va însoți pe tot parcursul zilei nunții."
  }
];

const collaborationSteps = [
  {
    step: "01",
    title: "Primul contact & Verificarea datei",
    desc: "Ne auzim la un telefon sau mesaj pentru a verifica dacă data voastră este disponibilă și pentru a povesti despre viziunea evenimentului."
  },
  {
    step: "02",
    title: "Întâlnirea & Rezervarea",
    desc: "Ne cunoaștem (la o cafea sau online), stabilim detaliile, semnăm contractul și achitați avansul de 200€ pentru a bloca data în calendar."
  },
  {
    step: "03",
    title: "Moodboard & Planificarea programului",
    desc: "Vă ajut să creați un moodboard inspirațional și să planificăm orele pe parcursul zilei, astfel încât să nu fiți pe fugă și să aveți timp pentru tot ce contează."
  },
  {
    step: "04",
    title: "Ziua nunții & Livrarea amintirilor",
    desc: "În ziua cea mare sunteți relaxați și vă bucurați de fiecare clipă. La câteva zile primiți o selecție rapidă de preview, iar ulterior galeria completă online privată."
  }
];

export default function FotografieNunta() {
  const reviewsRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('Pachetul GOLD');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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

  const handleSelectPackage = (pkgName) => {
    setSelectedPackage(pkgName);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full font-sans text-zinc-100 bg-zinc-950">
      
      {/* Hero Section */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex flex-col justify-end items-center overflow-hidden pt-40 pb-16 md:pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/backgrounds/Fotografienuntaservicii.webp" 
            alt="Fotografie de nuntă Oradea" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full space-y-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-2 text-sm uppercase tracking-widest font-bold group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Acasă
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
          >
            Fotografie de Nuntă
          </motion.h1>
          <p className="text-zinc-300 text-lg md:text-xl font-light max-w-2xl mx-auto drop-shadow-md">
            Momente autentice, emoții reale și amintiri care rămân vii pentru totdeauna.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="#pachete" className="btn-primary font-medium tracking-wide uppercase">
              Vezi Pachetele Foto
            </a>
            <a href="#contact" className="btn-outline bg-black/40 backdrop-blur-sm hover:!bg-black/60 font-medium tracking-wide uppercase">
              Solicită Ofertă
            </a>
          </div>
        </div>
      </section>

      {/* 1. Main Description + CTA ("Povestea și Viziunea Mea") */}
      <section className="py-24 relative bg-zinc-950 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Viziunea fotografică</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-white leading-tight">
                  Povestea și Viziunea Mea
                </h2>
                <div className="h-1 w-20 bg-white/20 rounded-full" />
              </div>

              <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
                Fiecare nuntă este o poveste unică, iar misiunea mea este să o spun într-un mod cât mai natural și emoționant. De la primele momente ale pregătirilor, pline de nerăbdare, până la energia debordantă a petrecerii, sunt acolo pentru a surprinde esența zilei voastre.
              </p>
              
              <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                Stilul meu este documentar, intervenind cât mai puțin pentru a lăsa momentele să se desfășoare de la sine, rezultând amintiri care vor dăinui o viață întreagă.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary font-medium tracking-wide uppercase">
                  Solicită ofertă
                </a>
                <a href="#pachete" className="btn-outline font-medium tracking-wide uppercase">
                  Consultă pachetele
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl glass-panel p-2">
                <img 
                  src="./images/photo1.jpg" 
                  alt="Momente nuntă" 
                  className="w-full h-full object-cover rounded-[2rem]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Cum vom colabora? - 4 steps */}
      <section className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/herobackground.jpg" 
            alt="Cum vom colabora" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-3 block">Ghidul tău</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Cum vom colabora?</h2>
            <p className="text-zinc-400 text-lg font-light">
              Un proces clar, deschis și relaxat, gândit pentru ca voi să vă bucurați din plin de fiecare clipă a zilei.
            </p>
            <div className="h-1 w-20 bg-white/20 mx-auto rounded-full mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collaborationSteps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="text-4xl font-serif text-zinc-500/50 group-hover:text-white/80 transition-colors font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-serif text-white mb-4 leading-snug">{item.title}</h3>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500 font-semibold group-hover:text-white transition-colors">
                  <Check size={14} className="text-white" /> Pasul {item.step}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Fotograful tau de nunta (Fredi) */}
      <section className="py-24 bg-zinc-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image on left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 glass-panel p-2 max-w-md mx-auto">
                <img 
                  src="./images/photographerimage.jpg" 
                  alt="Balajti Ferenc (Frédi) - Fotograf de nuntă" 
                  className="w-full h-full object-cover rounded-[2rem]"
                />
              </div>
            </motion.div>

            {/* Text on right */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-2"
            >
              <div className="space-y-4">
                <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Despre mine</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                  Fotograful tău de nuntă
                </h2>
                <div className="h-1 w-20 bg-white/20 rounded-full" />
              </div>

              <div className="text-zinc-300 leading-relaxed text-lg font-light space-y-6">
                <p>
                  Mă numesc <strong className="text-white font-medium">Balajti Ferenc</strong>, dar cei mai mulți îmi spun <strong className="text-white font-medium">Frédi</strong>, și fotografiez nunți din 2012. Cu experiența acumulată la sute de nunți, vă pot ajuta nu doar cu fotografiile, ci și cu planificarea evenimentului.
                </p>
                <p>
                  Încă dinaintea nunții vă ajut să creați un moodboard, să planificați programul și să stabiliți orele, astfel încât să nu fiți pe fugă și să aveți timp pentru fiecare moment important.
                </p>
                <p>
                  Iar în ziua cea mare vă ajut să vă simțiți relaxați și în largul vostru, astfel încât să vă bucurați pur și simplu de momentele pe care eu le surprind.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary uppercase tracking-wide">
                  Hai să ne cunoaștem
                </a>
                <Link to="/portofoliu" className="btn-outline uppercase tracking-wide">
                  Vezi portofoliul
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Stats (same as on homepage) */}
      <section className="py-20 bg-zinc-900/30 border-b border-white/5">
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
              <div className="h-12 flex items-center justify-center mb-2">
                <img 
                  src="./images/selectia-editorilor-mentiune-alb.png" 
                  alt="Selecția Editorilor" 
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Selecția Editorilor 2026</p>
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

      {/* 5. Reviews + CTA (same as on homepage) */}
      <section className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/backgrounds/cespunclientii.webp" 
            alt="Reviews Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
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
          <p className="text-zinc-400">Povești reale din experiențele mirilor. Glisează pentru a explora.</p>
        </div>
        
        <div className="relative group max-w-[100vw]">
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

        <div className="mt-8 text-center relative z-10">
          <a href="#contact" className="btn-primary uppercase tracking-wide">
            Solicită ofertă
          </a>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 bg-transparent border-b border-white/5 scroll-mt-20" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-3 block">Răspunsuri utile</span>
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-white mb-4">Întrebări Frecvente</h2>
            <p className="text-zinc-400 max-w-xl mx-auto font-light">Tot ce trebuie să știi despre colaborare, livrare, pachete și ședințe foto.</p>
            <div className="h-1 w-20 bg-white/20 mx-auto rounded-full mt-6" />
          </div>

          <div className="space-y-4">
            {weddingFaqs.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="glass-panel rounded-[1.8rem] border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/15"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none transition-colors"
                  >
                    <span className="text-lg md:text-xl font-serif text-white pr-4">{item.question}</span>
                    <div className={`p-2 rounded-full bg-white/5 text-white/80 border border-white/10 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-white/10 text-white' : ''}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 text-zinc-400 font-light leading-relaxed text-base border-t border-white/5 pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Guarantee Section (Updated text) */}
      <section className="py-24 bg-zinc-900/20 border-b border-white/5">
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
              <p className="text-zinc-300 text-lg font-light leading-relaxed mb-4">
                Dacă nu prestez un serviciu asumat în condițiile convenite în prealabil, voi face mai întâi tot posibilul să remediez problema. Dacă acest lucru nu este posibil, voi rambursa contravaloarea serviciului respectiv.
              </p>
              <p className="text-zinc-400 text-lg font-light leading-relaxed">
                Desigur, garanția nu se aplică aprecierilor subiective asupra fotografiilor – munca de creație nu este o știință exactă. În schimb, îmi asum să respect tot ceea ce am promis.
              </p>
            </motion.div>
          </div>
          <div className="mt-16 text-center">
            <a href="#contact" className="btn-primary tracking-wider uppercase shadow-xl hover:scale-105 transition-transform">
              Solicită o ofertă
            </a>
          </div>
        </div>
      </section>

      {/* 8. Pachete Foto (4 packs matching the screenshot) */}
      <section className="relative lg:min-h-screen lg:flex lg:flex-col lg:justify-center py-10 lg:py-6 xl:py-8 bg-zinc-950 border-b border-white/5 scroll-mt-14" id="pachete">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="text-center mb-4 lg:mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white">Pachete Foto de Nuntă</h2>
            <p className="text-zinc-400 text-xs md:text-sm font-light mt-1 max-w-xl mx-auto">
              Alege pachetul potrivit pentru a vă asigura amintiri complete și fără stres.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 items-stretch max-w-6xl mx-auto">
            
            {/* 1. ESSENTIALS */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-xl border border-white/10 group transition-all duration-300 hover:-translate-y-1 bg-[#ede6de]">
              {/* Photo Header */}
              <div className="relative h-32 sm:h-36 lg:h-36 xl:h-44 overflow-hidden bg-zinc-900">
                <img 
                  src="./images/01.webp" 
                  alt="Pachet Essentials" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute top-3 inset-x-0 text-center">
                  <h3 className="font-serif text-lg xl:text-xl tracking-widest text-white uppercase drop-shadow-md">
                    ESSENTIALS
                  </h3>
                </div>
              </div>

              {/* Cream Card Body */}
              <div className="bg-[#ede6de] text-[#3d3832] p-4 xl:p-5 flex flex-col justify-between flex-grow">
                <div className="space-y-1.5 text-xs xl:text-[13px] font-normal leading-snug">
                  <p className="flex items-start gap-1.5">
                    <span className="text-[#8c7b6d] font-bold">•</span>
                    <span>8 ore de prezență la eveniment</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-[#8c7b6d] font-bold">•</span>
                    <span>Fotografierea pregătirilor</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-[#8c7b6d] font-bold">•</span>
                    <span>Fotografierea cununiei civile</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-[#8c7b6d] font-bold">•</span>
                    <span>Fotografierea cununiei religioase</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-[#8c7b6d] font-bold">•</span>
                    <span>Fotografierea petrecerii (până la tort)</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-[#8c7b6d] font-bold">•</span>
                    <span>300–450 fotografii editate cu AI</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#c5b8aa]">
                  <div className="text-xl xl:text-2xl font-bold font-sans text-center text-[#3d3832] tracking-tight">
                    600 EURO
                  </div>
                  <button 
                    onClick={() => handleSelectPackage('Pachetul ESSENTIALS')}
                    className="w-full mt-2.5 py-2 rounded-full border border-[#8c7b6d] text-[#3d3832] text-[11px] uppercase font-bold tracking-wider hover:bg-[#8c7b6d] hover:text-white transition-colors text-center"
                  >
                    Alege Pachetul
                  </button>
                </div>
              </div>
            </div>

            {/* 2. ESSENTIALS PLUS */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-xl border border-white/10 group transition-all duration-300 hover:-translate-y-1 bg-[#ede6de]">
              {/* Photo Header */}
              <div className="relative h-32 sm:h-36 lg:h-36 xl:h-44 overflow-hidden bg-zinc-900">
                <img 
                  src="./images/02.webp" 
                  alt="Pachet Essentials Plus" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute top-2.5 inset-x-0 text-center">
                  <h3 className="font-serif text-lg xl:text-xl tracking-widest text-white uppercase drop-shadow-md leading-tight">
                    ESSENTIALS<br/>PLUS
                  </h3>
                </div>
              </div>

              {/* Cream Card Body */}
              <div className="bg-[#ede6de] text-[#3d3832] p-4 xl:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="text-center font-bold text-[10px] uppercase tracking-wider text-[#574d44] mb-2 leading-tight">
                    ESSENTIALS +
                  </div>
                  <div className="space-y-1.5 text-xs xl:text-[13px] font-normal leading-snug">
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>9 ore de prezență <strong>(în total)</strong></span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>Ședință foto cuplu (30 min)</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>Selecție și editare manuală</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>500–650 fotografii editate</span>
                    </p>
                    <div className="pt-1 font-bold text-[#574d44] text-[10px] uppercase tracking-wider">
                      Bonus:
                    </div>
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>Realizarea unui moodboard</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>Planificarea programului</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#c5b8aa]">
                  <div className="text-xl xl:text-2xl font-bold font-sans text-center text-[#3d3832] tracking-tight">
                    990 EURO
                  </div>
                  <button 
                    onClick={() => handleSelectPackage('Pachetul ESSENTIALS PLUS')}
                    className="w-full mt-2.5 py-2 rounded-full border border-[#8c7b6d] text-[#3d3832] text-[11px] uppercase font-bold tracking-wider hover:bg-[#8c7b6d] hover:text-white transition-colors text-center"
                  >
                    Alege Pachetul
                  </button>
                </div>
              </div>
            </div>

            {/* 3. GOLD ** (Highlighted Card) */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d6ba9e] group transition-all duration-300 hover:-translate-y-1.5 relative bg-[#998471]">
              <div className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded-full">
                Popular
              </div>

              {/* Photo Header */}
              <div className="relative h-32 sm:h-36 lg:h-36 xl:h-44 overflow-hidden bg-zinc-900">
                <img 
                  src="./images/hero_nunta.jpg" 
                  alt="Pachet Gold" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute top-3 inset-x-0 text-center">
                  <h3 className="font-serif text-lg xl:text-xl tracking-widest text-white uppercase drop-shadow-md">
                    GOLD **
                  </h3>
                </div>
              </div>

              {/* Taupe/Brown Card Body */}
              <div className="bg-[#998471] text-white p-4 xl:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="text-center font-bold text-[10px] uppercase tracking-wider text-white/90 mb-2 leading-tight">
                    ESSENTIALS PLUS +
                  </div>
                  <div className="space-y-1.5 text-xs xl:text-[13px] font-normal leading-snug text-white/95">
                    <p className="flex items-start gap-1.5">
                      <span className="text-white font-bold">•</span>
                      <span>12 ore de prezență <strong>(în total)</strong></span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-white font-bold">•</span>
                      <span>700–850 fotografii editate</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-white font-bold">•</span>
                      <span>Ședință foto After Wedding</span>
                    </p>
                    <div className="pt-1 font-bold text-white text-[10px] uppercase tracking-wider">
                      Bonus:
                    </div>
                    <p className="flex items-start gap-1.5">
                      <span className="text-white font-bold">•</span>
                      <span>reducere <strong>20 euro</strong> photobooth</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/20">
                  <div className="text-xl xl:text-2xl font-bold font-sans text-center text-white tracking-tight">
                    1200 EURO
                  </div>
                  <p className="text-[10px] text-center text-white/80 font-light mt-0.5 italic">
                    **80% dintre cupluri aleg GOLD
                  </p>
                  <button 
                    onClick={() => handleSelectPackage('Pachetul GOLD')}
                    className="w-full mt-2.5 py-2 rounded-full bg-white text-[#998471] text-[11px] uppercase font-bold tracking-wider hover:bg-zinc-100 transition-colors text-center shadow-lg"
                  >
                    Alege Pachetul
                  </button>
                </div>
              </div>
            </div>

            {/* 4. DIAMOND */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-xl border border-white/10 group transition-all duration-300 hover:-translate-y-1 bg-[#ede6de]">
              {/* Photo Header */}
              <div className="relative h-32 sm:h-36 lg:h-36 xl:h-44 overflow-hidden bg-zinc-900">
                <img 
                  src="./images/03.webp" 
                  alt="Pachet Diamond" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute top-3 inset-x-0 text-center">
                  <h3 className="font-serif text-lg xl:text-xl tracking-widest text-white uppercase drop-shadow-md">
                    DIAMOND
                  </h3>
                </div>
              </div>

              {/* Cream Card Body */}
              <div className="bg-[#ede6de] text-[#3d3832] p-4 xl:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="text-center font-bold text-[10px] uppercase tracking-wider text-[#574d44] mb-2 leading-tight">
                    GOLD +
                  </div>
                  <div className="space-y-1.5 text-xs xl:text-[13px] font-normal leading-snug">
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>Ședință Save the Date</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>800–950 fotografii editate</span>
                    </p>
                    <div className="pt-1 font-bold text-[#574d44] text-[10px] uppercase tracking-wider">
                      Bonus:
                    </div>
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>2 ore de photobooth</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#c5b8aa]">
                  <div className="text-xl xl:text-2xl font-bold font-sans text-center text-[#3d3832] tracking-tight">
                    1450 EURO
                  </div>
                  <button 
                    onClick={() => handleSelectPackage('Pachetul DIAMOND')}
                    className="w-full mt-2.5 py-2 rounded-full border border-[#8c7b6d] text-[#3d3832] text-[11px] uppercase font-bold tracking-wider hover:bg-[#8c7b6d] hover:text-white transition-colors text-center"
                  >
                    Alege Pachetul
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-4 lg:mt-6 text-center">
            <p className="text-zinc-500 text-[11px] font-light italic">
              * Toate pachetele pot fi adaptate și personalizate în funcție de programul și dorințele unice ale evenimentului vostru.
            </p>
          </div>

        </div>
      </section>

      {/* 9. Formular (Contact Section) */}
      <section className="py-24 relative overflow-hidden" id="contact">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/backgrounds/haisanecunoastemmaibine.webp" 
            alt="Contact Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-white mb-4">Hai să ne cunoaștem mai bine</h2>
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

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <select 
                    id="eventType" 
                    defaultValue="Fotografie de nuntă"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white transition-all outline-none appearance-none"
                  >
                    <option value="Fotografie de nuntă" className="bg-zinc-900">Fotografie de nuntă</option>
                    <option value="Botez" className="bg-zinc-900">Botez</option>
                    <option value="Boudoir" className="bg-zinc-900">Boudoir</option>
                    <option value="Închiriere cabină foto (photobooth)" className="bg-zinc-900">Închiriere cabină foto (photobooth)</option>
                    <option value="Fotografie/filmare promoțională" className="bg-zinc-900">Fotografie/filmare promoțională</option>
                    <option value="Fotografie de brand" className="bg-zinc-900">Fotografie de brand</option>
                  </select>

                  <select 
                    id="pachet" 
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white transition-all outline-none appearance-none"
                  >
                    <option value="Pachetul ESSENTIALS" className="bg-zinc-900">Pachetul ESSENTIALS (600€)</option>
                    <option value="Pachetul ESSENTIALS PLUS" className="bg-zinc-900">Pachetul ESSENTIALS PLUS (990€)</option>
                    <option value="Pachetul GOLD" className="bg-zinc-900">Pachetul GOLD (1200€) - Recomandat</option>
                    <option value="Pachetul DIAMOND" className="bg-zinc-900">Pachetul DIAMOND (1450€)</option>
                    <option value="Personalizat" className="bg-zinc-900">Pachet Personalizat</option>
                  </select>
                </div>

                <textarea id="message" rows="3" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white placeholder:text-zinc-500 transition-all outline-none resize-none" placeholder="Scrie-mi pe scurt despre evenimentul/proiectul tău"></textarea>

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
                  className="inline-flex items-center gap-2 md:gap-3 bg-green-600/90 hover:bg-green-600 text-white px-6 py-3.5 md:px-10 md:py-5 rounded-full text-base md:text-xl font-bold transition-all shadow-[0_10px_30px_rgba(22,163,74,0.15)] w-full justify-center group"
                >
                  <MessageCircle size={20} className="w-5 h-5 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
                  Contactează-mă pe WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}

