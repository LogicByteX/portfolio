import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/resume';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      className="glass-panel p-6 group hover:border-neon/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 2,
        rotateX: 2,
      }}
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-neon transition-colors duration-300">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="px-2 py-1 bg-panel text-neon text-sm rounded border border-neon/30 font-mono"
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      <p className="text-sub leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="flex gap-4">
        {project.links.code && (
          <motion.a
            href={project.links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-neon text-neon rounded hover:bg-neon/10 transition-all duration-300 font-mono text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} />
            Code
          </motion.a>
        )}
        
        {project.links.live && (
          <motion.a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-cyan text-cyan rounded hover:bg-cyan/10 transition-all duration-300 font-mono text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={16} />
            Live Demo
          </motion.a>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none neon-glow" />
    </motion.div>
  );
};

export default ProjectCard;
