import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Phone, MapPin, Radio } from 'lucide-react';
import ContactForm from '../ContactForm';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { SiteSettings, BudgetOption } from '../../types';

interface ContactSectionProps {
  addInquiry: (inquiry: any) => void;
  settings?: SiteSettings;
  budgets?: BudgetOption[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ addInquiry, settings, budgets }) => {
  return (
    <section id="contact" className="py-40 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center space-x-2 text-cyan-500 mb-6 border border-cyan-500/30 px-4 py-2 bg-cyan-500/5 rounded-full">
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Transmission Channel Open</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter leading-none mb-6">
            Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Uplink</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">
            {settings?.tagline || "Initiate communication sequence. Our engineering team is on standby."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Left Panel: Dynamic Contact Info */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {/* EMAILS LIST */}
            <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-6 flex items-start space-x-4 hover:border-cyan-500/30 transition-colors">
              <div className="p-3 bg-black border border-white/10 text-cyan-500 mt-1">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Email Uplinks</div>
                {settings?.emails && settings.emails.length > 0 ? (
                  settings.emails.map((email, i) => (
                    <div key={i} className="font-mono text-white font-bold break-all mb-1 border-b border-white/5 pb-1 last:border-0 last:pb-0">
                      {email}
                    </div>
                  ))
                ) : (
                  <div className="font-mono text-white font-bold">info@coaldev.et</div>
                )}
              </div>
            </motion.div>

            {/* PHONES LIST */}
            {settings?.phones && settings.phones.length > 0 && (
              <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-6 flex items-start space-x-4 hover:border-cyan-500/30 transition-colors">
                <div className="p-3 bg-black border border-white/10 text-cyan-500 mt-1">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Voice Lines</div>
                  {settings.phones.map((phone, i) => (
                    <div key={i} className="font-mono text-white font-bold mb-1 border-b border-white/5 pb-1 last:border-0 last:pb-0">
                      {phone}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ADDRESS */}
            {settings?.address && (
              <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-6 flex items-center space-x-4 hover:border-cyan-500/30 transition-colors">
                <div className="p-3 bg-black border border-white/10 text-cyan-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Physical Coordinates</div>
                  <div className="font-mono text-white font-bold">{settings.address}</div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Panel: The Form */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 bg-black/40 backdrop-blur-md border-2 border-white/10 p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative Corner bits */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-500" />
            
            <div className="mb-8 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="text-xs font-mono text-green-500">TERMINAL_ACTIVE</span>
            </div>

            {/* Pass Budgets to Form */}
            <ContactForm onSubmit={addInquiry} budgets={budgets} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;