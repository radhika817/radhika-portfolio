export const personalInfo = {
  name: "Radhika Kandalkar",
  title: "Full-Stack Developer · AI · Web3",
  tagline: "Computer Engineering student building full-stack applications, AI integrations, Web3, and scalable systems.",
  education: {
    institution: "MIT Academy of Engineering, Pune",
    degree: "B.Tech in Computer Engineering",
    period: "2024–2028",
    cgpa: "8.51/10",
  },
  bio: "I'm Radhika Kandalkar, a Computer Engineering student at MIT Academy of Engineering, Pune. I enjoy building full-stack applications and exploring AI integrations, Web3, and scalable systems. This portfolio helps recruiters and engineering teams quickly understand what I've built, the problems each project solves, and the technical decisions behind the work.",
  location: "Pune, India",
  email: "radhikakandalkar54@gmail.com",
  socials: {
    github: "https://github.com/radhika817",
    linkedin: "#", // Placeholder: Add profile URL
    leetcode: "#", // Placeholder: Add profile URL
    codechef: "#", // Placeholder: Add profile URL
  },
  resumeUrl: "/resume.pdf",
};

export const stats = [
  { value: "8.51", label: "Engineering CGPA", suffix: "/10" },
  { value: "1st", label: "Sinhgad Hackathon", suffix: " Prize" },
  { value: "500", label: "Participants Outranked", suffix: "+" },
  { value: "198", label: "Curated Questions", suffix: "" },
];

export const projects = [
  {
    id: "smartride",
    title: "SmartRide",
    subtitle: "Smart Campus & Workplace Carpooling",
    tagline: "Geospatial route matching and atomic seat reservations for sustainable commuting",
    description:
      "A full-stack carpooling platform featuring geospatial route matching based on route overlap, departure-time compatibility, and pickup/drop-off proximity.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Leaflet"],
    highlights: [
      "Atomic seat reservations to prevent double-booking.",
      "Real-time GPS tracking and participant-scoped in-ride messaging with Socket.IO.",
      "Commuter verification, emergency SOS alerts, and expiring trip-sharing links.",
      "Fuel, toll, and parking cost splitting.",
    ],
    liveUrl: "https://smart-carpooling.vercel.app",
    githubUrl: "", // Placeholder: Add the correct GitHub repository URL
  },
  {
    id: "preppulse",
    title: "PrepPulse",
    subtitle: "AI-Powered Interview Preparation",
    tagline: "Adaptive spaced repetition platform with 198 questions and Groq LLM evaluations",
    description:
      "An interview preparation platform with 198 curated questions across DSA, DBMS, OS, Computer Networks, OOP, SQL, aptitude, and HR.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Groq LLM API"],
    highlights: [
      "Adaptive daily challenges with five questions per day.",
      "Leitner-based spaced repetition to prioritize weak topics and schedule revisions.",
      "Groq-powered answer feedback.",
      "JWT authentication, role-based access control, and dashboards for accuracy, streaks, and revision progress.",
    ],
    liveUrl: "", // Placeholder: Add the deployed URL
    githubUrl: "", // Placeholder: Add the correct GitHub repository URL
  },
  {
    id: "socio3",
    title: "Socio3",
    subtitle: "Decentralized Social Media dApp",
    tagline: "Sepolia smart contracts, IPFS storage, and crypto tipping — 1st at Sinhgad Hackathon",
    description:
      "A Web3 social platform featuring IPFS-based content storage, wallet authentication, and cryptocurrency tipping through Solidity smart contracts deployed on Sepolia.",
    tech: ["React", "Solidity", "Hardhat", "Ethers.js", "IPFS", "Firebase"],
    highlights: [
      "Firebase Firestore for real-time data management and social interactions.",
      "Solidity smart contracts deployed on Sepolia for cryptocurrency tipping.",
      "IPFS decentralized content distribution and Web3 wallet authentication.",
      "1st place winner at Sinhgad Hackathon 2026 (100 teams, 500+ participants).",
    ],
    award: "1st Place — Sinhgad Hackathon 2026",
    liveUrl: "https://socio3.vercel.app",
    githubUrl: "https://github.com/atharvabaodhankar/Socio3",
  },
];

export const experience = [
  {
    id: "cisco",
    role: "Cisco Networking Intern",
    organization: "Cisco Networking Academy (AICTE Virtual Internship)",
    period: "Virtual Internship",
    responsibilities: [
      "Practiced IP addressing, subnetting, networking protocols, and basic network configuration.",
      "Applied analytical problem-solving to connectivity diagnosis and network troubleshooting.",
    ],
  },
  {
    id: "launched",
    role: "Campus Brand Ambassador",
    organization: "LaunchEd Global EdTech",
    period: "Campus Outreach",
    responsibilities: [
      "Promoted EdTech programs and supported student registrations through campus outreach.",
      "Coordinated promotional campaigns with the brand team to improve student engagement.",
    ],
  },
];

export const skillsData = {
  languages: ["Python", "C", "C++", "Java", "JavaScript", "SQL", "HTML", "CSS"],
  webDevelopment: ["React", "Node.js", "Express.js", "Tailwind CSS", "REST APIs"],
  blockchainWeb3: ["Solidity", "Hardhat", "Ethers.js", "IPFS", "smart contracts", "Sepolia"],
  aiIntegrations: ["Groq LLM API", "AI-powered answer evaluation"],
  databases: ["MongoDB", "MySQL", "Firebase Firestore"],
  cloudTools: ["AWS", "Git", "GitHub", "Postman", "Socket.IO", "Leaflet"],
  computerScience: [
    "Data Structures and Algorithms",
    "OOP",
    "DBMS",
    "networking fundamentals",
    "discrete mathematics",
  ],
};

export const achievements = [
  {
    id: "sinhgad-hackathon",
    title: "1st Prize — Sinhgad Hackathon 2026",
    description:
      "Ranked first among approximately 100 teams and 500+ participants with Socio3 in a 24-hour hackathon.",
    badge: "1st / 100+ Teams",
    highlight: true,
  },
  {
    id: "vellora-hackathon",
    title: "Top 10 — Vellora Hackathon",
    description: "Among 400+ participating teams at MIT AOE.",
    badge: "Top 10 / 400+ Teams",
    highlight: false,
  },
  {
    id: "project-expo",
    title: "Top 6 — Project Expo",
    description: "Among 70+ participating teams.",
    badge: "Top 6 / 70+ Teams",
    highlight: false,
  },
  {
    id: "decode-sih",
    title: "Top 50 — Decode SIH Hackathon",
    description: "Selected among the top 50 teams out of 1,000+ participating teams.",
    badge: "Top 50 / 1,000+ Teams",
    highlight: false,
  },
  {
    id: "sih-2026",
    title: "Internal Round Qualifier — Smart India Hackathon 2026",
    description: "Qualified for the internal selection round.",
    badge: "Internal Qualifier",
    highlight: false,
  },
];

export const contactInfo = {
  email: "radhikakandalkar54@gmail.com",
  location: "Pune, India",
  profiles: [
    { name: "GitHub", url: "https://github.com/radhika817", placeholder: false },
    { name: "LinkedIn", url: "#", placeholder: true, note: "Add profile URL" },
    { name: "LeetCode", url: "#", placeholder: true, note: "Add profile URL" },
    { name: "CodeChef", url: "#", placeholder: true, note: "Add profile URL" },
  ],
};

export const terminalCommands = {
  help: "Available commands: help, projects, skills, achievements, experience, contact, bio, clear",
  bio: `${personalInfo.name} — ${personalInfo.title}\n${personalInfo.bio}`,
  projects: projects.map((p) => `• ${p.title} (${p.tech.join(", ")}): ${p.subtitle}`).join("\n"),
  skills: Object.entries(skillsData)
    .map(([category, items]) => `• ${category}: ${items.join(", ")}`)
    .join("\n"),
  achievements: achievements.map((a) => `• ${a.title}`).join("\n"),
  experience: experience.map((e) => `• ${e.role} @ ${e.organization}`).join("\n"),
  contact: `Email: ${contactInfo.email} | Location: ${contactInfo.location}`,
};
