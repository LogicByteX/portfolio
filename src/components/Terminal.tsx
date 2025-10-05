import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import SnakeGame from './SnakeGame';
import MemoryGame from './MemoryGame';

interface TerminalCommand {
  command: string;
  output: string | React.ReactNode;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalCommand[]>([
    {
      command: 'whoami',
      output: 'Sankalp Pandey — SDET & Automation Hacker'
    },
    {
      command: 'skills',
      output: resumeData.skills.join(', ')
    }
  ]);
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, (args?: string) => string> = {
    help: () => 'Available commands: help, about, skills, projects, contact, download-resume, clear',
    about: () => resumeData.about.paragraphs.join('\n\n'),
    skills: () => resumeData.skills.join(', '),
    projects: () => resumeData.projects.map((p, i) => 
      `${i + 1}. ${p.title} — ${p.tech.join(', ')}\n   ${p.description}`
    ).join('\n\n'),
    contact: () => `Email: ${resumeData.contact.email}\nLocation: ${resumeData.contact.location}\nGitHub: ${resumeData.contact.github}`,
    'download-resume': () => {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Sankalp_Pandey_Resume.pdf';
      link.click();
      return 'Resume downloaded!';
    },
    clear: () => {
      setHistory([]);
      return '';
    },
    // 🥚 Hidden Easter Egg Commands
    'sudo': () => 'Nice try! But you need to find the secret first... 🥚',
    'hack': () => 'Access Denied! Try finding the hidden egg first 🔐',
    'matrix': () => {
      setMatrixMode(!matrixMode);
      return matrixMode ? 'Exiting the Matrix... 👋' : 'Welcome to the Matrix... 🟢';
    },
    'konami': () => {
      setEasterEggFound(true);
      return '🎮 Konami Code Activated! You unlocked the secret menu! Type "secrets" to explore.';
    },
    'secrets': () => {
      if (!easterEggFound) {
        return '🔒 Locked! Find the easter egg first... Hint: Try the Konami code or click the 🥚';
      }
      return `
🎉 Secret Commands Unlocked:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• snake        - Play Snake game
• memory       - Play Memory Match game
• joke         - Get a programming joke
• quote        - Random motivational quote
• morse [text] - Convert to morse code
• weather      - Check weather (fake data)
• coffee       - ☕ Coffee break
• hack-nasa    - Try hacking NASA
• flip-coin    - Flip a coin
• roll-dice    - Roll the dice
• magic8ball   - Ask the magic 8 ball
• ascii-art    - Random ASCII art
• timer [sec]  - Set a countdown timer
• animations   - Toggle background animations
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    },
    'animations': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      return `
✨ Animation Controls:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 Look for the settings icon (⚙️) in the bottom-left corner!

Available effects:
• 🌟 Background animations - Subtle floating particles
• 🖱️  Mouse trail effects - Neon cursor trail  
• ⚙️  Master toggle - Enable/disable all effects

The controls respect your motion preferences and
remember your settings between visits.

Tip: Try moving your mouse around to see the trail! ✨`;
    },
    'snake': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      setShowSnakeGame(true);
      return '🐍 Launching Snake Game...';
    },
    'memory': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      setShowMemoryGame(true);
      return '🧠 Launching Memory Match Game...';
    },
    'joke': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "Why did the developer go broke? Because he used up all his cache! 💸",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
        "Why do Java developers wear glasses? Because they don't C#! 👓",
        "A SQL query walks into a bar, walks up to two tables and asks... 'Can I JOIN you?' 🍺"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    },
    'quote': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      const quotes = [
        '"First, solve the problem. Then, write the code." - John Johnson',
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '"Make it work, make it right, make it fast." - Kent Beck',
        '"Testing leads to failure, and failure leads to understanding." - Burt Rutan',
        '"In God we trust. All others must bring data." - W. Edwards Deming'
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    },
    'morse': (text = '') => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      if (!text) return '📡 Usage: morse [text] - Example: morse hello';
      const morseCode: Record<string, string> = {
        'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.',
        'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
        'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.',
        's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
        'y': '-.--', 'z': '--..', ' ': '/'
      };
      const converted = text.toLowerCase().split('').map(char => morseCode[char] || char).join(' ');
      return `📡 Morse: ${converted}`;
    },
    'weather': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      return '🌤️ Pune, India: 28°C, Partly Cloudy\n💨 Wind: 12 km/h\n💧 Humidity: 65%\n☀️ Perfect weather for coding!';
    },
    'coffee': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      return '☕ Brewing coffee...\n███████████░░ 80%\n*sip* Ahh, that hits the spot! ☕✨';
    },
    'hack-nasa': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      return `🚀 Initiating NASA hack...
[████████████░░░░] 75%
⚠️  FBI ALERT: Nice try, script kiddie!
🚔 Connection terminated. Better luck next time! 😄`;
    },
    'flip-coin': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      return Math.random() > 0.5 ? '🪙 Heads!' : '🪙 Tails!';
    },
    'roll-dice': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      const roll = Math.floor(Math.random() * 6) + 1;
      return `🎲 You rolled a ${roll}!`;
    },
    'magic8ball': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      const answers = [
        '🔮 It is certain', '🔮 Without a doubt', '🔮 Yes definitely',
        '🔮 Reply hazy, try again', '🔮 Ask again later', '🔮 Cannot predict now',
        '🔮 Don\'t count on it', '🔮 My sources say no', '🔮 Outlook not so good'
      ];
      return answers[Math.floor(Math.random() * answers.length)];
    },
    'ascii-art': () => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      return `
    ∧,,,∧
   (  ̳• · • ̳)
   /    づ♡ I love coding!
      `;
    },
    'timer': (seconds = '10') => {
      if (!easterEggFound) return '🔒 Locked! Find the easter egg first.';
      const sec = parseInt(seconds) || 10;
      return `⏰ Timer set for ${sec} seconds! (Feature coming soon)`;
    }
  };

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().toLowerCase().split(' ');
    const commandFn = commands[command];
    
    if (commandFn) {
      const output = commandFn(args.join(' '));
      if (command !== 'clear') {
        setHistory(prev => [...prev, { command: cmd, output }]);
      }
    } else {
      setHistory(prev => [...prev, { 
        command: cmd, 
        output: `Command not found: ${cmd}. Type 'help' for available commands.` 
      }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Konami Code Detection: ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        focusInput();
        return;
      }

      // Konami code detection
      if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          handleCommand('konami');
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [easterEggFound]);

  // Listen for easter egg activation from external component
  useEffect(() => {
    const handleEasterEgg = () => {
      setEasterEggFound(true);
      handleCommand('konami');
    };
    
    window.addEventListener('easterEgg', handleEasterEgg);
    return () => window.removeEventListener('easterEgg', handleEasterEgg);
  }, []);

  return (
    <>
      <motion.div 
        className={`glass-panel p-6 h-96 max-h-96 flex flex-col font-mono text-sm relative ${matrixMode ? 'matrix-mode' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={focusInput}
      >
        {easterEggFound && (
          <motion.div 
            className="absolute top-2 right-2 text-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            🎉
          </motion.div>
        )}

        <div className="flex items-center mb-4 text-neon">
          <span className="mr-2">●</span>
          <span className="mr-2">●</span>
          <span className="mr-2">●</span>
          <span className="ml-4 text-sub">terminal — portfolio {easterEggFound && '(secrets unlocked)'}</span>
        </div>
        
        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neon scrollbar-track-transparent"
        >
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center text-neon">
                <span className="mr-2">➜</span>
                <span className="text-cyan">~</span>
                <span className="ml-2">{item.command}</span>
              </div>
              {item.output && (
                <div className="mt-1 ml-6 text-sub whitespace-pre-wrap">
                  {item.output}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="flex items-center mt-4">
          <span className="text-neon mr-2">➜</span>
          <span className="text-cyan mr-2">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white"
            placeholder={easterEggFound ? "Try 'secrets' for hidden commands..." : "Type 'help' for commands..."}
            autoFocus
          />
          <span className="terminal-cursor ml-1"></span>
        </form>
        
        <div className="mt-2 text-xs text-sub">
          {easterEggFound ? '🔓 Secret mode active! Type "secrets" for more.' : 'Hint: Look for the glowing egg icon... or try ↑↑↓↓←→←→BA'}
        </div>
      </motion.div>
      
      {showSnakeGame && <SnakeGame onClose={() => setShowSnakeGame(false)} />}
      {showMemoryGame && <MemoryGame onClose={() => setShowMemoryGame(false)} />}
    </>
  );
};

export default Terminal;
