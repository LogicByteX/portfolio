# 📝 Changelog

All notable changes to the Sankalp Pandey Portfolio project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2025-10-05

### 🎬 Added - Matrix Rain Loading Screen
- **LoadingScreen.tsx**: Full Matrix-style loading animation with falling characters
  - Canvas-based 60 FPS animation
  - Falling Katakana, Latin letters, and numbers
  - Name emergence animation with blur-to-focus effect
  - Animated progress bar (0-100%)
  - Skip functionality (ESC, ENTER, SPACE keys after 2s)
  - Auto-completion after 4 seconds
  - Fully responsive design
  - Proper cleanup of resources and event listeners
  
- **Loading Screen Documentation**:
  - `LOADING_SCREEN_IMPLEMENTATION.md` - Technical documentation
  - `LOADING_SCREEN_IDEAS.md` - Alternative concepts archive
  
### 🔄 Changed
- **App.tsx**: Added loading state management
  - Integrated LoadingScreen component
  - Shows on initial page load
  - Smooth transition to main content
  
- **EasterEgg.tsx**: Improved activation animation
  - Replaced checkmark with terminal icon
  - Changed "ACCESS GRANTED" to "> HACKING MODE: ACTIVATED"
  - Enhanced cyberpunk/hacker theme consistency
  - Fixed positioning issues with UNLOCKED badge (moved from right-8 to right-12)
  
- **Documentation Updates**:
  - Updated all README files with current features
  - Enhanced EASTER_EGG_GUIDE.md with detailed explanations
  - Added comprehensive user experience flows
  - Included technical implementation details

### 🐛 Fixed
- Fixed UNLOCKED text getting cut off at screen edge
- Improved hint tooltip timing (reduced from 3s to 1.5s)
- Better responsive positioning for mobile devices

---

## [1.1.0] - 2025-10-04

### 🥚 Added - Easter Egg System
- **EasterEgg.tsx**: Interactive Easter egg component
  - Floating egg icon in bottom-right corner
  - Click counter (7 clicks to unlock)
  - Egg transformation: whole → broken state
  - Activation animation with terminal icon
  - Konami Code support (↑↑↓↓←→←→BA)
  - Visual feedback and hints
  - "UNLOCKED" badge on activation
  
- **Hidden Terminal Commands** (15+ commands):
  - `joke` - Random programming jokes
  - `quote` - Inspirational tech quotes
  - `morse <text>` - Morse code converter
  - `coffee` - ASCII art coffee
  - `flip-coin` - Coin flipper
  - `roll-dice` - Dice roller
  - `magic8ball <question>` - Magic 8-ball
  - `timer <seconds>` - Countdown timer
  - `weather` - Fake weather report
  - `hack-nasa` - Fake NASA hack
  - `ascii-art` - Random ASCII art
  - `matrix` - Toggle Matrix mode
  - `secrets` - List all hidden commands
  - Plus more locked commands (sudo, hack)

- **Matrix Mode Effect**:
  - Green tint overlay on entire page
  - Scanline animation
  - Toggle on/off with `matrix` command
  - CSS-based implementation in `index.css`

### 🔄 Changed
- **Terminal.tsx**: 
  - Added Easter egg unlock state
  - Conditional command access
  - Konami Code detection
  - Enhanced command library
  
- **Navbar.tsx**: 
  - Added active section highlighting
  - Scroll-based detection
  - Animated underline indicator
  - Mobile menu state management

### 📚 Documentation
- Created `EASTER_EGG_GUIDE.md` with full Easter egg documentation
- Added user experience flows
- Included technical implementation details
- Added fun facts and trivia

---

## [1.0.0] - 2025-10-01

### 🎉 Initial Release

### ✨ Core Features
- **Hero Section**:
  - Typewriter animation effect
  - Profile image integration
  - Social links (GitHub, LinkedIn, Email)
  - Call-to-action buttons
  
- **Interactive Terminal**:
  - Command-line interface
  - 8+ basic commands (help, about, skills, projects, contact, experience, download-resume, clear)
  - Command history (↑/↓ arrow keys)
  - Autocomplete suggestions
  - Command output formatting
  
- **Project Showcase**:
  - ProjectCard component with glassmorphism
  - Tech stack badges
  - Live demo and GitHub links
  - Hover animations
  
- **Experience Timeline**:
  - ExperienceCard with expandable details
  - Company logos and dates
  - Achievement lists
  - Smooth expand/collapse animations
  
- **Skills Display**:
  - SkillPill components with categories
  - Hover effects with neon glow
  - Organized by skill type
  
- **Navigation**:
  - Sticky navbar with glassmorphism
  - Smooth scroll to sections
  - Mobile hamburger menu
  - Responsive design
  
- **Contact Section**:
  - Contact form (Netlify Forms ready)
  - Email copy-to-clipboard
  - Social media links
  - Location information

### 🎨 Design System
- **Theme**: Cyberpunk/Hacker aesthetic
- **Colors**: 
  - Neon Green (#00ff9f)
  - Cyan (#00d4ff)
  - Dark background (#0a0e27)
  - Glassmorphism panels
- **Typography**:
  - Inter font for UI
  - IBM Plex Mono for terminal/code
- **Effects**:
  - Glassmorphism with backdrop blur
  - Neon glow on interactive elements
  - Smooth animations with Framer Motion
  - Custom scrollbar styling

### 🛠️ Technical Stack
- **React 18.3.1** - UI framework
- **TypeScript 5.x** - Type safety
- **Vite 5.4.20** - Build tool (Node 18 compatible)
- **TailwindCSS 3.4.3** - Utility-first CSS
- **Framer Motion 11.x** - Animation library
- **Lucide React 0.468.0** - Icons
- **Heroicons 2.2.0** - Additional icons

### 📦 Configuration
- **PostCSS**: TailwindCSS processing
- **ESLint**: Code quality
- **TypeScript**: Strict mode enabled
- **Netlify**: Deployment configuration (`netlify.toml`)
- **GitHub Actions**: CI/CD workflow (`.github/workflows/deploy.yml`)

### 📄 Content
- `src/data/resume.ts` - Centralized portfolio content
- `public/resume.pdf` - Downloadable resume
- `src/assets/profile.png` - Profile image

### 🌐 SEO & Meta
- Open Graph tags for social sharing
- Proper meta descriptions
- Semantic HTML structure
- Favicon and app icons

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Touch-friendly interactions
- Optimized for all screen sizes

### ♿ Accessibility
- Keyboard navigation support
- ARIA labels and roles
- Focus indicators
- Semantic HTML elements

---

## [0.1.0] - 2025-09-28

### 🚧 Development Phase
- Initial project setup with Vite + React + TypeScript
- Basic component structure
- TailwindCSS integration
- Data structure planning

---

## Version Naming Convention

- **Major (X.0.0)**: Complete redesign or major feature overhaul
- **Minor (1.X.0)**: New features, components, or significant improvements
- **Patch (1.1.X)**: Bug fixes, documentation updates, minor tweaks

---

## Upcoming Features (Roadmap)

### [1.3.0] - Planned
- [ ] Blog section with MDX support
- [ ] Testimonials carousel
- [ ] Dark/Light theme toggle
- [ ] Contact form backend integration (EmailJS or similar)
- [ ] More Easter egg commands
- [ ] Sound effects for interactions (muted by default)

### [1.4.0] - Future
- [ ] Resume export automation (Puppeteer)
- [ ] Analytics integration (privacy-focused)
- [ ] Performance optimizations (code splitting, lazy loading)
- [ ] Prefers-reduced-motion support
- [ ] Accessibility improvements (screen reader testing)
- [ ] Internationalization (i18n) - Multi-language support

### [2.0.0] - Long-term
- [ ] Complete redesign with new theme options
- [ ] Admin panel for content management
- [ ] API integration for dynamic content
- [ ] Advanced animations and 3D effects
- [ ] Progressive Web App (PWA) capabilities
- [ ] Offline support

---

## Bug Tracker

### Known Issues
- [ ] Matrix rain may be intensive on very low-end devices
- [ ] Canvas animation uses 30-50MB memory during loading
- [ ] Easter egg not accessible to screen readers (cosmetic only)
- [ ] No IE11 support (modern browsers only)

### Fixed Issues
- [x] UNLOCKED text getting cut off at screen edge → Fixed in v1.2.0
- [x] Checkmark icon not matching theme → Fixed in v1.2.0
- [x] Easter egg activation animation timing → Fixed in v1.2.0
- [x] Navbar active section detection → Fixed in v1.1.0
- [x] Mobile menu not closing on link click → Fixed in v1.1.0
- [x] Profile image background/glow issues → Fixed in v1.0.0
- [x] PostCSS/TailwindCSS version conflicts → Fixed in v1.0.0
- [x] TypeScript import errors → Fixed in v1.0.0
- [x] Vite compatibility with Node 18 → Fixed in v1.0.0

---

## Contributing

See [README.md](README.md) for contribution guidelines.

## License

This project is open source under the MIT License.

---

**Last Updated**: October 5, 2025  
**Current Version**: 1.2.0  
**Maintained by**: Sankalp Pandey ([@LogicByteX](https://github.com/LogicByteX))
