import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Clock, ChevronLeft, ChevronRight, ChevronDown, MessageCircle, Phone, MapPin, Camera, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity'; // Added Sanity client

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
].sort(() => 0.5 - Math.random());

const faqData = [
  {
    question: "Cu cât timp înainte ar trebui să rezervăm data pentru eveniment?",
    answer: "În general, cuplurile își rezervă data cu 8–16 luni înainte de eveniment. Deoarece aleg să fotografiez doar 15–20 de evenimente pe sezon, îți recomand să nu aștepți prea mult dacă îți dorești să fim împreună în ziua nunții tale. Limitez intenționat numărul de evenimente pentru a putea oferi fiecărui cuplu toată atenția și implicarea pe care le merită."
  },
  {
    question: "Cât timp durează până primim fotografiile?",
    answer: "Veți primi galeria finală în aproximativ 4–6 săptămâni. Fiecare fotografie este editată individual, cu aceeași atenție la detalii, pentru a vă oferi calitatea pe care o asociez cu munca mea. Totuși, nu va trebui să așteptați atât de mult — la câteva zile după eveniment veți primi o galerie de preview, cu o selecție de imagini, ca să puteți retrăi primele emoții cât mai repede."
  },
  {
    question: "Câte fotografii vom primi în total?",
    answer: "Fiecare eveniment este unic, însă vă puteți aștepta la o galerie atent curatoriată, editată, plină de momente frumoase, nu la un număr fix de fotografii."
  },
  {
    question: "Te deplasezi și în afara județului Bihor / orașului Oradea?",
    answer: "Desigur. Sunt disponibil pentru evenimente atât în România, cât și în străinătate. Până acum am fotografiat în mai multe orașe din România, dar și în Ungaria, Croația și Cipru."
  },
  {
    question: "Ne vei ajuta să pozăm în fața camerei?",
    answer: "Bineînțeles. Atunci când este nevoie, vă voi ghida și vă voi oferi indicații, astfel încât să vă simțiți confortabil în fața camerei. În rest, prefer să surprind ziua voastră exact așa cum se desfășoară, fără să intervin mai mult decât este necesar și fără să regizez momentele. La urma urmei, este ziua voastră, nu o ședință foto."
  },
  {
    question: "Oferi și servicii foto + video?",
    answer: "Dacă vă doriți și video, colaborez cu videografi pe care îi recomand cu toată încrederea. Sunt profesioniști care împărtășesc aceeași atenție la detalii și același standard de calitate. Desigur, alegerea vă aparține în totalitate."
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const reviewsRef = useRef(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [currentHero, setCurrentHero] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  
  const heroImages = [
    './images/01.webp',
    './images/02.webp',
    './images/03.webp'
  ];

  useEffect(() => {
    client.fetch(`*[_type == "post"] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      mainImage,
      summary
    }`).then(data => setLatestPosts(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

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
      <section className="relative h-screen flex flex-col justify-end items-center overflow-hidden pb-16 md:pb-20">
        {/* Desktop Hero Background (Side-by-side) */}
        <div className="absolute inset-0 z-0 hidden md:grid grid-cols-3">
          <img
            src="./images/01.webp"
            className="w-full h-full object-cover"
            alt="Hero Background 1"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2938&auto=format&fit=crop'; }}
          />
          <img
            src="./images/02.webp"
            className="w-full h-full object-cover"
            alt="Hero Background 2"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2938&auto=format&fit=crop'; }}
          />
          <img
            src="./images/03.webp"
            className="w-full h-full object-cover"
            alt="Hero Background 3"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2938&auto=format&fit=crop'; }}
          />
        </div>

        {/* Mobile Hero Background (Slideshow) */}
        <div className="absolute inset-0 z-0 block md:hidden">
          <AnimatePresence>
            <motion.img
              key={currentHero}
              src={heroImages[currentHero]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2938&auto=format&fit=crop'; }}
            />
          </AnimatePresence>
        </div>
        
        {/* Content (Title & Buttons) */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-serif font-normal text-white leading-tight whitespace-nowrap drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
          >
            Simplu. Real. Memorabil.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/contact" className="btn-primary font-medium tracking-wide uppercase shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Solicită ofertă
            </Link>
            <Link to="/portofoliu" className="btn-outline bg-black/40 backdrop-blur-sm hover:!bg-black/60 font-medium tracking-wide uppercase">
              Vezi portofoliul
            </Link>
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
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="space-y-8 order-1 lg:order-2"
            >
              <div className="text-zinc-400 leading-relaxed text-lg font-light space-y-6">
                <p className="text-white text-3xl font-serif mb-2 leading-tight">Hey, eu sunt Fredi...</p>
                <p className="text-zinc-300 text-xl font-serif mb-6 leading-tight">...fotograf de nuntă și evenimente din Oradea.</p>
                <p>Fotografia nu este doar despre prezent. Cei care mă aleg știu că investesc în viitorul lor – în amintiri care, peste zeci de ani, vor fi și mai valoroase decât în ziua în care au fost create.</p>
                <p>Îmi doresc ca fotografiile de nuntă făcute de mine, să fie mai mult decât simple imagini – să fie amintiri vii, care te transportă înapoi în acele clipe speciale.</p>
                <p>Îmi place să fotografiez fără ca oamenii să simtă prea mult prezența mea. Nu îți voi cere să pozezi forțat și nu te voi pune în ipostaze nenaturale.</p>
              </div>
              
              {/* Desktop Buttons (Hidden on mobile) */}
              <div className="hidden lg:flex gap-4 pt-6">
                <Link to="/contact" className="btn-primary uppercase tracking-wide">Solicită ofertă</Link>
                <Link to="/portofoliu" className="btn-outline uppercase tracking-wide">
                  Vezi portofoliul
                </Link>
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
            <Link to="/contact" className="btn-primary w-full text-center uppercase tracking-wide">Solicită ofertă</Link>
            <Link to="/portofoliu" className="btn-outline w-full text-center uppercase tracking-wide">
              Vezi portofoliul
            </Link>
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
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-4xl md:text-5xl font-serif font-normal text-white mb-16"
          >
            Ce pot face pentru tine
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: 'Fotografie de nuntă', slug: 'fotografie-nunta', desc: 'Dacă îți dorești fotografii de nuntă naturale, o atmosferă relaxată și o poveste vizuală autentică, ești la locul potrivit…' },
              { title: 'Botez', slug: 'botez', desc: 'Documentarea delicată și plină de emoție a primului mare eveniment din viața copilului tău…' },
              { title: 'Boudoir', slug: 'boudoir', desc: 'Te invit la un shooting în care scoatem la lumină feminitatea care există deja în tine.' },
              { title: 'Photobooth', slug: 'cabina-foto', desc: 'Îți ofer o experiență premium de photobooth, cu decor complet și detalii care o transformă într-un punct de atracție…' },
              { title: 'Fotografie și filmări promoționale', slug: 'foto-video-promotional', desc: 'Îți dorești fotografii și/sau videouri de produs care atrag, conving și vând? Te invit să vezi ce îți pot oferi:' },
              { title: 'Fotografie de brand', slug: 'fotografie-brand', desc: 'Hai să creăm imagini care spun cine ești, fără să spui un cuvânt…' }
            ].map((s, i) => (
              <motion.div 
                key={i} transition={{ delay: i * 0.1 }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="glass-panel p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all group flex flex-col h-full"
              >
                <h3 className="text-2xl font-serif font-normal text-white mb-6">{s.title}</h3>
                <p className="text-zinc-400 mb-8 font-light leading-relaxed flex-grow">{s.desc}</p>
                <Link to={`/servicii/${s.slug}`} className="btn-outline group-hover:bg-white group-hover:text-black transition-all text-center">
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
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-4">
                Fotografia are valoare pe termen lung — fie că este vorba despre amintiri, imagine personală sau identitatea unui brand.
              </p>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-4">
                Ofer această garanție pentru că am încredere deplină în munca mea și în ceea ce livrez. Dacă, după livrare, consideri că nu am respectat nivelul promis și rezultatul nu reflectă ceea ce am stabilit împreună, îți returnez întreaga sumă.
              </p>
              <p className="text-zinc-400 text-lg font-light leading-relaxed">
                Fotografia rămâne o formă de artă, iar preferințele pot fi diferite — de aceea, garanția nu acoperă aspectele subiective. Însă, dacă așteptările și promisiunile nu se aliniază, nu rămâi dezamăgit(ă).
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

      {/* 6.5. FAQ (Intrebari Frecvente) Section */}
      <section className="py-24 bg-transparent border-t border-white/5 scroll-mt-20" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-white mb-4">Întrebări Frecvente</h2>
            <p className="text-zinc-400 max-w-xl mx-auto font-light">Răspunsuri la cele mai comune întrebări despre colaborarea noastră și modul în care lucrez.</p>
            <div className="h-1 w-20 bg-white/20 mx-auto rounded-full mt-6" />
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => {
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

      {/* 7. Contact Section */}
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

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 md:p-12 glass-panel rounded-[2.5rem] space-y-8"
            >
              <div className="pb-6 border-b border-white/10">
                <p className="text-zinc-400 text-lg font-light leading-relaxed">
                  Am un număr limitat de locuri, deci dacă vrei să colaborăm, nu ezita să-mi lași un mesaj
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
                  <option value="Botez" className="bg-zinc-900">Botez</option>
                  <option value="Boudoir" className="bg-zinc-900">Boudoir</option>
                  <option value="Închiriere cabină foto (photobooth)" className="bg-zinc-900">Închiriere cabină foto (photobooth)</option>
                  <option value="Fotografie/filmare promoțională" className="bg-zinc-900">Fotografie/filmare promoțională</option>
                  <option value="Fotografie de brand" className="bg-zinc-900">Fotografie de brand</option>
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

      {/* 8. Blog Highlight Section */}
      <section className="py-32 bg-zinc-900/10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-20 text-center">
            <span className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Povești Recente</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white">Cel mai nou pe blog</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(latestPosts || []).map((post, i) => (
              <motion.article 
                key={post._id || i} transition={{ delay: i * 0.1 }}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="glass-panel overflow-hidden rounded-[2.5rem] flex flex-col group h-full border border-white/5 hover:border-white/20 transition-all hover:-translate-y-3"
              >
                <div className="aspect-video overflow-hidden">
                  {post.mainImage ? (
                    <img 
                      src={urlFor(post.mainImage).width(800).url()} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-white/5 uppercase tracking-widest text-[10px]">TrueFrame</div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow text-left">
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-4 font-black">Life & Moments</p>
                  <h3 className="text-2xl font-serif text-white mb-5 line-clamp-2 leading-tight group-hover:text-zinc-200">{post.title}</h3>
                  <p className="text-zinc-400 font-light text-sm line-clamp-3 mb-8 leading-relaxed">
                    {post.summary}
                  </p>
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <Link to={`/blog/${post.slug?.current || '#'}`} className="text-sm font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group/link">
                      Citește <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-20">
            <Link to="/blog" className="btn-outline">Toate articolele</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
