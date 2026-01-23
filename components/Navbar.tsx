import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Hammer, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, setIsAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. PUBLIC LINKS ONLY
  const navLinks = [
    { name: 'Home', path: '/' },
    // Note: Since we are using HashRouter/BrowserRouter, you can just link to sections
    // If you want smooth scroll to #projects, that requires a different approach, 
    // but for now, let's keep it simple.
  ];

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('coal_admin_auth');
    setIsOpen(false); 
    navigate('/'); // Kick user back to home after logout
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-orange-600 rounded-lg group-hover:bg-orange-500 transition-colors">
              <Hammer className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase text-white">
              Coal<span className="text-orange-500">Dev</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-orange-500 ${
                  location.pathname === link.path ? 'text-orange-500' : 'text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* 2. STEALTH LOGIC: Button only appears if you are ALREADY logged in */}
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
                  className="block text-base font-bold uppercase tracking-widest text-slate-400 hover:text-orange-500"
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