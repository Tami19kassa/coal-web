import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2, Edit2, Layout, Mail, X, Upload, Lock, Unlock, Settings, ToggleLeft, ToggleRight, Save, Globe, DollarSign } from 'lucide-react';
import { Project, Inquiry, SiteSettings, SocialLink, BudgetOption } from '../types';
import { supabase } from '../lib/supabase';
import { pageTransition } from '../lib/animations';

interface AdminDashboardProps {
  projects: Project[];
  inquiries: Inquiry[];
  settings: SiteSettings;
  socials: SocialLink[];
  budgets: BudgetOption[];
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onUpdate: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  projects, inquiries, settings, socials, budgets, isAdmin, setIsAdmin, onUpdate 
}) => {
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'config' | 'form'>('projects');
  
  // Project State
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projectForm, setProjectForm] = useState<Project>({
    id: '', title: '', description: '', problem: '', solution: '', techUsed: [], imageUrl: '', visitUrl: ''
  });

  // Config State
  const [configForm, setConfigForm] = useState<SiteSettings>(settings);
  const [socialForm, setSocialForm] = useState<SocialLink[]>(socials);
  
  // Budget State
  const [newBudget, setNewBudget] = useState('');

  // Sync state when props change (Important for initial load)
  useEffect(() => {
    setConfigForm(settings);
    setSocialForm(socials);
  }, [settings, socials]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { 
      setIsAdmin(true);
      localStorage.setItem('coal_admin_auth', 'true');
    } else { alert('ACCESS DENIED'); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const fileName = `${Date.now()}.${file.name.split('.').pop()}`;
      const { error: upErr } = await supabase.storage.from('images').upload(fileName, file);
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('images').getPublicUrl(fileName);
      setProjectForm(prev => ({ ...prev, imageUrl: data.publicUrl }));
    } catch (err: any) { alert('Upload failed: ' + err.message); } 
    finally { setIsUploading(false); }
  };

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: projectForm.title, description: projectForm.description, problem: projectForm.problem, 
      solution: projectForm.solution, tech_used: projectForm.techUsed, image_url: projectForm.imageUrl, visit_url: projectForm.visitUrl
    };
    try {
      if (editingId) await supabase.from('projects').update(payload).eq('id', editingId);
      else await supabase.from('projects').insert([payload]);
      await onUpdate(); setIsAdding(false);
    } catch (err: any) { alert('DB Error: ' + err.message); }
  };

  const deleteProject = async (id: string) => {
    if (window.confirm('CONFIRM TERMINATION?')) {
      await supabase.from('projects').delete().eq('id', id);
      await onUpdate();
    }
  };

  const saveConfig = async () => {
    try {
      // 1. Update Settings
      await supabase.from('site_settings').update(configForm).eq('id', settings.id || 1);
      
      // 2. Update Socials (Loop through all and update)
      for (const link of socialForm) {
        await supabase.from('social_links').update({ 
          url: link.url, 
          is_active: link.is_active 
        }).eq('id', link.id);
      }
      
      await onUpdate();
      alert("SYSTEM CONFIGURATION & SOCIALS UPDATED");
    } catch (err: any) { alert("Config Save Failed: " + err.message); }
  };

  // Toggle local state for social active status
  const toggleSocial = (id: string) => {
    setSocialForm(prev => prev.map(s => s.id === id ? { ...s, is_active: !s.is_active } : s));
  };

  // Update local state for social URL
  const updateSocialUrl = (id: string, url: string) => {
    setSocialForm(prev => prev.map(s => s.id === id ? { ...s, url } : s));
  };

  const addBudget = async () => {
    if (!newBudget) return;
    await supabase.from('budget_options').insert([{ label: newBudget, sort_order: budgets.length + 1 }]);
    setNewBudget('');
    await onUpdate();
  };

  const deleteBudget = async (id: string) => {
    await supabase.from('budget_options').delete().eq('id', id);
    await onUpdate();
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-md p-8 border border-cyan-900/50 bg-black/80 backdrop-blur-md">
          <Lock className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-white text-center mb-8">Secure Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" placeholder="ENTER KEY" className="w-full bg-cyan-900/10 border border-cyan-500/30 p-4 text-center text-white tracking-[0.5em] focus:border-cyan-500 outline-none" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="w-full bg-cyan-600 text-black font-bold py-4 uppercase tracking-widest hover:bg-white transition-all">Authenticate</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition} className="pt-24 min-h-screen bg-black/90 font-mono text-sm">
      <div className="max-w-7xl mx-auto px-4 pb-20">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6 gap-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white flex items-center">
            <Unlock className="mr-4 text-green-500" /> Command <span className="text-cyan-500">Center</span>
          </h1>
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('projects')} className={`px-6 py-2 uppercase font-bold tracking-widest border transition-all ${activeTab === 'projects' ? 'bg-cyan-600 text-black' : 'bg-transparent text-slate-500 border border-white/10'}`}>Deployments</button>
            <button onClick={() => setActiveTab('config')} className={`px-6 py-2 uppercase font-bold tracking-widest border transition-all ${activeTab === 'config' ? 'bg-cyan-600 text-black' : 'bg-transparent text-slate-500 border border-white/10'}`}>Global Config</button>
            <button onClick={() => setActiveTab('form')} className={`px-6 py-2 uppercase font-bold tracking-widest border transition-all ${activeTab === 'form' ? 'bg-cyan-600 text-black' : 'bg-transparent text-slate-500 border border-white/10'}`}>Form Data</button>
          </div>
        </div>

        {/* --- PROJECTS TAB --- */}
        {activeTab === 'projects' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center"><Layout className="w-4 h-4 mr-2" /> Active Units</h3>
                <button onClick={() => { setProjectForm({id: '', title: '', description: '', problem: '', solution: '', techUsed: [], imageUrl: '', visitUrl: ''}); setEditingId(null); setIsAdding(true); }} className="bg-cyan-600 text-black font-bold px-4 py-2 uppercase text-xs flex items-center"><PlusCircle className="mr-2 w-4 h-4" /> New</button>
              </div>
              {projects.map(p => (
                <div key={p.id} className="bg-white/5 border border-white/10 p-4 flex items-center gap-6 hover:border-cyan-500/50 transition-colors">
                  <img src={p.imageUrl} className="w-16 h-16 object-cover grayscale border border-white/10" alt="" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-white uppercase">{p.title}</h3>
                    <div className="text-[10px] text-slate-500">{p.techUsed.join(' // ')}</div>
                  </div>
                  <button onClick={() => { setProjectForm(p); setEditingId(p.id); setIsAdding(true); }} className="p-2 hover:bg-white/10 text-cyan-400"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => deleteProject(p.id)} className="p-2 hover:bg-red-900/20 text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            
            <div className="bg-black border border-white/10 p-4 h-[600px] flex flex-col">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center"><Mail className="w-4 h-4 mr-2" /> Intercepted Signals</div>
              <div className="flex-grow overflow-y-auto space-y-2 pr-2">
                {inquiries.map((i) => (
                  <div key={i.id} className="p-4 border-l-2 border-cyan-500 bg-white/5">
                    <div className="flex justify-between text-[10px] text-slate-400 uppercase mb-2">
                      <span>{i.name}</span>
                      <span>{new Date(i.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-white text-xs mb-2">"{i.message}"</p>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-cyan-500">{i.email}</span>
                      <span className="bg-white/10 px-2 py-0.5 rounded">{i.budget}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- CONFIGURATION TAB (SETTINGS & SOCIALS) --- */}
        {activeTab === 'config' && (
          <div className="max-w-4xl mx-auto">
            {/* Site Settings */}
            <div className="bg-black/50 border border-white/10 p-8 mb-8">
              <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center"><Globe className="mr-3 text-cyan-500" /> Global Contact Data</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Company Email</label>
                  <input className="w-full bg-black border border-white/20 p-3 text-white focus:border-cyan-500 outline-none" value={configForm.email} onChange={e => setConfigForm({...configForm, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Phone Uplink</label>
                  <input className="w-full bg-black border border-white/20 p-3 text-white focus:border-cyan-500 outline-none" value={configForm.phone} onChange={e => setConfigForm({...configForm, phone: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Physical Coordinates (Address)</label>
                  <input className="w-full bg-black border border-white/20 p-3 text-white focus:border-cyan-500 outline-none" value={configForm.address} onChange={e => setConfigForm({...configForm, address: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Mission Statement (Tagline)</label>
                  <input className="w-full bg-black border border-white/20 p-3 text-white focus:border-cyan-500 outline-none" value={configForm.tagline} onChange={e => setConfigForm({...configForm, tagline: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Social Media Matrix */}
            <div className="bg-black/50 border border-white/10 p-8">
              <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center"><Settings className="mr-3 text-cyan-500" /> Social Matrix</h3>
              <p className="text-slate-500 text-xs mb-6">Toggle the switch to display the icon on the footer. Enter full URL.</p>
              <div className="space-y-4">
                {socialForm.map((link) => (
                  <div key={link.id} className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 hover:border-cyan-500/30 transition-colors">
                    <button onClick={() => toggleSocial(link.id)} className={`transition-colors ${link.is_active ? 'text-green-500' : 'text-slate-600'}`}>
                      {link.is_active ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                    </button>
                    <div className="w-24 font-bold text-white uppercase text-xs">{link.platform}</div>
                    <input 
                      className="flex-grow bg-black border border-white/10 p-2 text-xs text-slate-300 focus:border-cyan-500 outline-none placeholder-slate-700" 
                      placeholder={`https://...`}
                      value={link.url}
                      onChange={(e) => updateSocialUrl(link.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={saveConfig} className="bg-green-600 text-black font-bold px-8 py-4 uppercase tracking-widest hover:bg-white transition-all flex items-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <Save className="mr-2 w-5 h-5" /> Commit System Changes
              </button>
            </div>
          </div>
        )}

        {/* --- FORM DATA TAB (BUDGETS) --- */}
        {activeTab === 'form' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/50 border border-white/10 p-8">
              <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center"><DollarSign className="mr-3 text-cyan-500" /> Project Budget Ranges</h3>
              
              <div className="flex gap-4 mb-8">
                <input 
                  className="flex-grow bg-black border border-white/20 p-3 text-white focus:border-cyan-500 outline-none" 
                  placeholder="e.g. 500,000 - 1,000,000 ETB"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                />
                <button onClick={addBudget} className="bg-cyan-600 text-black font-bold px-6 uppercase text-xs">Add Range</button>
              </div>

              <div className="space-y-2">
                {budgets.map((b) => (
                  <div key={b.id} className="flex justify-between items-center p-4 bg-white/5 border border-white/10">
                    <span className="text-white font-mono">{b.label}</span>
                    <button onClick={() => deleteBudget(b.id)} className="text-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL FOR PROJECTS (Kept as is) --- */}
        <AnimatePresence>
          {isAdding && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#050505] border border-cyan-500/30 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative">
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                  <h2 className="text-2xl font-black uppercase text-white">Unit Configuration</h2>
                  <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white"><X /></button>
                </div>
                <form onSubmit={saveProject} className="space-y-6">
                  {/* ... Project Form Fields (same as previous) ... */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <input placeholder="PROJECT TITLE" required className="bg-black border border-white/10 p-4 text-white focus:border-cyan-500 outline-none" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
                    <input placeholder="EXTERNAL LINK" required className="bg-black border border-white/10 p-4 text-white focus:border-cyan-500 outline-none" value={projectForm.visitUrl} onChange={e => setProjectForm({...projectForm, visitUrl: e.target.value})} />
                  </div>
                  <div className="border border-white/10 p-4 bg-black flex items-center justify-between cursor-pointer hover:border-cyan-500" onClick={() => fileInputRef.current?.click()}>
                    <span className="text-xs text-slate-500 uppercase font-bold">{isUploading ? 'UPLOADING...' : projectForm.imageUrl ? 'IMAGE LOCKED' : 'UPLOAD VISUAL ASSET'}</span>
                    <Upload className="w-4 h-4 text-white" />
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <textarea rows={5} placeholder="STRUCTURAL DEFICIT (PROBLEM)" className="bg-black border border-white/10 p-4 text-white focus:border-cyan-500 outline-none" value={projectForm.problem} onChange={e => setProjectForm({...projectForm, problem: e.target.value})} />
                    <textarea rows={5} placeholder="ENGINEERED SOLUTION" className="bg-black border border-white/10 p-4 text-white focus:border-cyan-500 outline-none" value={projectForm.solution} onChange={e => setProjectForm({...projectForm, solution: e.target.value})} />
                  </div>
                  <input placeholder="TECH STACK (COMMA SEPARATED)" required className="w-full bg-black border border-white/10 p-4 text-white focus:border-cyan-500 outline-none" value={projectForm.techUsed.join(', ')} onChange={e => setProjectForm({...projectForm, techUsed: e.target.value.split(', ')})} />
                  <button disabled={isUploading} className="w-full bg-cyan-600 text-black font-black py-4 uppercase tracking-widest hover:bg-white transition-colors">INITIALIZE DEPLOYMENT</button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;