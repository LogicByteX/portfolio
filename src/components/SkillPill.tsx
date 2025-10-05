import React from 'react';
import { motion } from 'framer-motion';

interface SkillPillProps {
  skill: string;
  index: number;
}

const SkillPill: React.FC<SkillPillProps> = ({ skill, index }) => {
  return (
    <motion.div
      className="glass-panel px-4 py-2 text-center group cursor-pointer hover:border-neon/50 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ 
        scale: 1.05,
        y: -2
      }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="font-mono text-white group-hover:text-neon transition-colors duration-300">
        {skill}
      </span>
      
      {/* Interactive glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #00ff9f 0%, transparent 70%)'
        }}
      />
    </motion.div>
  );
};

export default SkillPill;
