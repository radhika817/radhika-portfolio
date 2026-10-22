# radhika-portfolio
# Radhika Kandalkar — Developer Portfolio

A highly animated, interactive developer portfolio built with **React + Vite**. It opens with a 3D developer avatar on the first screen, reacts to the cursor everywhere, and presents projects, skills, and achievements through a dark, futuristic, violet-accented experience.

> **Design direction:** Violet After Dark — immersive motion, cursor-driven effects, a 3D avatar landing page, and project case studies focused on engineering decisions.

## About

I'm Radhika Kandalkar, a Computer Engineering student at **MIT Academy of Engineering, Pune** (B.Tech, 2024–2028; CGPA: 8.51/10). I enjoy building full-stack applications and exploring AI integrations, Web3, and scalable systems.

This portfolio helps recruiters and engineering teams quickly understand what I've built, the problems each project solves, and the technical decisions behind the work.

## Experience Overview (Animation & Interaction Spec)

### 1. First Page (Hero) — Avatar Landing
- Full-screen hero with the **3D developer avatar** front and center (right side on desktop, top on mobile).
- Avatar subtly **follows the cursor** (head/body tilt via parallax or Three.js look-at) and floats with an idle animation.
- Intro text types in line by line: name, role ("Full-Stack Developer · AI · Web3"), and a short tagline.
- Animated gradient/aurora glow behind the avatar, floating particles, and a faint grid.
- Primary CTAs: **View Projects**, **Download Resume**, **Contact Me**, with magnetic hover effect.
- Scroll indicator that pulses at the bottom.
- Preloader/intro animation (name reveal, then the hero slides in).

### 2. Cursor Effects (site-wide)
- **Custom cursor:** small dot + larger trailing ring with smooth spring physics (hidden on touch devices).
- **Cursor glow:** soft violet radial spotlight following the pointer across the background.
- **Hover states:** ring expands and shows labels such as "View", "Open", "Drag" over cards, links, and buttons.
- **Magnetic buttons:** buttons gently pull toward the cursor.
- **Particle trail (optional):** short-lived violet sparkles behind fast cursor movement.
- **Spotlight cards:** project cards reveal a border glow that tracks the cursor, plus subtle 3D tilt.
- **Click ripple:** a small pulse animation on click.

### 3. Page Motion
- Smooth inertial scrolling (Lenis).
- Section reveals, staggered text animations, and scroll-linked parallax.
- Animated skill chips/marquee, counters for stats (e.g., 198 questions, 500+ participants).
- Page transitions between home and project case-study pages.
- Animated scroll progress bar and active-section navbar highlighting.

### 4. Interactive Features
- **Portfolio terminal:** type `help`, `projects`, `skills`, `achievements`, `contact`, `resume` to explore.
- Interactive project cards with hover previews and detailed case studies.
- Achievements timeline with animated entries.
- Optional easter eggs (Konami code, theme accent switcher).

### 5. Accessibility & Performance
- `prefers-reduced-motion` disables heavy effects (custom cursor, particles, parallax).
- Keyboard navigation and visible focus states; native cursor restored on touch/coarse pointers.
- Lazy-loaded 3D assets, compressed avatar model, and fallback static avatar image.
- Responsive layouts for desktop, tablet, and mobile.

The 3D avatar is a visual representation. It should not be presented as a real photograph.

## Featured Projects

### SmartRide — Smart Campus & Workplace Carpooling

**Tech:** React, Node.js, Express.js, MongoDB, Socket.IO, Leaflet

A full-stack carpooling platform featuring geospatial route matching based on route overlap, departure-time compatibility, and pickup/drop-off proximity.

-   Atomic seat reservations to prevent double-booking.
-   Real-time GPS tracking and participant-scoped in-ride messaging with Socket.IO.
-   Commuter verification, emergency SOS alerts, and expiring trip-sharing links.
-   Fuel, toll, and parking cost splitting.
-   **Live demo:** https://smart-carpooling.vercel.app


### PrepPulse — AI-Powered Interview Preparation

**Tech:** React, Node.js, Express.js, MongoDB, Groq LLM API

An interview preparation platform with 198 curated questions across DSA, DBMS, OS, Computer Networks, OOP, SQL, aptitude, and HR.

-   Adaptive daily challenges with five questions per day.
-   Leitner-based spaced repetition to prioritize weak topics and schedule revisions.
-   Groq-powered answer feedback.
-   JWT authentication, role-based access control, and dashboards for accuracy, streaks, and revision progress.
-   **Live demo:** https://prep-pulse-hazel.vercel.app/

### Socio3 — Decentralized Social Media dApp

**Tech:** React, Solidity, Hardhat, Ethers.js, IPFS, Firebase

A Web3 social platform featuring IPFS-based content storage, wallet authentication, and cryptocurrency tipping through Solidity smart contracts deployed on Sepolia.

-   Firebase Firestore for real-time data management and social interactions.
-   **Achievement:** 1st place at Sinhgad Hackathon 2026.
-   **Live demo:** https://socio3.vercel.app

## Experience

### Cisco Networking Academy — Cisco Networking Intern (AICTE Virtual Internship)

-   Practiced IP addressing, subnetting, networking protocols, and basic network configuration.
-   Applied analytical problem-solving to connectivity diagnosis and network troubleshooting.

### LaunchEd Global EdTech — Campus Brand Ambassador

-   Promoted EdTech programs and supported student registrations through campus outreach.
-   Coordinated promotional campaigns with the brand team to improve student engagement.

## Technical Skills

-   **Languages:** Python, C, C++, Java, JavaScript, SQL, HTML, CSS
-   **Web development:** React, Node.js, Express.js, Tailwind CSS, REST APIs
-   **Blockchain & Web3:** Solidity, Hardhat, Ethers.js, IPFS, smart contracts, Sepolia
-   **AI & integrations:** Groq LLM API, AI-powered answer evaluation
-   **Databases:** MongoDB, MySQL, Firebase Firestore
-   **Cloud & tools:** AWS, Git, GitHub, Postman, Socket.IO, Leaflet
-   **Computer science:** Data Structures and Algorithms, OOP, DBMS, networking fundamentals, discrete mathematics

## Achievements

-   **1st Prize — Sinhgad Hackathon 2026:** Ranked first among approximately 100 teams and 500+ participants with Socio3 in a 24-hour hackathon.
-   **Top 10 — Vellora Hackathon:** Among 400+ participating teams at MIT AOE.
-   **Top 6 — Project Expo:** Among 70+ participating teams.
-   **Decode SIH Hackathon:** Selected among the top 50 teams out of 1,000+ participating teams.
-   **Smart India Hackathon 2026:** Qualified for the internal selection round.

## Tech Stack

-   **Framework:** React + Vite
-   **Animation:** Framer Motion (UI/section motion), GSAP + ScrollTrigger (scroll-driven sequences)
-   **Smooth scroll:** Lenis
-   **3D avatar:** React Three Fiber + drei (Three.js), loading a `.glb` model, with a static PNG fallback
-   **Cursor effects:** Custom React cursor component (Framer Motion springs) + canvas/CSS particle trail
-   **Icons:** Lucide React
-   **Styling:** Tailwind CSS or CSS variables with a consistent violet design system
-   **Deployment:** Vercel

## Getting Started

### Prerequisites

Install a supported version of Node.js and npm.

### Install and run locally

``` bash
npm create vite@latest radhika-portfolio -- --template react
cd radhika-portfolio
npm install
npm install framer-motion gsap lenis lucide-react three @react-three/fiber @react-three/drei
npm run dev
```

Open the local URL printed in your terminal, commonly `http://localhost:5173`.

### Suggested project structure

``` text
radhika-portfolio/
├── public/
│   ├── models/
│   │   └── avatar.glb
│   ├── images/
│   │   └── avatar.png          # static fallback
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── Preloader.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── CursorGlow.jsx
│   │   ├── ParticleTrail.jsx
│   │   ├── MagneticButton.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Avatar3D.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Skills.jsx
│   │   ├── Achievements.jsx
│   │   ├── Terminal.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── content.js          # projects, skills, achievements
│   ├── hooks/
│   │   ├── useMousePosition.js
│   │   └── useReducedMotion.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Build Plan 

Build in small, reviewable stages. Give Antigravity one stage at a time and check the result in the browser before moving on.

1.  **Setup:** Scaffold Vite + React, install dependencies, set up the violet design tokens (colors, fonts, spacing) in `index.css`.
2.  **Cursor system:** `CustomCursor`, `CursorGlow`, hover-state labels, reduced-motion and touch fallbacks.
3.  **Hero + avatar:** Preloader, hero layout, `Avatar3D` with cursor-follow, aurora glow, particles, typing intro.
4.  **Navbar + smooth scroll:** Lenis, scroll progress bar, active-section highlighting.
5.  **Projects:** Spotlight/tilt cards, hover previews, case-study pages.
6.  **Skills, achievements, experience:** Animated chips, counters, timeline.
7.  **Terminal + contact:** Command-based terminal, contact form or links.
8.  **Polish:** Accessibility, mobile layouts, performance (lazy-load 3D), SEO meta tags.
9.  **Deploy:** Vercel.


Built with curiosity, iteration, and a focus on solving real problems.
