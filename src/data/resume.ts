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
  // Core SDET & Automation
  "Java",
  "Selenium",
  "Rest Assured",
  "API Automation",
  "TestNG",
  "SQL",
  "JMeter",

  // DevOps & Tooling
  "CI/CD (GitHub Actions)",
  "Azure DevOps",
  "Jira",

  // QA Practices
  "Automation Testing",
  "Manual Testing",
  "Agile / Scrum",

  // Supporting / Frontend
  "Python (Utilities)",
  "JavaScript (Basic)",
  "TypeScript (Basic)",
  "React (Basic)",
  "Tailwind CSS"
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
    role: "SDET",
    company: "Aumni Techworks (Polestar Global – Maritime Domain)",
    period: "Jan 2025 – Present",
    achievements: [
      "Led end-to-end QA for a critical maritime sub-product delivered in 5 months under aggressive timelines",
      "Built a Rest Assured automation framework from scratch, automating 70+ APIs and reducing repetitive effort significantly",
      "Achieved 100% UI automation coverage with stable smoke and regression suites and zero post-release defects",
      "Performed JMeter-based load testing for up to 500 concurrent users to validate system performance"
    ]
  },
  {
    role: "Associate QA Engineer",
    company: "Cognizant",
    period: "Aug 2021 – Dec 2024",
    achievements: [
      "Executed manual and automation testing for web applications with strong focus on functional, API, and database testing",
      "Designed and ran sanity, integration, and regression test suites ensuring on-time, high-quality releases",
      "Collaborated closely with developers and stakeholders to identify, track, and resolve defects in Agile SCRUM teams"
    ]
  }
] as Experience[]
};
