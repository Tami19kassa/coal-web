import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import { Project, Inquiry, SiteSettings, SocialLink, BudgetOption } from './types';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    email: 'info@coaldev.et', address: 'Addis Ababa', phone: '', tagline: 'Forging digital excellence.'
  });
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [budgets, setBudgets] = useState<BudgetOption[]>([]);
  
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('coal_admin_auth') === 'true');

  const fetchData = async () => {
    // 1. Projects
    const { data: p } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (p) setProjects(p.map((x: any) => ({ ...x, techUsed: x.tech_used, imageUrl: x.image_url, visitUrl: x.visit_url })));

    // 2. Settings
    const { data: s } = await supabase.from('site_settings').select('*').single();
    if (s) setSettings(s);

    // 3. Socials
    const { data: soc } = await supabase.from('social_links').select('*').order('platform');
    if (soc) setSocials(soc);

    // 4. Budgets
    const { data: b } = await supabase.from('budget_options').select('*').order('sort_order');
    if (b) setBudgets(b);

    // 5. Inquiries
    if (isAdmin) {
      const { data: i } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (i) setInquiries(i.map((x: any) => ({ ...x, timestamp: new Date(x.created_at).getTime() })));
    }
  };

  useEffect(() => { fetchData(); }, [isAdmin]);

  return (
    <BrowserRouter>
      <RootLayout>
        <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/" element={<Home projects={projects} addInquiry={fetchData} settings={settings} budgets={budgets} />} />
          <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />
          <Route 
            path="/admin" 
            element={
              <AdminDashboard 
                projects={projects} 
                inquiries={inquiries} 
                settings={settings}
                socials={socials}
                budgets={budgets}
                isAdmin={isAdmin} 
                setIsAdmin={setIsAdmin} 
                onUpdate={fetchData} 
              />
            } 
          />
        </Routes>
        <Footer settings={settings} socials={socials.filter(s => s.is_active)} />
      </RootLayout>
    </BrowserRouter>
  );
};

export default App;