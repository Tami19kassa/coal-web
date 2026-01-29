import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Terminal, Activity, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, setIsAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. UPDATED LINKS (Using IDs for scrolling)
  const navLinks = [
    { name: 'Home', path: '/', icon: Terminal },
    { name: 'Deployments', path: '/#projects', icon: Activity },
    { name: 'Uplink', path: '/#contact', icon: Wifi },
  ];

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('coal_admin_auth');
    setIsOpen(false); 
    navigate('/'); 
  };

  // Helper to handle smooth scrolling or navigation
  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      // If we are already on home, just scroll
      if (location.pathname === '/') {
        const element = document.getElementById(elementId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If on another page, navigate to home then hash
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo.png" 
              alt="Coal Web Development" 
              className="h-10 w-auto object-contain filter brightness-110" 
            />
            <span className="font-black text-xl tracking-tighter uppercase text-white group-hover:text-cyan-400 transition-colors">
              Coal<span className="text-cyan-500">Dev</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-cyan-500 flex items-center group ${
                  location.hash === link.path.replace('/', '') ? 'text-cyan-500' : 'text-slate-400'
                }`}
              >
                <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-cyan-500 mr-2">
                  &gt;
                </span>
                {link.name}
              </button>
            ))}
            
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-[10px] border border-red-500/30 px-4 py-2 bg-red-500/5 hover:bg-red-500/20 transition-colors text-red-500 font-black uppercase tracking-widest"
              >
                <span>Terminate Session</span>
                <LogOut className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* MOBILE MENU BTN */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cyan-500 hover:text-white transition-colors"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-cyan-500/30 overflow-hidden"
          >
            <div className="px-6 pt-6 pb-8 space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className="w-full flex items-center space-x-4 text-left group"
                >
                  <div className="p-2 bg-white/5 border border-white/10 group-hover:border-cyan-500 group-hover:text-cyan-500 transition-colors text-slate-400">
                    <link.icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-black uppercase tracking-widest text-slate-300 group-hover:text-white group-hover:translate-x-2 transition-transform">
                    {link.name}
                  </span>
                </button>
              ))}
              
              {isAdmin && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center space-x-4 pt-4 border-t border-white/10"
                >
                  <div className="p-2 bg-red-900/20 border border-red-500/30 text-red-500">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest text-red-500">
                    Terminate Session
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;