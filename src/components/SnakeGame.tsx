import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const SnakeGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved) : 0;
  });
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gridSize = 20;
  const cellSize = 20;
  const gameSpeed = 100;

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setGameStarted(true);
  }, [generateFood]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (!gameStarted && (e.key === ' ' || e.key === 'Enter')) {
        resetGame();
        return;
      }

      if (gameOver && (e.key === ' ' || e.key === 'Enter')) {
        resetGame();
        return;
      }

      if (e.key === ' ' && gameStarted && !gameOver) {
        e.preventDefault();
        setIsPaused(prev => !prev);
        return;
      }

      if (isPaused || !gameStarted) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver, isPaused, gameStarted, onClose, resetGame]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        // Move head based on direction
        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => {
            const newScore = prev + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('snakeHighScore', newScore.toString());
            }
            return newScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, gameSpeed);
    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver, isPaused, gameStarted, generateFood, highScore]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0b0f12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#1a1f2e';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, gridSize * cellSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(gridSize * cellSize, i * cellSize);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#ff4444';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff4444';
    ctx.fillRect(food.x * cellSize + 2, food.y * cellSize + 2, cellSize - 4, cellSize - 4);
    ctx.shadowBlur = 0;

    // Draw snake
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Head
        ctx.fillStyle = '#00ff9f';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff9f';
      } else {
        // Body
        const gradient = ctx.createLinearGradient(
          segment.x * cellSize,
          segment.y * cellSize,
          (segment.x + 1) * cellSize,
          (segment.y + 1) * cellSize
        );
        gradient.addColorStop(0, '#00ff9f');
        gradient.addColorStop(1, '#00d4ff');
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#00ff9f';
      }
      ctx.fillRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2);
      ctx.shadowBlur = 0;
    });
  }, [snake, food]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-panel p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-2xl font-bold text-neon">🐍 Snake Game</h2>
          <button
            onClick={onClose}
            className="text-sub hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex justify-between items-center mb-3 sm:mb-4 text-xs sm:text-sm">
          <div className="text-cyan">
            Score: <span className="text-neon font-bold">{score}</span>
          </div>
          <div className="text-cyan">
            High Score: <span className="text-neon font-bold">{highScore}</span>
          </div>
        </div>

        <div className="relative mb-3 sm:mb-4 flex justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={gridSize * cellSize}
            height={gridSize * cellSize}
            className="border-2 border-neon/30 rounded-lg shadow-neon max-w-full h-auto"
            style={{ maxHeight: 'min(400px, 60vh)' }}
          />
          
          <AnimatePresence>
            {!gameStarted && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-dark/80 backdrop-blur-sm rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🐍</div>
                  <div className="text-xl text-neon mb-4">Press SPACE or ENTER to Start</div>
                  <div className="text-sm text-sub">Use Arrow Keys or WASD to move</div>
                </div>
              </motion.div>
            )}

            {isPaused && !gameOver && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-dark/80 backdrop-blur-sm rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">⏸️</div>
                  <div className="text-xl text-neon mb-2">Paused</div>
                  <div className="text-sm text-sub">Press SPACE to resume</div>
                </div>
              </motion.div>
            )}

            {gameOver && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-dark/90 backdrop-blur-sm rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">💀</div>
                  <div className="text-2xl text-red-500 mb-2">Game Over!</div>
                  <div className="text-xl text-cyan mb-4">Final Score: {score}</div>
                  {score === highScore && score > 0 && (
                    <div className="text-neon mb-4">🏆 New High Score!</div>
                  )}
                  <div className="text-sm text-sub mb-4">Press SPACE or ENTER to restart</div>
                  <button
                    onClick={resetGame}
                    className="px-6 py-2 bg-neon text-dark font-bold rounded hover:bg-cyan transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs text-sub">
          <div>
            <div className="font-bold text-cyan mb-2">Controls:</div>
            <div>↑/↓/←/→ or WASD - Move</div>
            <div>SPACE - Pause/Resume</div>
            <div>ESC - Exit Game</div>
          </div>
          <div>
            <div className="font-bold text-cyan mb-2">Rules:</div>
            <div>• Eat red food to grow</div>
            <div>• Don't hit walls</div>
            <div>• Don't bite yourself</div>
            <div>• Each food = 10 points</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SnakeGame;
