import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2, Edit2, Layout, Mail, X, Upload, ExternalLink, Loader2, Lock, Unlock } from 'lucide-react';
import { Project, Inquiry } from '../types';
import { supabase } from '../lib/supabase';
import { pageTransition } from '../lib/animations';

interface AdminDashboardProps {
  projects: Project[];
  inquiries: Inquiry[];
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onUpdate: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  projects, inquiries, isAdmin, setIsAdmin, onUpdate 
}) => {
  const [password, setPassword] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Project>({
    id: '', title: '', description: '', problem: '', solution: '', techUsed: [], imageUrl: '', visitUrl: ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const fileName = `${Date.now()}.${file.name.split('.').pop()}`;
      const { error: upErr } = await supabase.storage.from('images').upload(fileName, file);
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('images').getPublicUrl(fileName);
      setForm(prev => ({ ...prev, imageUrl: data.publicUrl }));
    } catch (err: any) { alert('Upload failed: ' + err.message); } 
    finally { setIsUploading(false); }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { 
      setIsAdmin(true);
      localStorage.setItem('coal_admin_auth', 'true');
    } else { setError('ACCESS DENIED'); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title, description: form.description, problem: form.problem, 
      solution: form.solution, tech_used: form.techUsed, image_url: form.imageUrl, visit_url: form.visitUrl
    };
    try {
      if (editingId) await supabase.from('projects').update(payload).eq('id', editingId);
      else await supabase.from('projects').insert([payload]);
      await onUpdate(); setIsAdding(false); setForm({ id: '', title: '', description: '', problem: '', solution: '', techUsed: [], imageUrl: '', visitUrl: '' });
    } catch (err: any) { alert('DB Error: ' + err.message); }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('CONFIRM TERMINATION?')) {
      await supabase.from('projects').delete().eq('id', id);
      await onUpdate();
    }
  };

  if (!isAdmin) {
    return (
      <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition} className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="w-full max-w-md p-8 border border-white/10 bg-black relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse" />
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-white">Restricted Area</h2>
            <p className="text-xs text-red-600 font-mono mt-2">AUTHORIZATION REQUIRED</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" placeholder="ENTER KEY" className="w-full bg-zinc-900 border border-red-900/50 p-4 text-center text-white font-mono tracking-[0.5em] focus:outline-none focus:border-red-600" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <div className="text-red-600 text-center font-black text-xs animate-bounce">{error}</div>}
            <button type="submit" className="w-full bg-red-900/20 text-red-500 border border-red-600 py-4 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Authenticate</button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition} className="pt-24 min-h-screen bg-[#0a0a0a] font-mono">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white flex items-center">
            <Unlock className="mr-4 text-green-500" /> Command <span className="text-orange-500">Center</span>
          </h1>
          <button onClick={() => setIsAdding(true)} className="bg-orange-600 text-black font-bold px-6 py-3 uppercase tracking-widest hover:bg-white transition-all flex items-center">
            <PlusCircle className="mr-2 w-4 h-4" /> Initialize Unit
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center"><Layout className="w-4 h-4 mr-2" /> Active Deployments</div>
            {projects.map(p => (
              <motion.div layout key={p.id} className="bg-zinc-900 border border-white/5 p-6 flex items-center gap-6 hover:border-orange-500/50 transition-colors">
                <img src={p.imageUrl} className="w-20 h-20 object-cover grayscale" />
                <div className="flex-grow">
                  <h3 className="font-bold text-white uppercase">{p.title}</h3>
                  <div className="text-[10px] text-slate-500 mt-1">{p.techUsed.join(' // ')}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setForm(p); setEditingId(p.id); setIsAdding(true); }} className="p-2 hover:bg-white/10 text-white"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-900/20 text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center"><Mail className="w-4 h-4 mr-2" /> Incoming Signals</div>
            <div className="space-y-2 h-[600px] overflow-y-auto bg-black border border-white/10 p-4">
              {inquiries.map((i, idx) => (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }} key={i.id} className="p-4 border-l-2 border-orange-500 bg-white/5 mb-2">
                  <div className="flex justify-between text-[10px] text-slate-500 uppercase mb-2">
                    <span>{i.name}</span>
                    <span>{new Date(i.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-white text-xs leading-relaxed">"{i.message}"</p>
                  <div className="mt-2 text-[10px] text-orange-500 font-bold">{i.email}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#111] border border-white/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-black uppercase text-white">System Config</h2>
                <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white"><X /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input placeholder="PROJECT TITLE" required className="bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                  <input placeholder="EXTERNAL LINK" required className="bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={form.visitUrl} onChange={e => setForm({...form, visitUrl: e.target.value})} />
                </div>
                <div className="border border-white/10 p-4 bg-black flex items-center justify-between cursor-pointer hover:border-orange-500" onClick={() => fileInputRef.current?.click()}>
                  <span className="text-xs text-slate-500 uppercase font-bold">{isUploading ? 'UPLOADING...' : form.imageUrl ? 'IMAGE LOCKED' : 'UPLOAD VISUAL ASSET'}</span>
                  <Upload className="w-4 h-4 text-white" />
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <textarea rows={5} placeholder="STRUCTURAL DEFICIT (PROBLEM)" className="bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={form.problem} onChange={e => setForm({...form, problem: e.target.value})} />
                  <textarea rows={5} placeholder="ENGINEERED SOLUTION" className="bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={form.solution} onChange={e => setForm({...form, solution: e.target.value})} />
                </div>
                <input placeholder="TECH STACK (COMMA SEPARATED)" required className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={form.techUsed.join(', ')} onChange={e => setForm({...form, techUsed: e.target.value.split(', ')})} />
                <button disabled={isUploading} className="w-full bg-orange-600 text-white font-black py-4 uppercase tracking-widest hover:bg-orange-500">CONFIRM DEPLOYMENT</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboard;