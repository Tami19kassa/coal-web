import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { BudgetOption } from '../types';

interface ContactFormProps {
  onSubmit: (inquiry: any) => void;
  budgets?: BudgetOption[];
}

const ContactForm: React.FC<ContactFormProps> = ({ budgets = [] }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', budget: '', timeline: '1-3 months', message: ''
  });
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const { error } = await supabase.from('inquiries').insert([formData]);
      if (error) throw error;
      setStatus('success');
      setFormData({ name: '', email: '', budget: '', timeline: '1-3 months', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) { setStatus('error'); }
  };

  const inputClass = "w-full bg-black border border-white/20 p-4 text-white focus:outline-none focus:border-cyan-500 font-mono text-sm placeholder-slate-600 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <input required placeholder="FULL NAME" className={inputClass} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <input required type="email" placeholder="EMAIL ENDPOINT" className={inputClass} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <select className={inputClass} value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
          <option value="">SELECT PROJECT TYPE & BUDGET</option>
          {budgets.map(b => (
            <option key={b.id} value={`${b.project_type}: ${b.amount}`}>
              {b.project_type} | {b.amount} ({b.timeline})
            </option>
          ))}
        </select>
        <select className={inputClass} value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})}>
          <option>&lt; 1 Month</option>
          <option>1-3 Months</option>
          <option>3-6 Months</option>
          <option>Flexible</option>
        </select>
      </div>
      <textarea required rows={4} placeholder="MISSION PARAMETERS (PROJECT DETAILS)" className={inputClass} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
      
      <button type="submit" disabled={status === 'sending' || status === 'success'} 
        className={`w-full font-black py-4 uppercase tracking-widest transition-all ${status === 'success' ? 'bg-green-600 text-black' : 'bg-cyan-600 text-black hover:bg-white'}`}>
        {status === 'sending' ? 'TRANSMITTING...' : status === 'success' ? 'UPLINK ESTABLISHED' : 'TRANSMIT DATA'}
      </button>
    </form>
  );
};

export default ContactForm;