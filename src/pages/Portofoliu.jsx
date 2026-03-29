import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom } from "yet-another-react-lightbox/plugins";
import { Images, ArrowLeft, ZoomIn, Loader2 } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

export default function Portofoliu() {
  const [albums, setAlbums] = useState([]);
  const [categories, setCategories] = useState(['Toate']);
  const [activeCategory, setActiveCategory] = useState('Toate');
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Albums and Categories in parallel
    const fetchData = async () => {
      try {
        const [albumData, categoryData] = await Promise.all([
          client.fetch(`*[_type == "album"] | order(_createdAt desc) {
            _id,
            title,
            "slug": slug.current,
            "categoryName": category->title,
            mainImage,
            gallery
          }`),
          client.fetch(`*[_type == "category"] { title }`)
        ]);

        setAlbums(albumData || []);
        const dynamicCategories = ['Toate', ...(categoryData?.map(c => c.title) || [])];
        setCategories(dynamicCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Sanity data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAlbums = useMemo(() => {
    if (activeCategory === 'Toate') return albums;
    return albums.filter(album => album.categoryName === activeCategory);
  }, [activeCategory, albums]);

  // Transform Sanity gallery to Lightbox slides
  const slides = useMemo(() => {
    if (!activeAlbum || !activeAlbum.gallery) return [];
    return activeAlbum.gallery.map(photo => ({
      src: urlFor(photo).width(1600).url(),
      title: activeAlbum.title
    }));
  }, [activeAlbum]);

  if (loading) {
    return (
      <div className="min-h-screen pt-48 flex flex-col items-center justify-center text-white bg-zinc-950 px-4">
        <Loader2 className="w-12 h-12 animate-spin text-white mb-6 opacity-80" />
        <p className="text-xl font-light tracking-widest uppercase opacity-70">Pregătim expoziția...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen font-sans bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Dynamically update based on view */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {!activeAlbum ? (
            <>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-serif text-white mb-4">
                Albume Foto
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-zinc-400 font-light">
                Alege o categorie și descoperă colecția completă de amintiri surprinse de la fiecare eveniment.
              </motion.p>
            </>
          ) : (
            <>
              <motion.button 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                onClick={() => setActiveAlbum(null)}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all mb-6 font-medium bg-zinc-900/40 shadow-sm"
              >
                <ArrowLeft size={18} /> Înapoi la Albume
              </motion.button>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl font-serif text-white mb-4">
                {activeAlbum.title}
              </motion.h1>
              <div className="inline-block px-4 py-1 border border-white/10 rounded-full text-zinc-300 text-sm font-bold uppercase tracking-widest bg-zinc-900/40">
                {activeAlbum.categoryName}
              </div>
            </>
          )}
        </div>

        {/* Filters Grid */}
        {!activeAlbum && (
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-white text-zinc-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-105' 
                    : 'bg-transparent text-zinc-400 border-white/10 hover:bg-white/5 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Dynamic Content Area */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {!activeAlbum ? (
              // Mode 1: SHOW ALBUMS
              filteredAlbums.map((album) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                  key={`album-${album._id}`}
                  className="group cursor-pointer rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 glass-panel hover:-translate-y-3"
                  onClick={() => setActiveAlbum(album)}
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img
                      src={urlFor(album.mainImage).width(800).url()} 
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                    <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white drop-shadow-md text-xs font-bold flex items-center gap-2 border border-white/20">
                      <Images size={14} />
                      {album.gallery?.length || 0} cadre
                    </div>
                  </div>
                  <div className="p-8 text-center border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-3 block">{album.categoryName}</span>
                    <h3 className="text-2xl font-serif text-white group-hover:text-zinc-200 transition-colors leading-tight">
                      {album.title}
                    </h3>
                  </div>
                </motion.div>
              ))
            ) : (
              // Mode 2: SHOW PHOTOS IN ALBUM
              activeAlbum.gallery?.map((photo, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, delay: index * 0.05 }}
                  key={`photo-${index}`}
                  className="group cursor-pointer rounded-[2rem] overflow-hidden shadow-xl border border-white/5 aspect-[4/5] relative"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img 
                    src={urlFor(photo).width(800).url()} 
                    alt={`${activeAlbum.title} ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px]">
                     <ZoomIn size={40} className="text-white drop-shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500" />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {albums.length === 0 && !loading && (
          <div className="text-center py-40">
            <p className="text-xl font-light italic text-zinc-500 uppercase tracking-widest">Momentan lucrăm la selectarea celor mai bune cadre.</p>
          </div>
        )}

        {/* Final Lightbox layer */}
        <Lightbox 
          open={lightboxIndex >= 0} 
          index={lightboxIndex} 
          close={() => setLightboxIndex(-1)} 
          slides={slides} 
          plugins={[Zoom]} 
          carousel={{ padding: "0px", spacing: 0 }} 
          animation={{ fade: 400 }} 
        />
      </div>
    </div>
  );
}

