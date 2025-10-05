import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAnimations } from './AnimationProvider';

const BackgroundAnimations: React.FC = () => {
  const { isAnimationsEnabled } = useAnimations();

  // Generate random floating particles
  const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  })), []);

  // Generate grid lines
  const gridLines = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    position: (i + 1) * 8.33, // Distribute across screen
    isVertical: i % 2 === 0,
  })), []);

  // Don't render if animations are disabled
  if (!isAnimationsEnabled) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        {gridLines.map((line) => (
          <motion.div
            key={line.id}
            className={`absolute ${
              line.isVertical 
                ? 'w-px h-full bg-gradient-to-b' 
                : 'h-px w-full bg-gradient-to-r'
            } from-transparent via-neon/5 to-transparent`}
            style={{
              [line.isVertical ? 'left' : 'top']: `${line.position}%`,
            }}
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: line.id * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-neon/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(0, 255, 159, 0.3)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.4, 1.0, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle Pulse Rings */}
      <div className="absolute top-1/4 left-1/4">
        <motion.div
          className="w-96 h-96 rounded-full border border-neon/15"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="absolute bottom-1/4 right-1/4">
        <motion.div
          className="w-64 h-64 rounded-full border border-cyan/15"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: 3,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Scanning Lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent"
        animate={{
          y: ['0vh', '100vh'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan/35 to-transparent"
        animate={{
          x: ['0vw', '100vw'],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          delay: 4,
          ease: 'linear',
        }}
      />

      {/* Ambient Light Spots */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 159, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-32 left-20 w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.07) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          delay: 2,
          ease: 'easeInOut',
        }}
      />

      {/* Circuit-like Connection Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M100,100 Q200,50 300,100 T500,100"
          stroke="rgba(0, 255, 159, 0.2)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,10"
          animate={{
            strokeDashoffset: [0, -15],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        <motion.path
          d="M0,200 Q150,150 300,200 T600,200"
          stroke="rgba(0, 212, 255, 0.15)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3,7"
          animate={{
            strokeDashoffset: [0, -10],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 1,
            ease: 'linear',
          }}
        />
      </svg>
    </div>
  );
};

export default BackgroundAnimations;
