// src/pages/Home.tsx
import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { ProjectsGrid } from '../components/home/ProjectsGrid';
import { ContactSection } from '../components/home/ContactSection';
import { Project, Inquiry } from '../types';

interface HomeProps { projects: Project[]; addInquiry: (inquiry: Inquiry) => void; }

const Home: React.FC<HomeProps> = ({ projects, addInquiry }) => {
  return (
    // FIX: Transparent container so RootLayout shows through
    <div className="flex flex-col">
      <Hero />
      {/* 
         Features, Projects, and Contact usually have their own backgrounds. 
         If you want the image to show through those too, go into those files 
         and change 'bg-[#050505]' to 'bg-black/80' or 'bg-transparent'.
         
         For example, in Features.tsx, change:
         className="py-40 px-4 bg-[#050505]..." 
         to 
         className="py-40 px-4 bg-black/80..."
      */}
      <Features />
      <ProjectsGrid projects={projects} />
      <ContactSection addInquiry={addInquiry} />
    </div>
  );
};

export default Home;