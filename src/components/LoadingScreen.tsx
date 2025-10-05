import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showName, setShowName] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get theme colors
    const isLightTheme = document.documentElement.classList.contains('light-theme');
    const matrixColor = getComputedStyle(document.documentElement).getPropertyValue('--matrix-color').trim() || '#00ff9f';
    const bgColor = isLightTheme ? 'rgba(248, 250, 252, 0.05)' : 'rgba(10, 14, 39, 0.05)';

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters - Katakana, Latin, Numbers
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const chars = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Create drops array
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let animationId: number;
    let frameCount = 0;

    // Draw function
    const draw = () => {
      // Semi-transparent background to create fade effect
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = matrixColor;
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Add glow effect for leading characters
        if (Math.random() > 0.98) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = matrixColor;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      frameCount++;

      // Show name after 1.5 seconds (90 frames at 60fps)
      if (frameCount === 90) {
        setShowName(true);
      }

      // Slow down rain after name appears
      if (frameCount > 90 && frameCount < 180) {
        // Gradually slow down
        if (frameCount % 2 === 0) {
          animationId = requestAnimationFrame(draw);
        } else {
          setTimeout(() => {
            animationId = requestAnimationFrame(draw);
          }, 50);
        }
      } else if (frameCount >= 180) {
        // Freeze the rain
        return;
      } else {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    // Progress simulation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Allow skip after 2 seconds
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 2000);

    // Auto complete after 4 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Handle skip
    const handleSkip = (e: KeyboardEvent) => {
      if (canSkip && (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')) {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleSkip);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(progressInterval);
      clearTimeout(skipTimer);
      clearTimeout(completeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [onComplete, canSkip]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-bg overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Matrix Rain Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center z-10">
            {/* Name/Logo */}
            <AnimatePresence>
              {showName && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    filter: 'blur(0px)'
                  }}
                  transition={{ 
                    duration: 1.5,
                    ease: 'easeOut'
                  }}
                >
                  {/* Main Name */}
                  <motion.h1
                    className="text-4xl sm:text-6xl md:text-8xl font-bold text-neon mb-4 px-4"
                    style={{
                      textShadow: '0 0 20px rgba(0, 255, 159, 0.8), 0 0 40px rgba(0, 255, 159, 0.4)'
                    }}
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(0, 255, 159, 0.8), 0 0 40px rgba(0, 255, 159, 0.4)',
                        '0 0 30px rgba(0, 255, 159, 1), 0 0 60px rgba(0, 255, 159, 0.6)',
                        '0 0 20px rgba(0, 255, 159, 0.8), 0 0 40px rgba(0, 255, 159, 0.4)',
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    SANKALP
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    className="text-base sm:text-xl md:text-2xl text-cyan font-mono px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    SDET • Automation Engineer
                  </motion.p>

                  {/* Loading bar */}
                  <motion.div
                    className="mt-8 mx-auto w-64"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="h-1 bg-neon/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-neon rounded-full"
                        style={{
                          boxShadow: '0 0 10px rgba(0, 255, 159, 0.8)'
                        }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <motion.p
                      className="text-neon text-sm font-mono mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      {Math.min(Math.round(loadingProgress), 100)}%
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Skip button */}
        <AnimatePresence>
          {canSkip && (
            <motion.button
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sub hover:text-neon font-mono text-sm transition-colors pointer-events-auto cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={onComplete}
            >
              Press ESC, ENTER or SPACE to skip
            </motion.button>
          )}
        </AnimatePresence>

        {/* Corner decoration */}
        <div className="absolute top-4 left-4 text-neon/30 font-mono text-xs">
          &gt; INITIALIZING...
        </div>
        <div className="absolute top-4 right-4 text-neon/30 font-mono text-xs">
          v1.0.0
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
