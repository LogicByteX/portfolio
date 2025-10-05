import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, MapPin, Terminal } from 'lucide-react';
import { resumeData } from '../data/resume';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(resumeData.contact.email);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <footer className="glass-panel border-t border-panel/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="text-neon" size={24} />
              <span className="font-mono font-bold text-xl text-neon">
                Sankalp Pandey
              </span>
            </div>
            <p className="text-sub text-sm leading-relaxed">
              SDET & Automation Engineer building reliable testing systems 
              and performance frameworks that help teams ship with confidence.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-mono font-semibold text-white">Contact</h3>
            <div className="space-y-2">
              <motion.button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 text-sub hover:text-neon transition-colors duration-300 text-sm"
                whileHover={{ x: 5 }}
              >
                <Mail size={16} />
                {resumeData.contact.email}
              </motion.button>
              
              <div className="flex items-center gap-2 text-sub text-sm">
                <MapPin size={16} />
                {resumeData.contact.location}
              </div>
              
              <motion.a
                href={`https://${resumeData.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sub hover:text-neon transition-colors duration-300 text-sm"
                whileHover={{ x: 5 }}
              >
                <Github size={16} />
                {resumeData.contact.github}
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-mono font-semibold text-white">Quick Access</h3>
            <div className="space-y-2">
              <motion.a
                href="/resume.pdf"
                download="Sankalp_Pandey_Resume.pdf"
                className="block text-sub hover:text-neon transition-colors duration-300 text-sm"
                whileHover={{ x: 5 }}
              >
                Download Resume
              </motion.a>
              
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-sub hover:text-neon transition-colors duration-300 text-sm text-left"
                whileHover={{ x: 5 }}
              >
                Get in Touch
              </motion.button>
              
              <motion.button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-sub hover:text-neon transition-colors duration-300 text-sm text-left"
                whileHover={{ x: 5 }}
              >
                View Projects
              </motion.button>
            </div>
          </div>
        </div>

        <div className="border-t border-panel/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sub text-sm font-mono">
              © {currentYear} Sankalp Pandey. Built with React, TypeScript & TailwindCSS.
            </p>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <motion.div
                className="flex items-center gap-1"
                animate={{ 
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-2 h-2 bg-neon rounded-full"></div>
                <span className="text-sub text-xs font-mono">
                  System Online
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
