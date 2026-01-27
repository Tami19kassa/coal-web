// src/components/home/ProjectsGrid.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { fadeInUp, staggerContainer } from '../../lib/animations';

interface ProjectsGridProps {
  projects: Project[];
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
           <h2 className="text-4xl font-black uppercase text-white/20">No Active Deployments</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-32 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-20"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              custom={idx}
              className="group relative border border-white/5 bg-zinc-900/50"
            >
              <Link to={`/project/${project.id}`}>
                <div className="aspect-video overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-orange-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techUsed.map(tech => (
                      <span key={tech} className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white/10 text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGrid;