import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ExperienceCard from './components/ExperienceCard';
import SkillPill from './components/SkillPill';
import Footer from './components/Footer';
import EasterEgg from './components/EasterEgg';
import LoadingScreen from './components/LoadingScreen';
import MouseTrail from './components/MouseTrail';
import BackgroundAnimations from './components/BackgroundAnimations';
import AnimationControls from './components/AnimationControls';
import ThemeToggle from './components/ThemeToggle';
import { AnimationProvider } from './components/AnimationProvider';
import { ThemeProvider } from './components/ThemeProvider';
import { resumeData } from './data/resume';
import { Mail, Send } from 'lucide-react';
import profileImage from './assets/profile.png';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - could integrate with Netlify Forms
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(resumeData.contact.email);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleEasterEggActivate = () => {
    // Trigger terminal command
    const event = new CustomEvent('easterEgg');
    window.dispatchEvent(event);
  };

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Background Animations */}
      <BackgroundAnimations />
      
      {/* Mouse Trail Effect */}
      <MouseTrail />
      
      <Navbar />
      
      {/* Easter Egg Component */}
      <EasterEgg onActivate={handleEasterEggActivate} />
      
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-mono text-neon mb-8">
              About Me
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Profile Image for Mobile/Tablet */}
              <motion.div
                className="lg:hidden flex justify-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-48 h-48">
                  <img
                    src={profileImage}
                    alt="Sankalp Pandey Profile"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </motion.div>

              {resumeData.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-sub text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Profile Image for Desktop */}
              <motion.div
                className="hidden lg:flex justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-64 h-64">
                  <img
                    src={profileImage}
                    alt="Sankalp Pandey Profile"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </motion.div>

              <div className="glass-panel p-8">
                <h3 className="text-xl font-mono text-neon mb-6">Core Skills</h3>
                <div className="grid grid-cols-2 gap-3">
                  {resumeData.skills.slice(0, 8).map((skill, index) => (
                    <SkillPill key={index} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-panel/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-mono text-neon mb-8">
              Technical Arsenal
            </h2>
            <p className="text-sub text-lg max-w-2xl mx-auto">
              Technologies and tools I use to build robust automation frameworks and performance testing solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {resumeData.skills.map((skill, index) => (
              <SkillPill key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-mono text-neon mb-8">
              Experience
            </h2>
            <p className="text-sub text-lg">
              My journey in software testing and automation engineering.
            </p>
          </motion.div>

          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-panel/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-mono text-neon mb-8">
              Featured Projects
            </h2>
            <p className="text-sub text-lg max-w-2xl mx-auto">
              A showcase of automation tools, testing frameworks, and applications I've built.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumeData.projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-mono text-neon mb-8">
              Get In Touch
            </h2>
            <p className="text-sub text-lg">
              Ready to discuss automation strategies or potential collaborations? Let's connect!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="glass-panel p-6">
                <h3 className="text-xl font-mono text-neon mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <motion.button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-3 w-full text-left p-3 rounded border border-neon/30 hover:border-neon hover:bg-neon/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Mail className="text-neon" size={20} />
                    <div>
                      <div className="text-white font-mono">{resumeData.contact.email}</div>
                      <div className="text-sub text-sm">Click to copy</div>
                    </div>
                  </motion.button>

                  <div className="flex items-center gap-3 p-3 rounded border border-panel/50">
                    <div className="w-5 h-5 rounded-full bg-cyan flex items-center justify-center">
                      <div className="w-2 h-2 bg-bg rounded-full"></div>
                    </div>
                    <div>
                      <div className="text-white font-mono">{resumeData.contact.location}</div>
                      <div className="text-sub text-sm">Based in India</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="glass-panel p-6 space-y-6">
                <h3 className="text-xl font-mono text-neon mb-4">Send Message</h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-sub mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-panel border border-panel/50 rounded text-white font-mono focus:border-neon focus:outline-none transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-sub mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-panel border border-panel/50 rounded text-white font-mono focus:border-neon focus:outline-none transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-sub mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full p-3 bg-panel border border-panel/50 rounded text-white font-mono focus:border-neon focus:outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neon text-bg font-semibold font-mono rounded hover:bg-neon/90 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={18} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Control Buttons - Fixed Bottom Left */}
      <div className="fixed bottom-8 left-8 z-40 flex flex-col gap-3">
        <ThemeToggle />
        <AnimationControls />
      </div>
    </div>
  );
}

const AppWithProvider = () => {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <App />
      </AnimationProvider>
    </ThemeProvider>
  );
};

export default AppWithProvider;
