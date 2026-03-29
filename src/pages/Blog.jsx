import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      summary
    }`;

    client.fetch(query).then((data) => {
      setPosts(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-48 flex items-center justify-center text-white bg-zinc-950 px-4">
        <div className="text-center space-y-6">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xl font-light tracking-widest uppercase">Se încarcă poveștile...</p>
        </div>
      </div>
    );
  }

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
          {posts.map((post, index) => (
            <motion.article 
              key={post._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel rounded-3xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="aspect-video overflow-hidden relative">
                {post.mainImage ? (
                  <img 
                    src={urlFor(post.mainImage).width(800).height(500).url()} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-white/10 uppercase tracking-widest text-sm">
                    Moment capturat
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
              </div>

              <div className="p-6 md:p-8 flex-grow flex flex-col border-t border-white/5">
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-4">
                  <span className="text-white/60">
                    {new Date(post.publishedAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                
                <h2 className="text-2xl font-serif text-white mb-4 line-clamp-2">
                  <Link to={`/blog/${post.slug.current}`} className="hover:text-zinc-200 transition-colors leading-tight">
                    {post.title}
                  </Link>
                </h2>
                
                {post.summary && (
                  <p className="text-zinc-400 font-light leading-relaxed mb-8 line-clamp-3">
                    {post.summary}
                  </p>
                )}
                
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/10">
                  <Link 
                    to={`/blog/${post.slug.current}`} 
                    className="text-white hover:text-zinc-200 transition-colors font-medium flex items-center gap-2 group/link text-sm uppercase tracking-widest"
                  >
                    Citește <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {posts.length === 0 && !loading && (
          <div className="text-center py-24 text-zinc-500">
            <p className="text-xl font-light italic">Ești la începutul unei povești noi. Revenim curând cu primul articol.</p>
          </div>
        )}

      </div>
    </div>
  );
}
