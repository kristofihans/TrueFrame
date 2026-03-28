import React from 'react';
import { Camera, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Facebook = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-transparent text-zinc-400 pt-16 pb-8 border-t border-white/5 relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white">
              <img src="./images/logo.png" alt="TrueFrame Logo" className="h-12 w-auto brightness-0 invert opacity-90" />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-zinc-400">
              Cele mai frumoase momente povestite prin fotografii. 
              Servicii foto profesionale în Oradea și împrejurimi.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/trueframe_weddings_and_studio" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif text-xl font-medium mb-6">Linkuri Utile</h3>
            <ul className="space-y-3">
              {['Home', 'Servicii', 'Portofoliu', 'Despre Mine', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-brand-400 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-serif text-xl font-medium mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="text-brand-500 shrink-0" size={20} />
                <span>Oradea, România</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="text-brand-500 shrink-0" size={20} />
                <span>+40 (0) 700 000 000</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="text-brand-500 shrink-0" size={20} />
                <span>contact@trueframe.ro</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} TrueFrame Photography. Toate drepturile rezervate.</p>
          <div className="flex gap-4">
            <Link to="/termeni" className="hover:text-white transition-colors">Termeni și Condiții</Link>
            <Link to="/confidentialitate" className="hover:text-white transition-colors">Politică de Confidențialitate</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
