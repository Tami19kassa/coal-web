
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ShieldCheck, Database, Hammer } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailProps {
  projects: Project[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div id = "projects" className="pt-32 pb-24 text-center">
        <h2 className="text-4xl font-bold mb-8 uppercase">Project Data Not Found</h2>
        <Link to="/" className="text-orange-500 font-bold hover:underline">Return to Base</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-orange-500 transition-colors font-bold uppercase tracking-widest text-xs">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Loadout
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter uppercase leading-none">
              {project.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? 'text-orange-500' : ''}>{word} </span>
              ))}
            </h1>
            <div className="flex flex-wrap gap-3 mb-10">
              {project.techUsed.map(tech => (
                <span key={tech} className="px-3 py-1 bg-orange-600/10 border border-orange-500/20 text-orange-500 text-xs font-bold rounded-full uppercase tracking-widest">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-xl text-slate-400 leading-relaxed mb-10">
              {project.description}
            </p>
            <a 
              href={project.visitUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-charcoal px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all group"
            >
              Live Deployment <ExternalLink className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-video rounded-3xl overflow-hidden industrial-border shadow-2xl"
          >
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-3xl border-l-4 border-l-red-500/50"
          >
            <div className="flex items-center space-x-3 mb-6">
              <ShieldCheck className="text-red-500 w-6 h-6" />
              <h3 className="text-2xl font-bold uppercase tracking-tight">The Structural Deficit</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {project.problem}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass p-10 rounded-3xl border-l-4 border-l-green-500/50"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Hammer className="text-green-500 w-6 h-6" />
              <h3 className="text-2xl font-bold uppercase tracking-tight">The Engineered Solution</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {project.solution}
            </p>
          </motion.div>
        </div>

        {/* Technical Stack Stats */}
        <div className="mt-24 py-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-1">99.9%</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Uptime Record</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-1">&lt; 100ms</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Latency Floor</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-1">AES-256</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Encryption Grade</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-1">20TB+</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Data Flow</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
