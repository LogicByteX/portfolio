import React from 'react';
import { motion } from 'framer-motion';
import type { Experience } from '../data/resume';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div
      className="glass-panel p-6 cursor-pointer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-neon font-mono mb-1">
            {experience.role}
          </h3>
          <p className="text-cyan font-medium">
            {experience.company}
          </p>
        </div>
        <span className="text-sub font-mono text-sm md:text-base">
          {experience.period}
        </span>
      </div>

      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-2 border-t border-panel/50">
          <ul className="space-y-2">
            {experience.achievements.map((achievement, achIndex) => (
              <motion.li
                key={achIndex}
                className="text-sub flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: achIndex * 0.1 }}
              >
                <span className="text-neon mt-1">▸</span>
                {achievement}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-sub text-sm font-mono">
          <span>Click to {isExpanded ? 'collapse' : 'expand'}</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-neon"
        >
          ▼
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
