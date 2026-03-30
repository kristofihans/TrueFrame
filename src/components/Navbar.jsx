import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/servicesData';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Servicii', path: '/servicii', hasDropdown: true },
  { name: 'Portofoliu', path: '/portofoliu' },
  { name: 'Despre Mine', path: '/despre-mine' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsServiceDropdownOpen(false);
  }, [location.pathname]);

  const toggleServiceDropdown = (e) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      setIsServiceDropdownOpen(!isServiceDropdownOpen);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/20 shadow-2xl py-4' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="./images/logo.png" alt="TrueFrame Logo" className="h-16 w-auto brightness-0 invert opacity-90" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group py-2"
                onMouseEnter={() => link.hasDropdown && setIsServiceDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsServiceDropdownOpen(false)}
              >
                <Link
                  to={link.path}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-white drop-shadow-md flex items-center gap-1 ${
                    location.pathname.startsWith(link.path) && link.path !== '/' 
                    ? 'text-white font-bold' 
                    : 'text-gray-100'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} className={`transform transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />}
                </Link>

                {link.hasDropdown && (
                  <AnimatePresence>
                    {isServiceDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-zinc-950 p-4 rounded-3xl border border-white/20 shadow-2xl"
                      >
                        <div className="flex flex-col gap-1">
                          {servicesData.map((service) => (
                            <Link
                              key={service.slug}
                              to={`/servicii/${service.slug}`}
                              className="px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all flex items-center justify-between group/item"
                            >
                              {service.title}
                              <ChevronDown size={14} className="-rotate-90 opacity-0 group-hover/item:opacity-100 transition-all transform translate-x-1" />
                            </Link>
                          ))}
                          <div className="h-px bg-white/10 my-2 mx-4" />
                          <Link to="/servicii" className="px-4 py-2 text-xs text-center font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                            Toate Serviciile
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <button 
            className="md:hidden p-2 text-white drop-shadow-md z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-3xl shadow-2xl border-b border-white/10 md:hidden"
          >
            <div className="px-4 pt-2 pb-8 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={toggleServiceDropdown}
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-medium transition-colors ${
                          location.pathname.startsWith(link.path) ? 'bg-white/10 text-white' : 'text-white'
                        }`}
                      >
                        {link.name}
                        <ChevronDown size={20} className={`transform transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isServiceDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col pl-4"
                          >
                            {servicesData.map((service) => (
                              <Link
                                key={service.slug}
                                to={`/servicii/${service.slug}`}
                                className="px-6 py-3 text-white/60 hover:text-white transition-colors text-base border-l border-white/10 ml-6 mt-1 mb-1"
                              >
                                {service.title}
                              </Link>
                            ))}
                            <Link to="/servicii" className="px-6 py-3 text-white/40 italic text-sm ml-6 mb-2">
                              Explorează toate...
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => 
                        `block px-6 py-4 rounded-2xl text-lg font-medium transition-colors ${
                          isActive ? 'bg-white/10 text-white font-bold' : 'text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
