// src/pages/Home.tsx
import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { ProjectsGrid } from '../components/home/ProjectsGrid';
import { ContactSection } from '../components/home/ContactSection';
import { Project, Inquiry, SiteSettings, BudgetOption } from '../types';

interface HomeProps {
  projects: Project[];
  addInquiry: (inquiry: Inquiry) => void;
  settings: SiteSettings;
  budgets: BudgetOption[]; // NEW
}

const Home: React.FC<HomeProps> = ({ projects, addInquiry, settings, budgets }) => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <ProjectsGrid projects={projects} />
      <ContactSection addInquiry={addInquiry} settings={settings} budgets={budgets} />
    </div>
  );
};
export default Home;