
import React from 'react';
import { Hammer, Github, Twitter, Linkedin, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-1.5 bg-orange-600 rounded-lg">
                <Hammer className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tighter uppercase text-white">
                Coal<span className="text-orange-500">Dev</span>
              </span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8">
              Coal Web Development PLC is a boutique engineering firm focused on building heavy-duty web solutions for high-stakes industries. Engineered to perform. Built to last.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 glass rounded-lg hover:text-orange-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 glass rounded-lg hover:text-orange-500 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="p-2 glass rounded-lg hover:text-orange-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-white">Navigation</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Front Page</a></li>
              <li><a href="#projects" className="hover:text-orange-500 transition-colors">Our Deployments</a></li>
              <li><a href="#estimator" className="hover:text-orange-500 transition-colors">Pricing Engine</a></li>
              <li><a href="#contact" className="hover:text-orange-500 transition-colors">Logistics</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-white">Security</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="/#/admin" className="hover:text-orange-500 transition-colors flex items-center">
                <Terminal className="w-3 h-3 mr-2" /> Admin Terminal
              </a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Data Protocol</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Service SLA</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs uppercase font-bold tracking-widest">
            © {new Date().getFullYear()} Coal Web Development PLC. All systems nominal.
          </p>
          <div className="text-slate-600 text-[10px] uppercase font-bold tracking-[0.2em]">
            ISO-9001 Compliant Engineering
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
