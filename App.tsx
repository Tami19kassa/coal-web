// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import { Project, Inquiry } from './types';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('coal_admin_auth') === 'true';
  });

  // FETCH DATA FUNCTION
  const fetchData = async () => {
    // Get Projects
    const { data: projData } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (projData) {
      const formattedProjects = projData.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        problem: p.problem,
        solution: p.solution,
        techUsed: p.tech_used || [], // Handle snake_case to camelCase
        imageUrl: p.image_url,
        visitUrl: p.visit_url
      }));
      setProjects(formattedProjects);
    }

    // Get Inquiries (Only if admin)
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
  };

  // Initial Load
  useEffect(() => {
    fetchData();
  }, [isAdmin]);

  return (
    <BrowserRouter>
      <RootLayout>
        <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          {/* CRITICAL FIX: Passing the state variable 'projects', NOT an empty array */}
          <Route path="/" element={<Home projects={projects} addInquiry={fetchData} />} />
          
          <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />
          
          <Route 
            path="/admin" 
            element={
              <AdminDashboard 
                projects={projects} 
                inquiries={inquiries} 
                isAdmin={isAdmin} 
                setIsAdmin={setIsAdmin} 
                onUpdate={fetchData} 
              />
            } 
          />
        </Routes>
        <Footer />
      </RootLayout>
    </BrowserRouter>
  );
};

export default App;