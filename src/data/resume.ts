export interface Project {
  title: string;
  tech: string[];
  description: string;
  links: {
    code?: string;
    live?: string;
  };
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

export const resumeData = {
  hero: {
    title: "Sankalp Pandey — SDET, Quality & Automation Hacker",
    tagline: "I build reliable testing systems, automate the boring, and stress-test the limits — so teams ship fearless.",
    cta: "Open terminal — Explore my work"
  },
  
  about: {
    paragraphs: [
      "Results-driven SDET with 4+ years of experience building resilient automation frameworks and performance tests. I obsess over edge cases, reduce manual toil, and make flaky tests a thing of the past.",
      "Hands-on with Java, Selenium, Rest Assured, JMeter, and modern JavaScript toolchains. I use AI tooling to speed up delivery and make test systems smarter. I ship pragmatic automation that developers actually maintain."
    ]
  },
  
  skills: [
    "Java",
    "Selenium", 
    "Rest Assured",
    "SQL",
    "JMeter",
    "CI/CD (GitHub Actions)",
    "TestNG",
    "Usage of Python",
    "Usage of JavaScript",
    "React",
    "TailwindCSS",
    "NeedToChange-Docker"
  ],
  
  contact: {
    email: "sankalppandey531@gmail.com",
    location: "Pune, Maharashtra, India",
    github: "github.com/LogicByteX"
  },
  
  projects: [
    {
      title: "Cinema Score Evaluator",
      tech: ["Java", "Selenium", "Apache POI"],
      description: "Scrapes IMDb & Rotten Tomatoes to compute watch-verdicts and generate Excel reports. Automated end-to-end validations; integrating Apache POI for Excel-driven test data.",
      links: {
        code: "https://github.com/LogicByteX/cinema-score-evaluator"
      }
    },
    {
      title: "WaveLength (voice search)",
      tech: ["JavaScript", "React", "Google Search API", "Gemini API"],
      description: "Voice-based search that suggests nearby sites and context-aware results; integrates speech recognition and LLM-powered suggestions.",
      links: {
        code: "https://github.com/LogicByteX/wavelength",
        live: "https://wavelength-demo.netlify.app"
      }
    },
    {
      title: "SRM Helper",
      tech: ["HTML", "JS", "MySQL"],
      description: "Campus e-portal to access notes and study material; improved availability for students.",
      links: {
        code: "https://github.com/LogicByteX/srm-helper"
      }
    }
  ] as Project[],
  
  experience: [
    {
      role: "Senior SDET",
      company: "Tech Solutions Inc",
      period: "2021 - Present",
      achievements: [
        "Built automated test frameworks reducing manual testing by 80%",
        "Implemented performance testing suite using JMeter and custom monitoring",
        "Led API testing strategy with Rest Assured and CI/CD integration"
      ]
    },
    {
      role: "QA Automation Engineer",
      company: "Software Innovations Ltd",
      period: "2019 - 2021", 
      achievements: [
        "Developed Selenium-based UI automation framework",
        "Created data-driven testing approach with Apache POI integration",
        "Mentored junior QA engineers on automation best practices"
      ]
    }
  ] as Experience[]
};
