// src/pages/Home.tsx
import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { ProjectsGrid } from '../components/home/ProjectsGrid';
import { ContactSection } from '../components/home/ContactSection';
import { Project, Inquiry } from '../types';

interface HomeProps {
  projects: Project[];
  addInquiry: (inquiry: Inquiry) => void;
}

const Home: React.FC<HomeProps> = ({ projects, addInquiry }) => {
  return (
    // Removed "bg-[#050505]" class. Now transparent to show RootLayout background.
    <div className="flex flex-col">
      <Hero />
      <Features />
      <ProjectsGrid projects={projects} />
      <ContactSection addInquiry={addInquiry} />
    </div>
  );
};

export default Home;