import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, setIsAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
  ];

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('coal_admin_auth');
    setIsOpen(false); 
    navigate('/'); 
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Increased height slightly for logo */}
          
          <Link to="/" className="flex items-center space-x-3 group">
            {/* LOGO IMAGE REPLACEMENT */}
            <img 
              src="/logo.png" 
              alt="Coal Web Development" 
              className="h-12 w-auto object-contain" 
            />
            {/* 
               Optional: If your logo image ALREADY has text inside it, 
               you should delete this <span> block below so the text doesn't duplicate.
            */}
            <span className="font-bold text-xl tracking-tighter uppercase text-white group-hover:text-cyan-400 transition-colors">
              Coal<span className="text-cyan-500">Dev</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-cyan-500 ${
                  location.pathname === link.path ? 'text-cyan-500' : 'text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-xs border border-red-500/30 px-3 py-1.5 rounded hover:bg-red-500/10 transition-colors text-red-500 font-bold uppercase tracking-widest"
              >
                <span>Terminate Session</span>
                <LogOut className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-500"
                >
                  {link.name}
                </Link>
              ))}
              
              {isAdmin && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center space-x-2 text-base font-bold uppercase tracking-widest text-red-500 hover:text-red-400"
                >
                  <span>Terminate Session</span>
                  <LogOut className="w-4 h-4" />
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