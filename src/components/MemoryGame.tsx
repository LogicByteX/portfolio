import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const symbols = ['🐛', '⚡', '🔐', '💻', '🚀', '🎮', '🔧', '💾'];
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem('memoryBestTime');
    return saved ? parseInt(saved) : Infinity;
  });

  // Initialize game
  const initGame = () => {
    const gameCards: Card[] = [];
    symbols.forEach((symbol, index) => {
      gameCards.push(
        { id: index * 2, symbol, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, symbol, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameStarted(true);
    setGameWon(false);
    setTime(0);
  };

  // Timer
  useEffect(() => {
    if (!gameStarted || gameWon) return;
    
    const timer = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameWon]);

  // Handle card click
  const handleCardClick = (id: number) => {
    if (!gameStarted || gameWon) return;
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    const newCards = cards.map(c =>
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      
      const [first, second] = newFlipped;
      const firstCard = newCards.find(c => c.id === first);
      const secondCard = newCards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setMatches(prev => {
            const newMatches = prev + 1;
            if (newMatches === symbols.length) {
              setGameWon(true);
              if (time < bestTime) {
                setBestTime(time);
                localStorage.setItem('memoryBestTime', time.toString());
              }
            }
            return newMatches;
          });
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (!gameStarted || gameWon) {
          initGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameWon, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          <h2 className="text-lg sm:text-2xl font-bold text-neon">🧠 Memory Match</h2>
          <button
            onClick={onClose}
            className="text-sub hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:justify-between items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm">
          <div className="text-cyan">
            Moves: <span className="text-neon font-bold">{moves}</span>
          </div>
          <div className="text-cyan">
            Matches: <span className="text-neon font-bold">{matches}/{symbols.length}</span>
          </div>
          <div className="text-cyan">
            Time: <span className="text-neon font-bold">{formatTime(time)}</span>
          </div>
          {bestTime !== Infinity && (
            <div className="text-cyan">
              Best: <span className="text-neon font-bold">{formatTime(bestTime)}</span>
            </div>
          )}
        </div>

        <div className="relative mb-3 sm:mb-4">
          <div className="grid grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 bg-dark/50 rounded-lg border border-neon/20">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className={`aspect-square relative cursor-pointer perspective-1000`}
                onClick={() => handleCardClick(card.id)}
                whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
              >
                <motion.div
                  className="w-full h-full relative preserve-3d"
                  animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card Back */}
                  <div className="absolute inset-0 backface-hidden rounded-lg border-2 border-cyan/50 bg-gradient-to-br from-panel/80 to-dark/80 flex items-center justify-center shadow-neon">
                    <div className="text-cyan text-xl sm:text-2xl">?</div>
                  </div>
                  
                  {/* Card Front */}
                  <div className="absolute inset-0 backface-hidden rounded-lg border-2 border-neon/70 bg-gradient-to-br from-neon/20 to-cyan/20 flex items-center justify-center shadow-neon rotate-y-180">
                    <div className="text-2xl sm:text-4xl">{card.symbol}</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {!gameStarted && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-dark/90 backdrop-blur-sm rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🧠</div>
                  <div className="text-xl text-neon mb-4">Memory Match Game</div>
                  <div className="text-sm text-sub mb-4">
                    Find all matching pairs!<br/>
                    Click cards to flip them.
                  </div>
                  <button
                    onClick={initGame}
                    className="px-6 py-2 bg-neon text-dark font-bold rounded hover:bg-cyan transition-colors"
                  >
                    Start Game
                  </button>
                </div>
              </motion.div>
            )}

            {gameWon && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-dark/95 backdrop-blur-sm rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1 }}
                  >
                    🎉
                  </motion.div>
                  <div className="text-2xl text-neon mb-2">You Won!</div>
                  <div className="text-lg text-cyan mb-2">
                    Time: {formatTime(time)} • Moves: {moves}
                  </div>
                  {time === bestTime && time > 0 && (
                    <div className="text-neon mb-4">🏆 New Best Time!</div>
                  )}
                  <div className="text-sm text-sub mb-4">Press SPACE or ENTER to play again</div>
                  <button
                    onClick={initGame}
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
            <div className="font-bold text-cyan mb-2">How to Play:</div>
            <div>• Click cards to flip them</div>
            <div>• Find matching pairs</div>
            <div>• Match all 8 pairs to win</div>
            <div>• Beat your best time!</div>
          </div>
          <div>
            <div className="font-bold text-cyan mb-2">Controls:</div>
            <div>SPACE/ENTER - Start/Restart</div>
            <div>ESC - Exit Game</div>
            <div>CLICK - Flip card</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemoryGame;
