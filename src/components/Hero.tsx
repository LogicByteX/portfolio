import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Mail } from 'lucide-react';
import Terminal from './Terminal';
import { resumeData } from '../data/resume';
import profileImage from '../assets/profile.png';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = resumeData.hero.title;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Sankalp_Pandey_Resume.pdf';
    link.click();
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(resumeData.contact.email);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Terminal */}
        <div className="order-2 lg:order-1">
          <Terminal />
        </div>
        
        {/* Right Column - Profile Info */}
        <motion.div 
          className="order-1 lg:order-2 text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-panel p-8 mb-8">
            {/* Profile Image */}
            <motion.div
              className="flex justify-center lg:justify-start mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="w-32 h-32 lg:w-40 lg:h-40"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={profileImage}
                  alt="Sankalp Pandey - SDET Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-4xl lg:text-5xl font-bold mb-6 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span 
                className="glitch-text text-neon" 
                data-text={displayText}
              >
                {displayText}
              </span>
              <span className="terminal-cursor ml-2"></span>
            </motion.h1>
            
            <motion.p 
              className="text-lg lg:text-xl text-sub mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {resumeData.hero.tagline}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <button
                onClick={handleDownloadResume}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-neon text-bg font-semibold rounded-lg hover:bg-neon/90 transition-all duration-300 hover:scale-105"
              >
                <Download size={20} />
                Download Resume
              </button>
              
              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-neon text-neon font-semibold rounded-lg hover:bg-neon/10 transition-all duration-300 hover:scale-105"
              >
                <Mail size={20} />
                Copy Email
              </button>
              
              <a
                href={`https://${resumeData.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-cyan text-cyan font-semibold rounded-lg hover:bg-cyan/10 transition-all duration-300 hover:scale-105"
              >
                <Github size={20} />
                GitHub
              </a>
            </motion.div>
          </div>
          
          {/* Signal Strength Animation */}
          <motion.div 
            className="glass-panel p-4 flex items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-neon rounded-full"
                  style={{ height: `${(i + 1) * 4}px` }}
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    scaleY: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-sub font-mono">
              Signal: Active • Ready for commands
            </span>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background Grid */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 159, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 159, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </section>
  );
};

export default Hero;
