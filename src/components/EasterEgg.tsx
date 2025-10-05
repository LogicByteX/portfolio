import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Egg } from 'lucide-react';

interface EasterEggProps {
  onActivate: () => void;
}

const EasterEgg: React.FC<EasterEggProps> = ({ onActivate }) => {
  const [clicks, setClicks] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isPermanentlyActivated, setIsPermanentlyActivated] = useState(false);

  const handleClick = () => {
    if (isPermanentlyActivated) return; // Don't allow clicking after activation
    
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks === 1) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 1500);
    }

    if (newClicks >= 7) {
      setIsActivated(true);
      setIsPermanentlyActivated(true);
      onActivate();
      setTimeout(() => {
        setClicks(0);
        setIsActivated(false);
      }, 2000);
    }
  };

  return (
    <>
      <motion.button
        className={`fixed bottom-8 right-12 z-50 glass-panel p-3 rounded-full border ${
          isPermanentlyActivated 
            ? 'border-neon bg-neon/10' 
            : 'border-neon/20 hover:border-neon/50'
        } transition-colors ${isPermanentlyActivated ? '' : 'cursor-pointer'}`}
        whileHover={isPermanentlyActivated ? {} : { scale: 1.1 }}
        whileTap={isPermanentlyActivated ? {} : { scale: 0.95 }}
        onClick={handleClick}
        initial={{ opacity: 0.6 }}
        animate={{ 
          opacity: isActivated ? 0 : isPermanentlyActivated ? 1 : [0.6, 0.8, 0.6],
        }}
        transition={{ 
          opacity: { duration: 3, repeat: isPermanentlyActivated ? 0 : Infinity },
        }}
      >
        {isPermanentlyActivated ? (
          // Broken egg icon
          <motion.div
            className="text-neon"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Broken egg top half */}
              <path d="M12 3C8.5 3 6 7 6 10c0 0 0 1 1 2l5-3 4 2c1-1 1-2 1-2 0-3-2.5-6-5-6z" />
              {/* Crack lines */}
              <path d="M12 12l-5 3" />
              <path d="M12 12l4-2" />
              {/* Broken egg bottom half */}
              <path d="M7 15c0 2.5 2 5 5 5s5-2.5 5-5" />
              <path d="M8 16l8 2" />
            </svg>
          </motion.div>
        ) : (
          // Whole egg icon
          <motion.div
            className="text-neon"
            animate={{
              rotate: clicks > 0 ? [0, -10, 10, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <Egg size={28} strokeWidth={2} />
          </motion.div>
        )}

        {clicks > 0 && clicks < 7 && !isPermanentlyActivated && (
          <motion.span
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neon text-bg px-2 py-1 rounded text-xs font-bold whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {7 - clicks}
          </motion.span>
        )}
        
        {isPermanentlyActivated && (
          <motion.span
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neon text-bg px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            UNLOCKED
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {showHint && (
          <motion.div
            className="fixed bottom-20 right-12 bg-panel border border-neon/30 text-sub px-3 py-2 rounded text-xs z-50 max-w-xs font-mono"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            Click 7 times to unlock secrets
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isActivated && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Terminal/Hacker Icon */}
            <motion.div
              className="text-neon font-mono"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: [0, 1.5, 1],
                rotate: [0, 360, 360]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <svg
                width="180"
                height="180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Terminal window */}
                <rect x="2" y="3" width="20" height="18" rx="2" />
                {/* Terminal prompt */}
                <path d="M7 8l4 4-4 4" />
                <line x1="13" y1="16" x2="17" y2="16" />
              </svg>
            </motion.div>
            
            {/* Glitch effect text */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 mt-20 px-6 py-3 font-bold font-mono text-2xl tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-neon drop-shadow-[0_0_10px_rgba(0,255,159,0.8)]">
                &gt; HACKING MODE: ACTIVATED
              </span>
            </motion.div>
            
            {/* Matrix-style background effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 1.5 }}
            >
              <div className="absolute inset-0 bg-gradient-radial from-neon/10 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEgg;
