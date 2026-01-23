// src/pages/AdminDashboard.tsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2, Edit2, Layout, Mail, X, Upload, ExternalLink, Loader2 } from 'lucide-react';
import { Project, Inquiry } from '../types';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
  projects: Project[];
  inquiries: Inquiry[];
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onUpdate: () => void; // Trigger to refresh App state
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
    id: '',
    title: '',
    description: '',
    problem: '',
    solution: '',
    techUsed: [],
    imageUrl: '', 
    visitUrl: ''
  });

  // --- SUPABASE IMAGE UPLOAD ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Upload to 'images' bucket
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Get Public URL
      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      
      setForm(prev => ({ ...prev, imageUrl: data.publicUrl }));
    } catch (err) {
      alert('Upload failed: ' + (err as any).message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { 
      setIsAdmin(true);
      localStorage.setItem('coal_admin_auth', 'true');
      setError('');
    } else {
      setError('Access Denied: Invalid Credentials.');
    }
  };

  // --- SUPABASE SAVE (INSERT/UPDATE) ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dbPayload = {
      title: form.title,
      description: form.description,
      problem: form.problem,
      solution: form.solution,
      tech_used: form.techUsed,
      image_url: form.imageUrl,
      visit_url: form.visitUrl
    };

    try {
      if (editingId) {
        // UPDATE
        const { error } = await supabase
          .from('projects')
          .update(dbPayload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        // INSERT
        const { error } = await supabase
          .from('projects')
          .insert([dbPayload]);
        if (error) throw error;
      }
      
      await onUpdate(); // Refresh the app
      setIsAdding(false);
      resetForm();
    } catch (err) {
      alert('Database Operation Failed: ' + (err as any).message);
    }
  };

  // --- SUPABASE DELETE ---
  const handleDelete = async (id: string) => {
    if (!window.confirm('Terminate this deployment?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      await onUpdate();
    } catch (err) {
      alert('Delete failed: ' + (err as any).message);
    }
  }

  const resetForm = () => {
    setForm({
      id: '',
      title: '',
      description: '',
      problem: '',
      solution: '',
      techUsed: [],
      imageUrl: '',
      visitUrl: ''
    });
    setEditingId(null);
  };

  const startEdit = (p: Project) => {
    setForm(p);
    setEditingId(p.id);
    setIsAdding(true);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#0a0a0a]">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111] p-10 rounded-3xl border border-white/10 max-w-md w-full shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-center mb-8"><Layout className="text-orange-500 w-12 h-12" /></div>
          <h2 className="text-3xl font-bold text-center mb-8 uppercase tracking-tight text-white">System Locked</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white text-center text-2xl tracking-[0.5em]" placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-red-500 text-xs text-center uppercase font-bold">{error}</p>}
            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl uppercase tracking-widest">Authenticate</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-white">Command <span className="text-orange-500">Center</span></h1>
          <button onClick={() => { resetForm(); setIsAdding(true); }} className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center uppercase tracking-widest text-xs shadow-lg transition-all">
            <PlusCircle className="mr-2 w-5 h-5" /> Deploy New
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
             {projects.map((project) => (
              <motion.div key={project.id} layout className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center group hover:border-white/20 transition-all">
                <img src={project.imageUrl} className="w-24 h-24 rounded-lg object-cover border border-white/10" alt="" />
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">{project.title}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                    {project.techUsed.slice(0, 3).map(t => (<span key={t} className="text-[9px] font-bold uppercase tracking-tighter text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">{t}</span>))}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => startEdit(project)} className="p-3 bg-white/5 rounded-xl hover:bg-blue-600/20 hover:text-blue-500 transition-colors"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(project.id)} className="p-3 bg-white/5 rounded-xl hover:bg-red-600/20 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              {inquiries.map((inq) => (
                <motion.div key={inq.id} className="bg-[#111] border border-white/5 p-6 rounded-2xl border-l-2 border-l-orange-500">
                  <h4 className="font-bold text-white uppercase text-sm">{inq.name}</h4>
                  <p className="text-xs text-orange-500 font-bold mb-2">{inq.email}</p>
                  <p className="text-xs text-slate-400 leading-relaxed italic border-l border-white/10 pl-3">"{inq.message}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-[#0f0f0f] border border-white/10 p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white">{editingId ? 'Modify System' : 'Initialize System'}</h2>
                <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white p-2 transition-colors"><X /></button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Project Title</label>
                  <input required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Visual Resource</label>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                    <div onClick={() => fileInputRef.current?.click()} className="w-full h-[120px] bg-[#1a1a1a] border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-white/5 transition-all overflow-hidden relative">
                      {isUploading ? (
                        <div className="flex items-center space-x-2 text-orange-500"><Loader2 className="animate-spin" /> <span>UPLOADING...</span></div>
                      ) : form.imageUrl ? (
                        <>
                          <img src={form.imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                          <div className="relative z-10 bg-black/70 px-3 py-1 rounded text-xs font-bold text-white flex items-center"><Edit2 className="w-3 h-3 mr-2" /> Change Image</div>
                        </>
                      ) : (
                        <><Upload className="w-6 h-6 text-slate-500 mb-2" /><span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Upload Image</span></>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">External Link URL</label>
                    <div className="relative">
                      <input required type="url" placeholder="https://example.com" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-4 pr-10 py-3 text-white focus:outline-none focus:border-orange-500 text-sm" value={form.visitUrl} onChange={(e) => setForm({...form, visitUrl: e.target.value})} />
                      {form.visitUrl && (
                        <a href={form.visitUrl} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-3.5 text-slate-500 hover:text-orange-500 transition-colors" title="Test Link"><ExternalLink className="w-4 h-4" /></a>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Mission Brief</label>
                  <input required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
                </div>

                <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Case Study Analysis</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <textarea required rows={5} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 resize-none" value={form.problem} onChange={(e) => setForm({...form, problem: e.target.value})} placeholder="Structural Deficit (Problem)..." />
                    <textarea required rows={5} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 resize-none" value={form.solution} onChange={(e) => setForm({...form, solution: e.target.value})} placeholder="Engineered Solution..." />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tech Loadout (Comma separated)</label>
                  <input required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" value={form.techUsed.join(', ')} onChange={(e) => setForm({...form, techUsed: e.target.value.split(',').map(s => s.trim())})} />
                </div>

                <button type="submit" disabled={isUploading} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-widest shadow-lg hover:shadow-orange-500/20 disabled:opacity-50">
                  {editingId ? 'Confirm Modification' : 'Initiate Deployment'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;