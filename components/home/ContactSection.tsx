// src/components/home/ContactSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Send, Radio, Shield, Cpu } from 'lucide-react';
import ContactForm from '../ContactForm';
import { fadeInUp, staggerContainer } from '../../lib/animations';

interface ContactSectionProps {
  addInquiry: (inquiry: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ addInquiry }) => {
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
          <div className="inline-flex items-center space-x-2 text-orange-500 mb-6 border border-orange-500/30 px-4 py-2 bg-orange-500/5 rounded-full">
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Transmission Channel Open</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter leading-none mb-6">
            Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-600">Uplink</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">
            Initiate communication sequence. Our engineering team is on standby for high-priority project deployment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Left Panel: Status Info */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: Shield, label: "Protocol", value: "ENCRYPTED_TLS_1.3" },
              { icon: Cpu, label: "Response Time", value: "< 24 HOURS" },
              { icon: Send, label: "Route", value: "DIRECT_TO_ENGINEERING" }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white/5 border border-white/10 p-6 flex items-center space-x-4">
                <div className="p-3 bg-black border border-white/10 text-orange-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{item.label}</div>
                  <div className="font-mono text-white font-bold">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Panel: The Terminal Form */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 bg-[#080808] border-2 border-white/10 p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative Corner bits */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500" />
            
            <div className="mb-8 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="text-xs font-mono text-green-500">TERMINAL_ACTIVE</span>
            </div>

            <ContactForm onSubmit={addInquiry} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};