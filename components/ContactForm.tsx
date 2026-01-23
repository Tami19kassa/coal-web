// src/components/ContactForm.tsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface ContactFormProps {
  onSubmit: (inquiry: any) => void;
}

const ContactForm: React.FC<ContactFormProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$5k - $10k',
    timeline: '1-3 months',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);

    try {
      const { error } = await supabase.from('inquiries').insert([{
        name: formData.name,
        email: formData.email,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message
      }]);

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        budget: '$5k - $10k',
        timeline: '1-3 months',
        message: ''
      });
      setTimeout(() => setIsSubmitted(false), 5000);

    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
          <input required type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Endpoint</label>
          <input required type="email" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Project Budget</label>
          <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
            <option>$2k - $5k</option>
            <option>$5k - $10k</option>
            <option>$10k - $25k</option>
            <option>$25k+</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Project Timeline</label>
          <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none" value={formData.timeline} onChange={(e) => setFormData({...formData, timeline: e.target.value})}>
            <option>&lt; 1 month</option>
            <option>1-3 months</option>
            <option>3-6 months</option>
            <option>Flexible</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Mission Parameters</label>
        <textarea required rows={4} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none" placeholder="Describe your project goals..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
      </div>

      <button type="submit" className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${isSubmitted ? 'bg-green-600 text-white cursor-default' : 'bg-orange-600 hover:bg-orange-500 text-white'}`} disabled={isSubmitted}>
        {isSubmitted ? 'Mission Sent' : 'Transmit Data'}
      </button>

      {isSubmitted && <p className="text-center text-xs text-green-500 font-bold uppercase animate-pulse">Communications link established.</p>}
      {isError && <p className="text-center text-xs text-red-500 font-bold uppercase">Transmission Failed.</p>}
    </form>
  );
};

export default ContactForm;