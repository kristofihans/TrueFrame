import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  MessageCircle, 
  Camera, 
  Mail, 
  Calendar, 
  ArrowLeft,
  Sparkles,
  Heart,
  Shield,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const reviews = [
  { 
    name: 'L. Dalma', 
    role: 'Clientă Boudoir', 
    text: 'Frédi este un fotograf extraordinar, care reușește să scoată tot ce este mai frumos din persoana fotografiată, chiar și acel „ceva” special. Este foarte atent la detalii, atât înainte, cât și în timpul ședinței foto. Pentru mine, fiecare ședință foto este o experiență diferită, iar acele câteva ore trec într-o atmosferă foarte plăcută și prietenoasă. Îl recomand cu încredere oricărei fete, indiferent de starea de spirit sau de personalitatea ei.' 
  },
  { 
    name: 'B. Timi', 
    role: 'Clientă Boudoir', 
    text: 'Datorită fotografiilor realizate de Frédi, mi-am descoperit cu adevărat feminitatea și latura senzuală. Mi-a plăcut enorm că, în timpul ședințelor foto, eu eram în centrul atenției. Frédi a fost mereu atent la mine, iar acest lucru se vede și în fotografii, pentru care am primit o mulțime de aprecieri. Ședințele foto au scos la iveală partea mea sexy, pe care nici eu nu o cunoșteam cu adevărat. De când am fotografiat împreună de mai multe ori, am învățat să îmi accept și să îmi arăt corpul cu mult mai mult curaj. Sunt mai încrezătoare în mine, inclusiv în prezența bărbaților, știu cum arăt și nu mai simt nevoia să îmi ascund corpul.' 
  },
  { 
    name: 'Clientă Anonimă', 
    role: 'Clientă Boudoir', 
    text: 'Parcă nici nu-mi vine să cred că eu sunt în poze! Credeam că vor ieși doar câteva fotografii frumoase, dar îmi plac atât de multe! Pentru mine, experiența asta e o motivație uriașă. Dacă ajung la greutatea pe care mi-o doresc, sigur mai facem o ședință. Dar dacă rămân așa cum sunt, e la fel de bine. Pozele mă avantajează și îmi plac enorm! Cu siguranță o să mă uit la ele de multe ori!' 
  }
];

const collaborationSteps = [
  {
    step: "01",
    title: "Ne cunoaștem",
    desc: "Discutăm despre ideile tale, stilul fotografiilor pe care ți le dorești și ce te face să te simți confortabil. Alegem împreună pachetul potrivit și stabilim data ședinței."
  },
  {
    step: "02",
    title: "Ne pregătim",
    desc: "Stabilim atmosfera ședinței, alegem ținutele și discutăm toate detaliile. Îți ofer sfaturi și inspirație, astfel încât să vii pregătită și fără emoții inutile."
  },
  {
    step: "03",
    title: "Trăiești experiența",
    desc: "În timpul ședinței, te ghidez pas cu pas, de la poziții până la cele mai mici detalii. Totul se desfășoară într-o atmosferă relaxată, în ritmul tău."
  },
  {
    step: "04",
    title: "Primești fotografiile",
    desc: "Editez cu atenție fotografiile, iar tu îți alegi fotografiile preferate, după care le primești într-o galerie online privată, gata să le admiri ori de câte ori dorești."
  }
];

const boudoirFaqs = [
  {
    question: "1. NU AM MAI FĂCUT NICIODATĂ O ȘEDINȚĂ BOUDOIR. ESTE O PROBLEMĂ?",
    answer: "Absolut deloc! Majoritatea persoanelor nu au experiență în fața camerei. Nu trebuie să știi să pozezi, pentru că te voi ghida pas cu pas și te voi ajuta să găsim pozițiile și unghiurile care te avantajează."
  },
  {
    question: "2. CE AR TREBUI SĂ PORT LA ȘEDINȚA FOTO?",
    answer: "Alegerea ținutelor depinde de stilul fotografiilor pe care ți le dorești. Poți opta pentru lenjerie intimă, un body, o cămașă, un halat sau chiar un pulover larg. Cel mai important este să alegi ceva în care te simți frumoasă și confortabilă. Înainte de ședință, vom discuta despre ținute și îți voi oferi câteva sugestii."
  },
  {
    question: "3. POATE VENI CINEVA CU MINE LA ȘEDINȚA FOTO?",
    answer: "Bineînțeles! Poți veni însoțită de o singură persoană. Chiar îți recomand să alegi pe cineva apropiat, cu care te simți în largul tău și poți râde din toată inima. Prezența ei te poate ajuta să te relaxezi, să te simți mai încrezătoare și să te bucuri și mai mult de experiență."
  },
  {
    question: "4. TREBUIE SĂ PLĂTESC AVANS?",
    answer: "Dacă te-ai hotărât, îți poți asigura locul prin achitarea unui avans de 50 euro. Deoarece realizez un număr limitat de ședințe boudoir, rezervarea este confirmată doar după plata avansului."
  },
  {
    question: "5. FOTOGRAFIILE MELE VOR FI PUBLICATE?",
    answer: "Nu, fără acordul tău explicit. Confidențialitatea este foarte importantă pentru mine. Fotografiile tale nu vor fi publicate pe site, pe rețelele sociale sau folosite în portofoliul meu fără permisiunea ta. Tu decizi dacă dorești să le păstrezi doar pentru tine sau dacă îmi permiți să public anumite imagini."
  },
  {
    question: "6. CUM ALEG FOTOGRAFIILE FINALE?",
    answer: "După ședință, vei primi acces la o galerie privată de selecție, unde vei putea alege fotografiile preferate. Numărul fotografiilor incluse depinde de pachetul ales. Dacă îți plac mai multe imagini, poți comanda fotografii suplimentare."
  },
  {
    question: "7. CUM VOI PRIMI FOTOGRAFIILE?",
    answer: "Fotografiile finale vor fi livrate printr-o galerie online privată, securizată cu un cod PIN, de unde le vei putea descărca la rezoluție înaltă. Dacă alegi pachetul Full Experience (Signature), vei primi și un album foto premium, cu fotografiile tale preferate."
  }
];

const boudoirPackages = [
  { id: 'Pachetul NATURAL', name: 'Natural', price: '€149' },
  { id: 'Pachetul STUDIO ESSENTIALS', name: 'Studio Essentials', price: '€199' },
  { id: 'Pachetul FULL EXPERIENCE', name: 'Full Experience', price: '€349' },
  { id: 'Personalizat', name: 'Personalizat / Altul', price: null }
];

export default function Boudoir() {
  const reviewsRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('Pachetul FULL EXPERIENCE');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollReviews = (direction) => {
    if (!reviewsRef.current) return;
    const cardWidth = window.innerWidth < 768 ? 340 + 24 : 450 + 24;
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

  const scrollToSection = (e, id) => {
    if (e && e.preventDefault) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full font-sans text-zinc-100 bg-zinc-950">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex flex-col justify-end items-center overflow-hidden pt-40 pb-16 md:pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/boudoir photos for site/00HERO.jpg" 
            alt="Boudoir Experience Oradea" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/30" />
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
            Boudoir Experience
          </motion.h1>

          <p className="text-zinc-300 text-lg md:text-xl font-light max-w-2xl mx-auto drop-shadow-md">
            O experiență dedicată feminității și încrederii în tine.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a 
              href="#pachete" 
              onClick={(e) => scrollToSection(e, 'pachete')}
              className="btn-primary font-medium tracking-wide uppercase"
            >
              Vezi Pachetele Foto
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="btn-outline bg-black/40 backdrop-blur-sm hover:!bg-black/60 font-medium tracking-wide uppercase"
            >
              Solicită Ofertă
            </a>
          </div>
        </div>
      </section>

      {/* 2. Introducere: O experiență dedicată feminității și încrederii în tine */}
      <section className="py-24 relative bg-zinc-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8 order-1">
              <div className="space-y-4">
                <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Concept & Viziune</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-white leading-tight">
                  O experiență dedicată feminității și încrederii în tine.
                </h2>
                <div className="h-1 w-20 bg-white/20 rounded-full" />
              </div>

              <div className="space-y-5 text-zinc-300 font-light leading-relaxed">
                <p className="text-lg md:text-xl text-zinc-200">
                  Nu trebuie să fii model sau să ai un corp „perfect” pentru a te simți frumoasă.
                </p>
                <p className="text-base md:text-lg text-zinc-300">
                  O ședință boudoir este ocazia de a te redescoperi și de a te vedea cu alți ochi. Eu te voi ghida pas cu pas, într-o atmosferă relaxată, în care să te simți confortabil și încrezătoare.
                </p>
                <p className="text-xl md:text-2xl text-white font-serif italic pt-3 border-l-2 border-[#8c7b6d] pl-4">
                  „Tu trebuie doar să fii tu.”
                </p>
              </div>

              {/* Desktop Buttons */}
              <div className="pt-2 hidden lg:flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="btn-primary font-medium tracking-wide uppercase"
                >
                  Solicită ofertă
                </a>
                <a 
                  href="#pachete" 
                  onClick={(e) => scrollToSection(e, 'pachete')}
                  className="btn-outline font-medium tracking-wide uppercase"
                >
                  Consultă pachetele
                </a>
              </div>
            </div>

            <div className="order-2 space-y-6">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl max-w-md mx-auto border border-white/5">
                <img 
                  src="./images/boudoir photos for site/01text photo.jpg" 
                  alt="Boudoir Experience Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Mobile Buttons */}
              <div className="lg:hidden flex flex-col sm:flex-row gap-4 pt-2 max-w-md mx-auto">
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="btn-primary font-medium tracking-wide uppercase text-center w-full sm:w-auto"
                >
                  Solicită ofertă
                </a>
                <a 
                  href="#pachete" 
                  onClick={(e) => scrollToSection(e, 'pachete')}
                  className="btn-outline font-medium tracking-wide uppercase text-center w-full sm:w-auto"
                >
                  Consultă pachetele
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Cum vom colabora? (4 pași din boudoir-2.md) */}
      <section className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/boudoir photos for site/02cum vom colabora background.jpg" 
            alt="Cum vom colabora" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-3 block">Ghidul tău</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Cum vom colabora?</h2>
            <p className="text-zinc-400 text-lg font-light">
              Un proces clar, deschis și relaxat, gândit pentru ca tu să te simți confortabil la fiecare pas.
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

      {/* 4. Fotograful tău (din boudoir-2.md) */}
      <section className="py-24 bg-zinc-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image on left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="order-2 lg:order-1 space-y-6"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl max-w-md mx-auto border border-white/5">
                <img 
                  src="./images/photographerimage.jpg" 
                  alt="Balajti Ferenc (Frédi) - Fotograf Boudoir" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Mobile Buttons */}
              <div className="lg:hidden flex flex-col sm:flex-row gap-4 pt-2 max-w-md mx-auto">
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="btn-primary uppercase tracking-wide text-center w-full sm:w-auto"
                >
                  Hai să ne cunoaștem
                </a>
                <Link to="/portofoliu" className="btn-outline uppercase tracking-wide text-center w-full sm:w-auto">
                  Vezi portofoliul
                </Link>
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
                  Cine e fotograful tău?
                </h2>
                <div className="h-1 w-20 bg-white/20 rounded-full" />
              </div>

              <div className="text-zinc-300 leading-relaxed text-lg font-light space-y-5">
                <p>
                  Mă numesc <strong className="text-white font-medium">Balajti Ferenc</strong>, dar cei mai mulți îmi spun <strong className="text-white font-medium">Frédi</strong>. Sunt fotograf din 2012 și, de-a lungul anilor, am avut ocazia să fotografiez sute de oameni.
                </p>
                <p>
                  Știu că nu este întotdeauna ușor să te lași fotografiată, mai ales într-un cadru atât de personal precum o ședință boudoir. De aceea, îmi doresc să creez o atmosferă relaxată, în care să te simți confortabilă și în siguranță.
                </p>
                <p>
                  Nu trebuie să știi să pozezi sau să ai experiență în fața camerei. Te voi ghida pas cu pas, astfel încât să obținem fotografii în care să te simți frumoasă și încrezătoare.
                </p>
                <p className="text-white font-normal italic pt-1">
                  Scopul meu nu este să te transform în altcineva, ci să îți arăt frumusețea ta exact așa cum este.
                </p>
              </div>

              {/* Desktop Buttons */}
              <div className="pt-4 hidden lg:flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="btn-primary uppercase tracking-wide"
                >
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

      {/* 5. Feedback Clienți */}
      <section className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/boudoir photos for site/03ce spun clientii.jpg" 
            alt="Feedback Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
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
            <span className="font-bold">Povești reale și sincere</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Feedback de la cliente</h2>
          <p className="text-zinc-400">Ce spun femeile care au trăit experiența Boudoir.</p>
        </div>
        
        <div className="relative group max-w-[100vw]">
          <button 
            onClick={() => scrollReviews('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-zinc-900/60 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all hidden md:flex shadow-2xl backdrop-blur-md cursor-pointer"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button 
            onClick={() => scrollReviews('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-zinc-900/60 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all hidden md:flex shadow-2xl backdrop-blur-md cursor-pointer"
            aria-label="Next reviews"
          >
            <ChevronRight size={32} />
          </button>

          <div 
            ref={reviewsRef} 
            className="relative w-full overflow-x-auto py-10 px-4 md:px-20 no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            <div className="flex gap-6 w-max mx-auto">
              {reviews.map((review, i) => (
                <div 
                  key={i} 
                  className="w-[340px] md:w-[450px] shrink-0 glass-panel p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between select-none border border-white/5 snap-center"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="font-bold text-white text-lg">{review.name}</h4>
                        <p className="text-xs text-zinc-500 mt-1">{review.role}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/5 text-white flex items-center justify-center font-serif text-2xl border border-white/10 uppercase">
                        {review.name[0]}
                      </div>
                    </div>
                    <div className="flex text-yellow-500 mb-6 gap-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-current" />)}
                    </div>
                    <p className="text-zinc-300 text-sm md:text-base italic leading-relaxed whitespace-pre-line">
                      „{review.text}”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center relative z-10">
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, 'contact')}
            className="btn-primary uppercase tracking-wide cursor-pointer"
          >
            Rezervă ședința ta
          </a>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 bg-[#fbf9f6] border-y border-[#e8e2d9] scroll-mt-24" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#8c7b6d] text-xs uppercase tracking-widest font-bold mb-3 block">Tot ce vrei să știi</span>
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-zinc-900 mb-4">Întrebări Frecvente</h2>
            <p className="text-zinc-600 max-w-xl mx-auto font-light">Răspunsuri la cele mai comune întrebări despre intimitate, ținute și livrare.</p>
            <div className="h-1 w-20 bg-[#8c7b6d]/40 mx-auto rounded-full mt-6" />
          </div>

          <div className="space-y-4">
            {boudoirFaqs.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-[1.8rem] border border-[#e8e2d9] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none transition-colors group cursor-pointer"
                  >
                    <span className="text-lg md:text-xl font-serif text-zinc-900 group-hover:text-[#8c7b6d] transition-colors pr-4">{item.question}</span>
                    <div className={`p-2.5 rounded-full transition-all duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-zinc-900 text-white' : 'bg-[#f4efe8] text-zinc-700 group-hover:bg-[#ede6de]'}`}>
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
                        <div className="px-6 pb-6 md:px-8 md:pb-8 text-zinc-600 font-light leading-relaxed text-base border-t border-[#f0ece4] pt-5">
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

      {/* 7. Garanție: ANGAJAMENTUL MEU FAȚĂ DE TINE (Doar acest titlu conform boudoir-2.md) */}
      <section className="py-24 bg-zinc-900/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-b border-white/5 pb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative p-4"
            >
              <img src="./images/garantie.png" alt="Garantie Boudoir" className="w-full max-w-sm mx-auto h-auto drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wide uppercase">
                  Angajamentul Meu Față de Tine
                </h2>
                <div className="h-1 w-20 bg-white/20 rounded-full mt-4" />
              </div>
              <p className="text-zinc-300 text-lg font-light leading-relaxed">
                Îmi doresc ca experiența ta să fie una plăcută, relaxată și să te simți respectată pe tot parcursul ședinței foto.
              </p>
              <p className="text-zinc-400 text-lg font-light leading-relaxed">
                Dacă un serviciu asumat nu este realizat conform celor stabilite în prealabil, voi face tot posibilul să remediez situația. Dacă acest lucru nu este posibil, voi rambursa contravaloarea serviciului respectiv.
              </p>
              <p className="text-zinc-500 text-base font-light leading-relaxed italic">
                Desigur, garanția nu se aplică aprecierilor subiective asupra fotografiilor – munca de creație nu este o știință exactă. În schimb, îmi asum să respect tot ceea ce am promis.
              </p>
            </motion.div>
          </div>
          <div className="mt-16 text-center">
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="btn-primary tracking-wider uppercase shadow-xl hover:scale-105 transition-transform cursor-pointer"
            >
              Solicită o ofertă
            </a>
          </div>
        </div>
      </section>

      {/* 8. Pachete Boudoir Experience (Same style as Fotografie de Nunta) */}
      <section className="relative py-16 md:py-24 overflow-hidden border-y border-white/5 scroll-mt-24" id="pachete">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/boudoir photos for site/04pachete background.jpg" 
            alt="Pachete Boudoir Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-white">Pachete Boudoir Experience</h2>
            <p className="text-zinc-400 text-sm md:text-base font-light mt-2 max-w-xl mx-auto">
              Alege pachetul care ți se potrivește cel mai bine pentru o experiență de neuitat.
            </p>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 items-start max-w-full mx-auto">
            
            {/* 1. NATURAL */}
            <div className="flex flex-col rounded-3xl overflow-hidden shadow-2xl group transition-all duration-300 hover:-translate-y-2 bg-[#ede6de]">
              {/* Photo Header */}
              <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden bg-zinc-900">
                <img 
                  src="./images/boudoir photos for site/PACHET NATURAL.jpg" 
                  alt="Pachet Boudoir Natural" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/10" />
                <div className="absolute top-5 inset-x-0 text-center">
                  <h3 className="font-serif text-xl xl:text-2xl tracking-widest text-white uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] [text-shadow:_0_2px_10px_rgba(0,0,0,0.95),_0_4px_25px_rgba(0,0,0,0.9)]">
                    NATURAL
                  </h3>
                </div>
              </div>

              {/* Cream Card Body */}
              <div className="bg-[#ede6de] text-[#3d3832] p-6 xl:p-7 pb-7 xl:pb-8 flex flex-col justify-between flex-grow">
                <div className="md:h-[260px] flex flex-col justify-start">
                  <div className="text-center font-bold text-xs uppercase tracking-wider text-[#574d44] mb-3 leading-tight">
                    ÎN AER LIBER
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-[13px] xl:text-sm font-normal leading-snug">
                    <p className="flex items-start gap-2">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>Ședință foto în aer liber</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>60 de minute de fotografiere</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>1–2 ținute</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>15 fotografii retușate profesional</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>Galerie online privată</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#c5b8aa]">
                  <div className="text-2xl xl:text-3xl font-bold font-sans text-center text-[#3d3832] tracking-tight h-10 flex items-center justify-center leading-none">
                    149 EURO
                  </div>
                  <button 
                    onClick={() => handleSelectPackage('Pachetul NATURAL')}
                    className="w-full mt-3 h-11 rounded-full border border-[#8c7b6d] text-[#3d3832] text-xs uppercase font-bold tracking-wider hover:bg-[#8c7b6d] hover:text-white transition-colors text-center flex items-center justify-center cursor-pointer"
                  >
                    Alege Pachetul
                  </button>
                </div>
              </div>
            </div>

            {/* 2. STUDIO ESSENTIALS */}
            <div className="flex flex-col rounded-3xl overflow-hidden shadow-2xl group transition-all duration-300 hover:-translate-y-2 bg-[#ede6de]">
              {/* Photo Header */}
              <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden bg-zinc-900">
                <img 
                  src="./images/boudoir photos for site/PACHET STUDIO ESSENTIALS.jpg" 
                  alt="Pachet Studio Essentials" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/10" />
                <div className="absolute top-4 sm:top-5 inset-x-0 text-center">
                  <h3 className="font-serif text-xl xl:text-2xl tracking-widest text-white uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] [text-shadow:_0_2px_10px_rgba(0,0,0,0.95),_0_4px_25px_rgba(0,0,0,0.9)] leading-tight">
                    STUDIO<br/>ESSENTIALS
                  </h3>
                </div>
              </div>

              {/* Cream Card Body */}
              <div className="bg-[#ede6de] text-[#3d3832] p-6 xl:p-7 pb-7 xl:pb-8 flex flex-col justify-between flex-grow">
                <div className="md:h-[260px] flex flex-col justify-start">
                  <div className="text-center font-bold text-xs uppercase tracking-wider text-[#574d44] mb-3 leading-tight">
                    STUDIO PRIVAT
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-[13px] xl:text-sm font-normal leading-snug">
                    <p className="flex items-start gap-2">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>Ședință foto în studio privat</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>60 de minute de fotografiere</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>2 ținute</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>20 fotografii retușate profesional</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>Moodboard personalizat</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8c7b6d] font-bold">•</span>
                      <span>Galerie online privată</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#c5b8aa]">
                  <div className="text-2xl xl:text-3xl font-bold font-sans text-center text-[#3d3832] tracking-tight h-10 flex items-center justify-center leading-none">
                    199 EURO
                  </div>
                  <button 
                    onClick={() => handleSelectPackage('Pachetul STUDIO ESSENTIALS')}
                    className="w-full mt-3 h-11 rounded-full border border-[#8c7b6d] text-[#3d3832] text-xs uppercase font-bold tracking-wider hover:bg-[#8c7b6d] hover:text-white transition-colors text-center flex items-center justify-center cursor-pointer"
                  >
                    Alege Pachetul
                  </button>
                </div>
              </div>
            </div>

            {/* 3. FULL EXPERIENCE (RECOMMENDED / Popular - Taupe Featured Card) */}
            <div className="flex flex-col rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] group transition-all duration-300 relative bg-[#998471] z-20">
              <div className="absolute top-3.5 right-3.5 z-30 bg-black/70 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
                Recomandat
              </div>

              {/* Photo Header */}
              <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden bg-zinc-900">
                <img 
                  src="./images/boudoir photos for site/PACHET FULL EXPERIENCE.jpg" 
                  alt="Pachet Full Experience" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/10" />
                <div className="absolute top-4 sm:top-5 inset-x-0 text-center">
                  <h3 className="font-serif text-xl xl:text-2xl tracking-widest text-white uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] [text-shadow:_0_2px_10px_rgba(0,0,0,0.95),_0_4px_25px_rgba(0,0,0,0.9)] leading-tight">
                    FULL<br/>EXPERIENCE
                  </h3>
                </div>
              </div>

              {/* Taupe/Brown Card Body - Extends further down */}
              <div className="bg-[#998471] text-white p-6 xl:p-7 pb-10 xl:pb-12 flex flex-col justify-between flex-grow">
                <div className="md:h-[260px] flex flex-col justify-start">
                  <div className="text-center font-bold text-xs uppercase tracking-wider text-white/90 mb-3 leading-tight">
                    EXPERIENȚA COMPLETĂ
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-[13px] xl:text-sm font-normal leading-snug text-white/95">
                    <p className="flex items-start gap-2">
                      <span className="text-white font-bold">•</span>
                      <span>Ședință foto în studio privat</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-white font-bold">•</span>
                      <span>120 de minute de fotografiere</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-white font-bold">•</span>
                      <span>2–3 ținute</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-white font-bold">•</span>
                      <span>25 de fotografii retușate profesional</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-white font-bold">•</span>
                      <span>Moodboard personalizat</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-white font-bold">•</span>
                      <span>Galerie online privată</span>
                    </p>
                    <p className="flex items-start gap-2 font-medium text-white">
                      <span className="text-white font-bold">•</span>
                      <span>Album foto premium 20×20 cm</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="text-2xl xl:text-3xl font-bold font-sans text-center text-white tracking-tight h-10 flex items-center justify-center leading-none">
                    349 EURO
                  </div>
                  <button 
                    onClick={() => handleSelectPackage('Pachetul FULL EXPERIENCE')}
                    className="w-full mt-3 h-11 rounded-full bg-white text-[#998471] text-xs uppercase font-bold tracking-wider hover:bg-zinc-100 transition-colors text-center shadow-lg flex items-center justify-center cursor-pointer"
                  >
                    Alege Pachetul
                  </button>
                  <p className="text-xs text-center text-white/90 font-light mt-3 italic">
                    *Pachetul favorit pentru o transformare completă
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-6 text-center">
            <p className="text-zinc-500 text-[11px] font-light italic">
              * Toate ședințele beneficiază de discreție deplină. Fotografiile nu se publică fără acordul tău expres scris.
            </p>
          </div>

        </div>
      </section>

      {/* 9. Formular de Contact (Fără hartă, centrat ca pe Fotografie de Nuntă) */}
      <section className="py-24 relative overflow-hidden scroll-mt-24" id="contact">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/boudoir photos for site/05hai sa ne cunoastem.jpg" 
            alt="Contact Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-zinc-400 text-xs uppercase tracking-widest font-bold block mb-2">Rezervă experiența</span>
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-white mb-4">Hai să ne cunoaștem mai bine</h2>
            <div className="h-1 w-20 bg-white/20 mx-auto rounded-full" />
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-8 md:p-12 glass-panel rounded-[2.5rem] space-y-8"
            >
              <div className="pb-6 border-b border-white/10">
                <p className="text-zinc-400 text-lg font-light leading-relaxed">
                  Realizez un număr limitat de ședințe boudoir lunar pentru a oferi fiecărei cliente toată atenția necesară.
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

                <div>
                  <select 
                    id="eventType" 
                    defaultValue="Boudoir"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white transition-all outline-none appearance-none"
                  >
                    <option value="Boudoir" className="bg-zinc-900">Boudoir Experience</option>
                    <option value="Fotografie de nuntă" className="bg-zinc-900">Fotografie de nuntă</option>
                    <option value="Botez" className="bg-zinc-900">Botez</option>
                    <option value="Închiriere cabină foto (photobooth)" className="bg-zinc-900">Închiriere cabină foto (photobooth)</option>
                    <option value="Fotografie/filmare promoțională" className="bg-zinc-900">Fotografie/filmare promoțională</option>
                    <option value="Fotografie de brand" className="bg-zinc-900">Fotografie de brand</option>
                  </select>
                </div>

                {/* Pachete Selector Pills */}
                <div className="space-y-3 pt-1">
                  <label className="block text-sm md:text-base font-medium text-white">
                    Ce pachet te interesează?
                  </label>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {boudoirPackages.map((pkg) => {
                      const isSelected = selectedPackage === pkg.id;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setSelectedPackage(pkg.id)}
                          className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-white/20 border-2 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.35)] scale-[1.02]'
                              : 'bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          <span>{pkg.name}</span>
                          {pkg.price && (
                            <span className={`font-semibold ${isSelected ? 'text-white font-bold' : 'text-zinc-400'}`}>
                              {pkg.price}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <input type="hidden" id="pachet" name="pachet" value={selectedPackage} />
                </div>

                <textarea id="message" rows="3" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/40 focus:bg-white/10 text-white placeholder:text-zinc-500 transition-all outline-none resize-none" placeholder="Scrie-mi dacă ai vreo întrebare sau dorință specială pentru ședința ta"></textarea>

                <button type="submit" className="w-full btn-primary !py-4 text-base tracking-wide uppercase mt-2 shadow-lg cursor-pointer">
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
