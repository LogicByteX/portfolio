import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Zap } from 'lucide-react';
import { useAnimations } from './AnimationProvider';

const AnimationControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAnimationsEnabled, toggleAnimations } = useAnimations();

  return (
    <div className="relative">
      {/* Settings Button */}
      <motion.button
        className="glass-panel p-3 rounded-full border border-neon/20 hover:border-neon/50 transition-colors cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        title="Performance Settings"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Settings size={20} className="text-neon" />
        </motion.div>
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 left-0 glass-panel border border-neon/30 rounded-lg p-4 min-w-64"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-neon font-bold mb-3 text-sm">Performance Settings</h3>
            
            <div className="space-y-3">
              {/* Improve Performance Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap size={16} className={isAnimationsEnabled ? 'text-sub' : 'text-neon'} />
                  <span className="text-sm text-white">Improve Performance</span>
                </div>
                <button
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    !isAnimationsEnabled ? 'bg-neon' : 'bg-sub/30'
                  }`}
                  onClick={toggleAnimations}
                >
                  <motion.div
                    className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{ x: !isAnimationsEnabled ? 20 : 2 }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-neon/20">
              <p className="text-xs text-sub">
                {!isAnimationsEnabled 
                  ? "Performance mode active - animations disabled" 
                  : "All animations enabled"
                }
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimationControls;
