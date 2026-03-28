import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';

export const blogPosts = [
  {
    id: 1,
    title: "Cum să te pregătești pentru ședința foto de logodnă",
    slug: "pregatire-sedinta-logodna",
    excerpt: "Sfaturi esențiale despre vestimentație, locații și mind-set pentru o sesiune foto 'Save the Date' de neuitat.",
    date: "14 Mai 2026",
    readTime: "4 min read",
    category: "Ghidul Mirilor",
    image: "./images/photo3.jpg"
  },
  {
    id: 2,
    title: "Top 5 locații pentru nuntă în Oradea și împrejurimi",
    slug: "locatii-nunta-oradea",
    excerpt: "Analizăm cele mai căutate și fotogenice locații pentru evenimente din zona Bihorului.",
    date: "02 Aprilie 2026",
    readTime: "6 min read",
    category: "Locații",
    image: "./images/photo8.jpg"
  },
  {
    id: 3,
    title: "Importanța unui album foto printat",
    slug: "importanta-album-printat",
    excerpt: "De ce un ecran digital nu va putea înlocui niciodată senzația de a răsfoi un album de nuntă premium.",
    date: "20 Martie 2026",
    readTime: "3 min read",
    category: "Sfaturi",
    image: "./images/photo11.jpg"
  }
];

export default function Blog() {
  return (
    <div className="pt-32 pb-20 min-h-screen font-sans bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-white mb-6"
          >
            Povești și Sfaturi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-zinc-200 font-light"
          >
            Tot ce trebuie să știi despre organizarea evenimentului perfect, din perspectiva unui fotograf.
          </motion.p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel rounded-3xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6 md:p-8 flex-grow flex flex-col border-t border-white/5">
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-4">
                  <span className="text-white/80">{post.category}</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> {post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-serif text-white mb-3 line-clamp-2">
                  <Link to={`/blog/${post.id}`} className="hover:text-zinc-200 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-zinc-100 font-light leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-zinc-500">{post.date}</span>
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="text-white hover:text-zinc-200 transition-colors font-medium flex items-center gap-1 text-sm group"
                  >
                    Citește <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </div>
  );
}
