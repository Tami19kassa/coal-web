// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Project, Inquiry } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Auth state (Local only)
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('coal_admin_auth') === 'true';
  });

  // FETCH DATA FROM SUPABASE
  useEffect(() => {
    const fetchData = async () => {
      // 1. Get Projects
      const { data: projData, error: projError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projData) {
        // Map snake_case DB to camelCase Types
        const formattedProjects = projData.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          problem: p.problem,
          solution: p.solution,
          techUsed: p.tech_used || [],
          imageUrl: p.image_url,
          visitUrl: p.visit_url
        }));
        setProjects(formattedProjects);
      }

      // 2. Get Inquiries (Only if Admin, but we fetch all for now to keep state simple)
      if (isAdmin) {
        const { data: inqData } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (inqData) {
          const formattedInquiries = inqData.map((i: any) => ({
            id: i.id,
            name: i.name,
            email: i.email,
            budget: i.budget,
            timeline: i.timeline,
            message: i.message,
            timestamp: new Date(i.created_at).getTime()
          }));
          setInquiries(formattedInquiries);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [isAdmin]);

  // Pass these simple functions to AdminDashboard to trigger re-fetches
  const refreshData = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) {
      setProjects(data.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        problem: p.problem,
        solution: p.solution,
        techUsed: p.tech_used || [],
        imageUrl: p.image_url,
        visitUrl: p.visit_url
      })));
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-slate-300 font-sans">
        <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        
        <main className="flex-grow">
          {loading ? (
            <div className="h-screen flex items-center justify-center text-orange-500">INITIALIZING UPLINK...</div>
          ) : (
            <Routes>
              <Route path="/" element={<Home projects={projects} addInquiry={() => {}} />} />
              <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />  
              <Route 
                path="/admin" 
                element={
                  <AdminDashboard 
                    projects={projects} 
                    inquiries={inquiries} 
                    isAdmin={isAdmin} 
                    setIsAdmin={setIsAdmin}
                    onUpdate={refreshData} // We pass a refresh trigger instead of CRUD functions
                  />
                } 
              />
            </Routes>
          )}
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;