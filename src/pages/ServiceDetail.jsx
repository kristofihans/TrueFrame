import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.slug === slug);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-zinc-950 px-4">
        <h1 className="text-4xl font-serif mb-6">Serviciul nu a fost găsit</h1>
        <Link to="/servicii" className="btn-primary">Înapoi la servicii</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/servicii" 
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-bold group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Toate Serviciile
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-white leading-tight mb-6">
              {service.title}
            </h1>
            <div className="h-1 w-24 bg-white mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            
            {/* Left: Main Story */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-10"
            >
              <div className="space-y-6">
                <h2 className="text-3xl font-serif text-white">Povestea și Viziunea Mea</h2>
                <div className="h-px w-20 bg-white/20" />
              </div>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">
                {service.longDesc}
              </p>
              
              <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right: Package Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="glass-panel p-10 rounded-[2.5rem] border border-white/10 space-y-10">
                <h3 className="text-2xl font-serif text-white">Ce include pachetul</h3>
                
                <ul className="space-y-6">
                  {service.features?.map((feature, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="mt-1 text-white shrink-0">
                        <CheckCircle size={20} />
                      </div>
                      <span className="text-zinc-300 font-light leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/contact" 
                  className="btn-primary w-full text-center py-4 text-base tracking-widest uppercase shadow-xl hover:scale-[1.03] transition-transform flex items-center justify-center gap-2 group"
                >
                  Cere o ofertă <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Related Info */}
              <div className="px-10 text-center lg:text-left">
                <p className="text-zinc-500 text-sm font-light italic">
                  * Fiecare pachet este personalizabil în funcție de nevoile și dorințele voastre. Pentru o ofertă exactă, ne putem auzi oricând la telefon sau putem programa o întâlnire.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="py-32 bg-zinc-900/40 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
          <h2 className="text-4xl md:text-5xl font-serif text-white">Ai un alt tip de eveniment în minte?</h2>
          <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
            Mă adaptez oricărei provocări vizuale. Dacă ai o idee unică sau un eveniment deosebit, scrie-mi și vom găsi împreună soluția perfectă 
            pentru a-l imortaliza la cel mai înalt nivel artistic.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link to="/contact" className="btn-primary">Contactează-mă</Link>
            <Link to="/portofoliu" className="btn-outline">Vezi Portofoliu</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
