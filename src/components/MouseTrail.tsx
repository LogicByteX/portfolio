import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimations } from './AnimationProvider';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const MouseTrail: React.FC = () => {
  const { isAnimationsEnabled } = useAnimations();
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Don't set up event listeners if animations are disabled
    if (!isAnimationsEnabled) {
      return;
    }

    let trailId = 0;

    // Add class to body for cursor styling
    document.body.classList.add('mouse-trail-active');

    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: TrailPoint = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      };

      setMousePosition({ x: e.clientX, y: e.clientY });
      
      setTrails(prev => {
        // Add new trail point
        const updated = [...prev, newTrail];
        
        // Remove old trail points (keep last 8 points for smooth trail)
        const maxTrails = 8;
        if (updated.length > maxTrails) {
          return updated.slice(-maxTrails);
        }
        
        return updated;
      });
    };

    // Clean up old trails periodically
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTrails(prev => prev.filter(trail => now - trail.timestamp < 500));
    }, 100);

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
      // Remove class when component unmounts
      document.body.classList.remove('mouse-trail-active');
    };
  }, [isAnimationsEnabled]);

  // Don't render if animations are disabled
  if (!isAnimationsEnabled) {
    return null;
  }

  // Get theme colors from CSS variables
  const neonColor = getComputedStyle(document.documentElement).getPropertyValue('--neon-hex').trim();
  const cyanColor = getComputedStyle(document.documentElement).getPropertyValue('--cyan-hex').trim();

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trails.map((trail, index) => {
          const age = Date.now() - trail.timestamp;
          const opacity = Math.max(0, 1 - age / 500);
          const scale = Math.max(0.1, 1 - age / 500);
          
          // Convert hex to RGB for gradient
          const neonRgb = neonColor.match(/\w\w/g)?.map(x => parseInt(x, 16)).join(',') || '0, 255, 159';
          const cyanRgb = cyanColor.match(/\w\w/g)?.map(x => parseInt(x, 16)).join(',') || '0, 212, 255';
          
          return (
            <motion.div
              key={trail.id}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: trail.x - 6,
                top: trail.y - 6,
                background: `radial-gradient(circle, rgba(${neonRgb}, ${opacity * 1.2}) 0%, rgba(${cyanRgb}, ${opacity * 0.7}) 50%, transparent 70%)`,
                boxShadow: `0 0 ${10 * scale}px rgba(${neonRgb}, ${opacity * 0.9})`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: scale,
                opacity: opacity,
                rotate: index * 45
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: 'easeOut'
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Main cursor glow */}
      <motion.div
        className="absolute w-6 h-6 rounded-full pointer-events-none"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: `radial-gradient(circle, ${neonColor}80 0%, ${cyanColor}33 50%, transparent 70%)`,
          boxShadow: `0 0 20px ${neonColor}99`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default MouseTrail;
