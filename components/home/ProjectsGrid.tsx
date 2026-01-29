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
        <div className="max-w-7xl mx-auto text-center border border-cyan-500/20 p-10 bg-black/40 backdrop-blur-sm">
           <h2 className="text-4xl font-black uppercase text-cyan-500/50 tracking-widest">No Active Deployments Detected</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-32 px-4 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-cyan-500 font-black tracking-[0.5em] text-[10px] mb-4 uppercase animate-pulse">Status: Operational</p>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-white leading-none">
              Active <br /> <span className="text-cyan-600">Deployments</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Link to="/admin" className="px-8 py-4 border-2 border-white/10 text-white font-black hover:bg-cyan-600 hover:border-cyan-600 hover:text-black transition-all uppercase tracking-widest text-[10px]">
              Uplink_Console
            </Link>
          </motion.div>
        </motion.div>

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
              className="group relative border border-white/10 bg-white/5 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-500"
            >
              <Link to={`/project/${project.id}`}>
                {/* 
                   FIX: Removed 'grayscale' and 'group-hover:grayscale-0'. 
                   Images are now full color always.
                */}
                <div className="aspect-video overflow-hidden transition-all duration-700">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  {/* Reduced overlay opacity so images are brighter */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40" />
                </div>

                <div className="p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-[2px] h-0 bg-cyan-500 group-hover:h-full transition-all duration-500" />
                  
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techUsed.map(tech => (
                      <span key={tech} className="text-[10px] bg-black/40 border border-white/10 px-2 py-1 text-slate-300 font-bold uppercase group-hover:border-cyan-500/30 group-hover:text-cyan-500 transition-colors">
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