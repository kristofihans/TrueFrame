import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '../lib/sanity';

export default function BlogPost() {
  const { id } = useParams(); // This will now represent the slug
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      title,
      publishedAt,
      mainImage,
      summary,
      body,
      "category": category->title
    }`;

    client.fetch(query, { slug: id }).then((data) => {
      setPost(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-48 flex items-center justify-center text-white bg-zinc-950 px-4">
        <div className="text-center space-y-6">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xl font-light tracking-widest uppercase">Se încarcă povestea...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 font-sans px-4">
        <div className="text-center glass-panel p-12 rounded-3xl w-full max-w-lg shadow-2xl">
          <h1 className="text-4xl font-serif text-white mb-6">Articolul nu a fost găsit</h1>
          <Link to="/blog" className="btn-primary block">Înapoi la Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-zinc-950 font-sans text-gray-200">
      
      {/* Hero Header */}
      <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        {post.mainImage && (
          <img 
            src={urlFor(post.mainImage).width(1920).height(1080).url()} 
            alt={post.title} 
            className="w-full h-full object-cover" 
          />
        )}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px] flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 font-medium group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Înapoi la Blog
            </Link>
            
            {post.category && (
              <div className="inline-block px-4 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white uppercase tracking-widest mb-6 backdrop-blur-md">
                {post.category}
              </div>
            )}
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight"
            >
              {post.title}
            </motion.h1>

            <div className="flex items-center gap-6 mt-8 text-sm text-white/50 font-medium">
              <span className="flex items-center gap-2">
                <Calendar size={16} /> 
                {new Date(post.publishedAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 pb-32">
        <motion.article 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel p-8 md:p-16 lg:p-24 rounded-[3rem] shadow-2xl space-y-12 text-zinc-300"
        >
          {post.summary && (
            <p className="text-2xl md:text-3xl text-white font-serif italic border-l-4 border-white/60 pl-8 leading-relaxed mb-16">
              {post.summary}
            </p>
          )}
          
          <div className="prose prose-lg md:prose-xl lg:prose-2xl prose-invert prose-headings:font-serif prose-headings:text-white prose-p:text-zinc-300 prose-p:font-light prose-p:leading-relaxed prose-img:rounded-[2rem] max-w-none">
            <PortableText 
              value={post.body} 
              components={{
                types: {
                  image: ({ value }) => (
                    <img 
                      src={urlFor(value).width(1200).url()} 
                      alt="TrueFrame Visual" 
                      className="w-full h-auto rounded-[2rem] shadow-2xl my-10 border border-white/10"
                    />
                  )
                }
              }}
            />
          </div>
          
          <div className="pt-20 mt-20 border-t border-white/10">
            <div className="bg-zinc-900/40 p-10 rounded-[2rem] border border-white/5 text-center">
              <h3 className="text-3xl font-serif text-white mb-6">Ți-a plăcut acest articol?</h3>
              <p className="text-zinc-400 mb-10 font-light max-w-md mx-auto">Te invit să explorezi și restul portofoliului sau să îmi scrii direct.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-primary">Discută cu mine</Link>
                <Link to="/portofoliu" className="btn-outline">Vezi Portofoliu</Link>
              </div>
            </div>
          </div>
        </motion.article>
      </div>

    </div>
  );
}
