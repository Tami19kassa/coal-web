import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, animate } from 'framer-motion';
import { ArrowLeft, ExternalLink, ShieldCheck, Hammer, Activity, Server } from 'lucide-react';
import { Project } from '../types';
import { pageTransition, fadeInUp } from '../lib/animations';

interface ProjectDetailProps {
  projects: Project[];
}

// --- SUB-COMPONENT: ANIMATED COUNTER ---
const Counter = ({ from, to, label }: { from: number; to: number; label: string }) => {
  const [count, setCount] = useState(from);
  useEffect(() => {
    const controls = animate(from, to, { duration: 2, ease: "circOut", onUpdate: (v) => setCount(Math.floor(v)) });
    return () => controls.stop();
  }, [from, to]);
  return (
    <div className="text-center p-6 border border-white/5 bg-white/5">
      <div className="text-4xl font-black text-orange-500 mb-1 font-mono">{count}{label.includes('ms') ? 'ms' : '%'}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</div>
    </div>
  );
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!project) return <div className="pt-32 text-center text-white">DATA CORRUPTION: PROJECT NOT FOUND</div>;

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition} className="pt-24 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <motion.div variants={fadeInUp} custom={0} className="mb-12">
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-orange-500 font-black uppercase tracking-widest text-xs transition-colors group">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Return to Base
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <motion.div variants={fadeInUp} custom={1}>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techUsed.map(tech => (
                <span key={tech} className="px-3 py-1 border border-orange-500/30 text-orange-500 text-[10px] font-black uppercase tracking-widest">
                  {tech}
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.9] text-white">
              {project.title}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-10 font-medium">
              {project.description}
            </p>
            <a href={project.visitUrl} target="_blank" rel="noopener noreferrer" 
               className="inline-flex items-center bg-white text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-xl">
              Live Deployment <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </motion.div>

          {/* --- IMAGE WITH SCANNING EFFECT --- */}
          <motion.div variants={fadeInUp} custom={2} className="relative aspect-video bg-zinc-900 border border-white/10 overflow-hidden group">
            <motion.div style={{ y: imgY }} className="absolute inset-0">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
            {/* The Scanner Line */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-orange-500 shadow-[0_0_20px_#f97316] z-10"
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,6px_100%] pointer-events-none" />
          </motion.div>
        </div>

        {/* --- CASE STUDY GRIDS --- */}
        <div className="grid md:grid-cols-2 gap-12 border-t border-white/5 pt-12">
          <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="p-10 bg-white/5 border-l-4 border-red-600">
            <div className="flex items-center space-x-3 mb-6">
              <Activity className="text-red-600 w-6 h-6" />
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">Structural Deficit</h3>
            </div>
            <p className="text-slate-400 leading-relaxed font-mono text-sm">{project.problem}</p>
          </motion.div>

          <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="p-10 bg-white/5 border-l-4 border-green-600">
            <div className="flex items-center space-x-3 mb-6">
              <Hammer className="text-green-600 w-6 h-6" />
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">Engineered Solution</h3>
            </div>
            <p className="text-slate-400 leading-relaxed font-mono text-sm">{project.solution}</p>
          </motion.div>
        </div>

        {/* --- TECH STATS --- */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Counter from={0} to={99} label="Uptime Record" />
          <Counter from={0} to={45} label="Latency Floor (ms)" />
          <Counter from={0} to={100} label="Security Score" />
          <Counter from={0} to={850} label="Data Flow (TB)" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;