
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Database, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project, Inquiry } from '../types';
 
import ContactForm from '../components/ContactForm';
 

interface HomeProps {
  projects: Project[];
  addInquiry: (inquiry: Inquiry) => void;
}

const Home: React.FC<HomeProps> = ({ projects, addInquiry }) => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-600/10 border border-orange-500/20 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Industrial Grade Engineering</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-none">
              BUILT FOR <br />
              <span className="text-orange-500 amber-glow-text">PERFORMANCE.</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
              We forge high-performance web applications that power modern industries. Solid code, robust architecture, engineered for scale.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-lg flex items-center group transition-all shadow-[0_0_20px_rgba(255,140,0,0.3)]">
                View Loadout
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
               
            </div>
          </motion.div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute right-[-10%] top-[-10%] w-[600px] h-[600px] bg-orange-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute left-[-5%] bottom-[-5%] w-[400px] h-[400px] bg-orange-600/5 blur-[100px] rounded-full"></div>
      </section>

      {/* Feature Grids */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="p-8 glass rounded-2xl industrial-border group">
              <Terminal className="text-orange-500 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Core Architecture</h3>
              <p className="text-slate-400">Low-latency, high-availability systems built using the most resilient technologies in the stack.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-8 glass rounded-2xl industrial-border group">
              <Database className="text-orange-500 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Data Integrity</h3>
              <p className="text-slate-400">Seamless integration with complex data pipelines and real-time monitoring solutions.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-8 glass rounded-2xl industrial-border group">
              <ShieldCheck className="text-orange-500 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Fortified Security</h3>
              <p className="text-slate-400">Enterprise-level security protocols baked into the foundation of every single module.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight uppercase">Recent <span className="text-orange-500">Deployments</span></h2>
              <p className="text-slate-400 max-w-lg">A selection of industrial-grade projects engineered for our partners.</p>
            </div>
            <Link to="/admin" className="text-orange-500 font-bold flex items-center hover:underline uppercase tracking-widest text-xs">
              CMS Access <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="aspect-video overflow-hidden rounded-2xl industrial-border mb-6 relative">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute inset-0 border-2 border-orange-500/0 group-hover:border-orange-500/20 transition-all rounded-2xl pointer-events-none"></div>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-orange-500 transition-colors uppercase tracking-tight">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.techUsed.map(tech => (
                        <span key={tech} className="text-[10px] uppercase font-bold px-2 py-0.5 bg-white/5 border border-white/10 rounded tracking-widest text-slate-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link to={`/project/${project.id}`} className="p-3 bg-white/5 rounded-full hover:bg-orange-500 transition-colors group">
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-white" />
                  </Link>
                </div>
                <p className="text-slate-400 line-clamp-2">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight uppercase">Ready to <br /><span className="text-orange-500">Break Ground?</span></h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                We are currently accepting new industrial-scale projects. Fill out the logistics form and our engineering team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl glass industrial-border flex items-center justify-center shrink-0">
                    <Terminal className="text-orange-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-1">Direct Interface</h4>
                    <p className="text-slate-400">hello@coaldev.io</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl glass industrial-border flex items-center justify-center shrink-0">
                    <Database className="text-orange-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-1">HQ Coordinates</h4>
                    <p className="text-slate-400">Silicon Valley, CA • remote-first</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass p-8 md:p-10 rounded-3xl industrial-border shadow-2xl">
              <ContactForm onSubmit={addInquiry} />
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
