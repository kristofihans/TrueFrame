import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { blogPosts } from './Blog';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent font-sans">
        <div className="text-center glass-panel p-12 rounded-3xl">
          <h1 className="text-4xl font-serif text-white mb-4">Articolul nu a fost găsit</h1>
          <Link to="/blog" className="btn-primary">Înapoi la Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-transparent font-sans text-gray-200">
      
      {/* Hero Header */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 font-medium">
              <ArrowLeft size={20} /> Spre toate articolele
            </Link>
            
            <div className="flex gap-4 text-sm font-semibold text-white/80 uppercase tracking-widest mb-4">
              <span>{post.category}</span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-tight"
            >
              {post.title}
            </motion.h1>

            <div className="flex items-center gap-6 mt-6 text-sm text-white/60">
              <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock size={16} /> {post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 pb-20">
        <motion.article 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl space-y-8 prose prose-lg md:prose-xl prose-invert prose-headings:font-serif prose-headings:text-white prose-p:text-zinc-100 prose-strong:text-white prose-p:font-normal prose-p:leading-relaxed text-zinc-100"
        >
          <p className="lead text-xl md:text-2xl text-white font-medium italic border-l-4 border-white/70 pl-6">
            {post.excerpt}
          </p>
          
          <h2>1. De ce este important acest detaliu?</h2>
          <p>
            În era digitală, tindem să păstrăm totul pe telefon sau în cloud. Însă valoarea unei fotografii crește exponențial în momentul în care devine un obiect fizic, palpabil. O amintire materializată.
          </p>
          
          <h2>2. Pregătirea mentală pentru o ședință foto</h2>
          <p>
            Adesea, cuplurile simt o anxietate privind „statul la poze”. Secretul meu? Renunțăm la statul la poze. Accentul este pe interacțiunea reală, gesturile mici și comunicarea dintre voi. Aparatul este doar acolo să decupeze aceste crâmpeie.
          </p>
          
          <img 
            src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=1200" 
            alt="Content example" 
            className="w-full rounded-2xl shadow-xl my-10"
          />

          <h2>3. Concluzie</h2>
          <p>
            Cel mai important aspect va rămâne întotdeauna confortul vostru. Relaxați-vă și bucurați-vă de rezultat. Amintirile se scriu la fel de frumos cum le trăiți.
          </p>
          
          <div className="pt-10 mt-10 border-t border-white/20">
            <h3 className="text-2xl font-serif text-white mb-4">Ai nevoie de un fotograf?</h3>
            <Link to="/contact" className="btn-primary">Discută cu mine</Link>
          </div>
        </motion.article>
      </div>

    </div>
  );
}
