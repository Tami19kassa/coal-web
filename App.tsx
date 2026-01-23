// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Project, Inquiry } from './types';
import { INITIAL_PROJECTS } from './constants';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Use lazy initialization to avoid parsing JSON on every render
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('coal_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch (e) {
      console.error("Data corruption detected", e);
      return INITIAL_PROJECTS;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem('coal_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('coal_admin_auth') === 'true';
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('coal_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('coal_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // CRUD Operations
  const addProject = (project: Project) => setProjects(prev => [...prev, project]);
  
  const deleteProject = (id: string) => {
    if (window.confirm('Confirm deletion of this deployment unit?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const updateProject = (updated: Project) => {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const addInquiry = (inquiry: Inquiry) => setInquiries(prev => [inquiry, ...prev]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-slate-300 font-sans selection:bg-orange-500 selection:text-white">
        <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home projects={projects} addInquiry={addInquiry} />} />
            <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />  
            <Route 
              path="/admin" 
              element={
                <AdminDashboard 
                  projects={projects} 
                  inquiries={inquiries} 
                  isAdmin={isAdmin} 
                  setIsAdmin={setIsAdmin}
                  addProject={addProject}
                  deleteProject={deleteProject}
                  updateProject={updateProject}
                />
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;