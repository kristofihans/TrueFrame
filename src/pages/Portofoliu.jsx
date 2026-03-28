import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom } from "yet-another-react-lightbox/plugins";
import { Images, ArrowLeft, ZoomIn } from 'lucide-react';

const categories = ['Toate', 'Nunti', 'Botezuri', 'Produse'];

const albums = [
  { id: 1, title: 'Nuntă Maria & Ion', category: 'Nunti', cover: '/images/photo1.jpg', photos: [{ src: '/images/photo1.jpg' }, { src: '/images/photo2.jpg' }, { src: '/images/photo3.jpg' }] },
  { id: 2, title: 'Botez Albert', category: 'Botezuri', cover: '/images/photo4.jpg', photos: [{ src: '/images/photo4.jpg' }, { src: '/images/photo5.jpg' }] },
  { id: 3, title: 'Sesiune Produse Artisanal', category: 'Produse', cover: '/images/photo6.jpg', photos: [{ src: '/images/photo6.jpg' }, { src: '/images/photo7.jpg' }] },
  { id: 4, title: 'Cununie Civilă', category: 'Nunti', cover: '/images/photo8.jpg', photos: [{ src: '/images/photo8.jpg' }, { src: '/images/photo9.jpg' }] },
  { id: 5, title: 'Botez Sofia', category: 'Botezuri', cover: '/images/photo10.jpg', photos: [{ src: '/images/photo10.jpg' }, { src: '/images/photo11.jpg' }] },
  { id: 6, title: 'Nuntă Elena & Alex', category: 'Nunti', cover: '/images/photo12.jpg', photos: [{ src: '/images/photo12.jpg' }, { src: '/images/photo13.jpg' }] }
];

export default function Portofoliu() {
  const [activeCategory, setActiveCategory] = useState('Toate');
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filteredAlbums = useMemo(() => {
    if (activeCategory === 'Toate') return albums;
    return albums.filter(album => album.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-32 pb-20 min-h-screen font-sans bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Dynamically update based on view */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {!activeAlbum ? (
            <>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Albume Foto
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-gray-700 font-light">
                Alege o categorie și descoperă colecția completă de amintiri surprinse de la fiecare eveniment.
              </motion.p>
            </>
          ) : (
            <>
              <motion.button 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                onClick={() => setActiveAlbum(null)}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/70 text-gray-800 hover:bg-white/60 hover:text-gray-900 transition-all mb-6 font-medium bg-white/40 shadow-sm"
              >
                <ArrowLeft size={18} /> Înapoi la Albume
              </motion.button>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                {activeAlbum.title}
              </motion.h1>
              <div className="inline-block px-4 py-1 border border-white/70 rounded-full text-gray-900 text-sm font-bold uppercase tracking-widest bg-white/40">
                {activeAlbum.category}
              </div>
            </>
          )}
        </div>

        {/* Filters Grid */}
        {!activeAlbum && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-white/60 text-gray-900 border-white/70 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                    : 'bg-transparent text-gray-700 border-white/5 hover:bg-white/40 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Dynamic Content Area */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {!activeAlbum ? (
              // Mode 1: SHOW ALBUMS
              filteredAlbums.map((album) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                  key={`album-${album.id}`}
                  className="group cursor-pointer rounded-3xl overflow-hidden shadow-xl transition-all duration-300 glass-panel hover:-translate-y-2"
                  onClick={() => setActiveAlbum(album)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={album.cover} alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800&sig=${album.id}`; }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white drop-shadow-md text-xs font-bold flex items-center gap-1.5 shadow-sm border border-white/70">
                      <Images size={14} />
                      {album.photos.length} fotogafii
                    </div>
                  </div>
                  <div className="p-6 text-center border-t border-white/5">
                    <span className="text-xs uppercase tracking-widest text-gray-700 font-bold mb-2 block">{album.category}</span>
                    <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {album.title}
                    </h3>
                  </div>
                </motion.div>
              ))
            ) : (
              // Mode 2: SHOW PHOTOS IN ALBUM
              activeAlbum.photos.map((photo, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, delay: index * 0.05 }}
                  key={`photo-${index}`}
                  className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-white/5 aspect-[4/3] relative"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img 
                    src={photo.src} 
                    alt={`${activeAlbum.title} ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90"
                    onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800&sig=${activeAlbum.id}${index}`; }}
                  />
                  {/* Plus icon on hover indicates it expands */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                     <ZoomIn size={32} className="text-white drop-shadow-md" />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Final Lightbox layer */}
        <Lightbox 
          open={lightboxIndex >= 0} 
          index={lightboxIndex} 
          close={() => setLightboxIndex(-1)} 
          slides={activeAlbum ? activeAlbum.photos : []} 
          plugins={[Zoom]} 
          carousel={{ padding: "0px", spacing: 0 }} 
          animation={{ fade: 300 }} 
        />
      </div>
    </div>
  );
}
