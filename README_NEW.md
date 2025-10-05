# 🚀 Sankalp Pandey - SDET Portfolio

A modern, interactive portfolio website built with React, TypeScript, and TailwindCSS featuring a cyberpunk/hacker theme with Matrix rain loading screen, interactive terminal, and glassmorphism design.

## ✨ Features

### Core Features
- **🎬 Matrix Rain Loading Screen**: Stunning Matrix-style loading animation with falling green characters and emerging name
- **💻 Interactive Terminal**: Full command-line interface with 20+ commands for exploring portfolio content
- **🥚 Easter Egg System**: Hidden commands unlocked via clicking (7 times) or Konami Code (↑↑↓↓←→←→BA)
- **🎨 Cyberpunk Theme**: Glassmorphism effects with neon green/cyan accents and smooth animations
- **📱 Responsive Design**: Mobile-first approach with hamburger menu and adaptive layouts
- **⚡ Performance Optimized**: Fast loading with Vite, optimized assets, and 60 FPS animations
- **🔍 SEO Ready**: Proper meta tags, Open Graph tags, structured data, and semantic HTML
- **♿ Accessibility**: Keyboard navigation support, skip options, and WCAG considerations

## 🛠 Tech Stack

- **Frontend**: React 18.3.1, TypeScript 5.x
- **Styling**: TailwindCSS 3.4.3, Custom CSS animations, Glassmorphism
- **Animations**: Framer Motion 11.x (smooth transitions, loading screen)
- **Canvas**: HTML5 Canvas API (Matrix rain effect)
- **Icons**: Lucide React 0.468.0, Heroicons 2.2.0
- **Build Tool**: Vite 5.4.20 (Node 18 compatible)
- **Fonts**: Inter (UI), IBM Plex Mono (Terminal)
- **Deployment**: Netlify, GitHub Pages ready

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎯 Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run export-resume` - Export resume as PDF (planned feature)

## 🎮 Interactive Features

### Terminal Commands

**Basic Commands:**
- `help` - Display all available commands
- `about` - Show information about Sankalp
- `skills` - List technical skills and expertise
- `projects` - Display project portfolio
- `contact` - Show contact information
- `experience` - View work experience
- `download-resume` - Download resume PDF
- `clear` - Clear terminal screen

**Easter Egg Commands** (unlock by clicking egg 7 times or Konami Code):
- `joke` - Random programming joke
- `quote` - Inspirational tech quote
- `morse <text>` - Convert text to Morse code
- `coffee` - ASCII art coffee cup
- `flip-coin` - Flip a coin
- `roll-dice` - Roll a dice
- `magic8ball <question>` - Ask the magic 8-ball
- `weather` - Get fake weather report
- `hack-nasa` - "Hack" NASA (just for fun!)
- `ascii-art` - Random ASCII art
- `timer <seconds>` - Set a countdown timer
- `matrix` - Toggle Matrix mode
- And more hidden surprises!

### Easter Egg Activation

**Method 1: Click the Egg**
- Find the glowing egg icon in the bottom-right corner
- Click it 7 times to unlock hidden commands
- Watch it transform from whole → broken egg

**Method 2: Konami Code**
- Type the classic: ↑ ↑ ↓ ↓ ← → ← → B A
- Instant unlock with "HACKING MODE: ACTIVATED" animation

**Visual Feedback:**
- Egg counter shows remaining clicks
- Activation shows terminal icon with neon glow
- "HACKING MODE: ACTIVATED" message appears
- Unlocked badge displays on egg icon

### Loading Screen

**Matrix Rain Loader:**
- Falling green characters (Katakana + Latin + Numbers)
- Your name emerges from the digital rain
- Animated progress bar (0-100%)
- Auto-completes after 4 seconds
- Skip anytime: Press ESC, ENTER, or SPACE (after 2s)
- Canvas-based 60 FPS animation
- Fully responsive design

## 🧪 Test Plan

### Smoke Tests

1. **Terminal Interface Test**
   - Navigate to homepage
   - Click on terminal input
   - Type `help` and press Enter
   - Verify: Available commands are displayed
   - Type each command (`about`, `skills`, `projects`, `contact`) and verify appropriate responses

2. **Resume Download Test**
   - Navigate to any section
   - Click "Download Resume" button or use `download-resume` terminal command
   - Verify: PDF file downloads successfully as "Sankalp_Pandey_Resume.pdf"

3. **Project Links Test**
   - Navigate to Projects section
   - Click on any "Code" or "Live Demo" links
   - Verify: Links open in new tab with correct URLs

## 🌐 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── LoadingScreen.tsx    # Matrix rain loading animation
│   │   ├── Hero.tsx             # Landing hero with typewriter effect
│   │   ├── Terminal.tsx         # Interactive terminal with 20+ commands
│   │   ├── EasterEgg.tsx        # Easter egg system (egg icon + activation)
│   │   ├── Navbar.tsx           # Navigation with active section highlighting
│   │   ├── ProjectCard.tsx      # Project showcase cards
│   │   ├── ExperienceCard.tsx   # Expandable experience timeline
│   │   ├── SkillPill.tsx        # Interactive skill badges
│   │   └── Footer.tsx           # Footer with contact links
│   ├── data/
│   │   └── resume.ts            # Portfolio content data
│   ├── assets/
│   │   └── profile.png          # Profile image (neon-themed)
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles, animations, utilities
├── public/
│   ├── resume.pdf               # Downloadable resume
│   └── og-image.html            # Open Graph preview image
├── netlify.toml                 # Netlify deployment config
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages CI/CD
├── README.md                    # Main documentation
├── EASTER_EGG_GUIDE.md         # Easter egg documentation
├── LOADING_SCREEN_IDEAS.md     # Loading screen concepts (archive)
└── LOADING_SCREEN_IMPLEMENTATION.md  # Loading screen technical docs
```

## 🎨 Design System

### Color Palette (Cyberpunk Theme)
```css
--bg: #0a0e27           /* Dark blue-black background */
--panel: #0f1720        /* Dark panel background */
--neon: #00ff9f         /* Primary neon green */
--cyan: #00d4ff         /* Secondary cyan accent */
--text: #e0e0e0         /* Primary text color */
--sub: #94a3b8          /* Secondary/muted text */
--danger: #ff3864       /* Error/glitch red */
```

### Typography
- **UI Font**: Inter (clean, modern sans-serif)
- **Mono Font**: IBM Plex Mono (terminal/code feel)
- **Loading Font**: Monospace (Matrix rain characters)

### Visual Effects
- **Glassmorphism**: `backdrop-blur-sm` with semi-transparent backgrounds
- **Neon Glow**: CSS `box-shadow` with multiple layers
- **Smooth Animations**: Framer Motion for page transitions
- **Canvas Effects**: HTML5 Canvas for Matrix rain
- **Hover States**: Scale transforms and glow enhancements

## 🔧 Customization Guide

### Content Updates
Edit `src/data/resume.ts` to update:
- Personal information and bio
- Skills and technologies
- Project details and links
- Work experience timeline
- Contact information and social links

### Styling Customization
- **Theme Colors**: Modify `tailwind.config.cjs` → `theme.extend.colors`
- **Animations**: Update `src/index.css` → custom keyframes
- **Loading Screen**: Adjust timing in `src/components/LoadingScreen.tsx`
- **Easter Egg**: Change activation count in `src/components/EasterEgg.tsx`
- **Terminal Commands**: Add/modify in `src/components/Terminal.tsx`

### Loading Screen Customization
```typescript
// In LoadingScreen.tsx

// Change display duration
setTimeout(() => onComplete(), 4000); // 4 seconds

// Change when skip becomes available
setTimeout(() => setCanSkip(true), 2000); // 2 seconds

// Change character set
const chars = katakana + latin + nums + '!@#$%'; // Add symbols

// Change colors
ctx.fillStyle = '#00ff9f'; // Neon green
```

### Easter Egg Customization
```typescript
// In EasterEgg.tsx

// Change click count to unlock
if (newClicks >= 7) { ... } // Currently 7 clicks

// In Terminal.tsx - Add new commands
case 'yourcommand':
  if (!easterEggUnlocked) {
    return 'Command not found...';
  }
  return 'Your custom output here!';
```

## 🐛 Known Issues & Limitations

### Performance
- **Matrix Rain**: May be intensive on low-end mobile devices (consider prefers-reduced-motion)
- **Canvas Animation**: Uses ~30-50MB memory during loading screen

### Accessibility
- **Loading Screen**: Not screen-reader friendly (cosmetic only)
- **Easter Eggs**: Visual-only activation (no audio cues)
- **Recommended**: Add skip button is available after 2 seconds

### Browser Compatibility
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support (iOS 12+)
- ⚠️ IE11: Not supported (uses modern ES6+ features)

## 📚 Documentation

- **Main README**: You're reading it!
- **Easter Egg Guide**: See `EASTER_EGG_GUIDE.md` for all hidden commands
- **Loading Screen**: See `LOADING_SCREEN_IMPLEMENTATION.md` for technical details
- **Loading Ideas**: See `LOADING_SCREEN_IDEAS.md` for alternative concepts

## 🚀 Performance Metrics

### Target Performance
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Loading Screen**: 60 FPS animation
- **Bundle Size**: < 500KB (gzipped)

### Optimization Techniques
- Code splitting with React.lazy (planned)
- Image optimization (WebP format)
- Tree-shaking unused dependencies
- Minification and compression
- Canvas cleanup and memory management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Follow existing TypeScript patterns
- Use functional components with hooks
- Maintain consistent naming conventions
- Add comments for complex logic
- Test on multiple browsers/devices

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Contact

**Sankalp Pandey** - SDET & Automation Engineer

- 📧 Email: sankalppandey531@gmail.com
- 💼 LinkedIn: [Sankalp Pandey](https://linkedin.com/in/sankalp-pandey-sdet)
- 🐙 GitHub: [@LogicByteX](https://github.com/LogicByteX)
- 📍 Location: Pune, Maharashtra, India

## 🌟 Features Roadmap

### Completed ✅
- [x] Matrix Rain Loading Screen
- [x] Interactive Terminal with 20+ commands
- [x] Easter Egg System (Click & Konami Code)
- [x] Responsive Design
- [x] Glassmorphism UI
- [x] SEO Optimization
- [x] Deployment Configurations

### Planned 🚧
- [ ] Blog section with MDX support
- [ ] Dark/Light theme toggle
- [ ] Resume export automation
- [ ] Contact form backend integration
- [ ] Testimonials section
- [ ] Analytics integration
- [ ] More easter egg commands
- [ ] Sound effects (muted by default)
- [ ] Prefers-reduced-motion support

## 🎉 Acknowledgments

- **Design Inspiration**: Cyberpunk 2077, The Matrix, Hacker aesthetics
- **Animation Library**: Framer Motion for smooth transitions
- **Icons**: Lucide React & Heroicons
- **Fonts**: Google Fonts (Inter, IBM Plex Mono)
- **Community**: React, TypeScript, and TailwindCSS communities

---

<div align="center">

**Built with ❤️ using React, TypeScript, and TailwindCSS**

⭐ Star this repo if you find it helpful! ⭐

🎬 **Experience the Matrix Rain** • 💻 **Explore the Terminal** • 🥚 **Find the Easter Eggs**

</div>
