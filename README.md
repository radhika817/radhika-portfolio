# radhika-portfolio
# Radhika Kandalkar — Developer Portfolio

A highly animated, interactive developer portfolio built with **React + Vite**. It opens with a 3D developer avatar on the first screen, reacts to the cursor everywhere, and presents projects, skills, and achievements through a dark, futuristic, violet-accented experience.

> **Design direction:** Violet After Dark — immersive motion, cursor-driven effects, a 3D avatar landing page, and project case studies focused on engineering decisions.

## About

I'm Radhika Kandalkar, a Computer Engineering student at **MIT Academy of Engineering, Pune** (B.Tech, 2024–2028; CGPA: 8.51/10). I enjoy building full-stack applications and exploring AI integrations, Web3, and scalable systems.

This portfolio helps recruiters and engineering teams quickly understand what I've built, the problems each project solves, and the technical decisions behind the work.

## Features & Architecture Overview

### 1. Hero Landing & 3D Interactive Avatar
- **Interactive 3D Avatar:** Pixel-art developer avatar featuring real-time perspective tilt tracking the cursor, continuous idle float physics, dynamic holographic glare, and an animated violet aurora backdrop.
- **Typewriter Role Introduction:** Snappy role line ("Full-Stack Developer · AI · Web3") with blinking caret and availability status badge ("Available for Opportunities & Internships").
- **Magnetic CTAs:** Primary call-to-actions ("View Projects", "Download Resume", "Contact Me") with smooth magnetic pull springs.
- **Interactive Preloader:** Initial brand intro animation with percentage reveal counter and smooth curtain-reveal transition.
- **Scroll Indicator:** Pulsing scroll pill guiding visitors toward featured work.

### 2. Spatial Cursor & Particle FX
- **Custom Dual Cursor:** Ultra-responsive center dot and trailing ring driven by Framer Motion springs, auto-disabled on touch devices.
- **Contextual Hover Badges:** Trailing ring smoothly morphs and displays action labels ("View", "Open", "Drag", "Copy") when hovering interactive components.
- **Ambient Spotlight Glow:** Soft 600px violet radial glow tracking the cursor across the background with spring smoothing.
- **Particle Trail:** High-performance HTML5 canvas particle engine emitting short-lived violet sparkles on rapid mouse gestures with capped particle pools and zero idle CPU usage.
- **Click Ripple:** Expanding geometric ripple pulses triggered globally on click.

### 3. Navigation & Smooth Motion
- **Lenis Smooth Scroll:** Synchronized with GSAP ScrollTrigger for consistent momentum scrolling.
- **Glassmorphism Navbar:** Fixed blurred navigation header with brand monogram "RK", section anchor links, and active section spy highlighting.
- **Top Scroll Progress Bar:** Gradient violet scroll progress indicator tracking page position.
- **Mobile Menu Drawer:** Animated slide-in glass navigation menu with accessible focus trap and keyboard navigation.

### 4. Interactive Terminal & Deep Case Studies
- **Interactive Unix Terminal:** Styled bash terminal with traffic light controls, command history (up/down arrow navigation), tab completion, typing animation for outputs, and dynamic theme switching (`theme` toggles between Violet, Cyan, Emerald, Amber, and Rose).
- **Engineering Case Study Modals:** Full-screen modal dialogues for SmartRide, PrepPulse, and Socio3 detailing Problem Statement, Approach, Architecture Decisions, and Stack, equipped with Escape key dismissal and focus trapping.
- **Stat Counters & Timeline:** Verified academic stats at MIT AOE (CGPA 8.51/10, 198 questions, 500+ participants) and vertical experience timeline for Cisco Networking Academy and LaunchEd Global EdTech.
- **Infinite Tech Marquee:** Continuous marquee row showcasing core engineering technologies.
- **Contact & Feedback:** Direct communication hub with instant clipboard email copy (with toast notification) and interactive mailto composer form.

### 5. Accessibility & Performance
- **Reduced Motion Support:** Respects `prefers-reduced-motion: reduce` by disabling cursor effects, particles, 3D tilt, and parallax without layout shift.
- **Lazy Loading & Code-Splitting:** Dynamic `React.lazy()` chunking for `Avatar3D` and below-the-fold sections, paired with manual vendor chunking in Vite.
- **Optimized Assets:** WebP image optimization with explicit dimensions and requestAnimationFrame (rAF) throttled mouse listeners.
- **Keyboard Landmarks & Focus Rings:** Semantic landmark elements, skip-to-content anchor, and visible high-contrast focus rings.

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

- **Framework:** React 19 + Vite 6 (JavaScript)
- **Animation & Physics:** Framer Motion (spring transitions, 3D tilt, case study modal), GSAP + ScrollTrigger (scroll timeline sync)
- **Smooth Scroll:** Lenis smooth inertial scrolling
- **Avatar & Visuals:** 3D perspective card tilt with cursor tracking, holographic glare, and optimized WebP/PNG assets
- **Interactive Cursor FX:** Dual-ring spring cursor with contextual labels, soft 600px radial glow spotlight, and HTML5 canvas particle trail
- **Terminal Emulator:** Custom bash terminal engine with command history, tab-completion, and live theme palette switching
- **Icons:** Lucide React
- **Styling:** Vanilla CSS with "Violet After Dark" design tokens (CSS custom properties, glassmorphism, responsive utilities)
- **Deployment & Edge:** Vercel SPA routing & immutable cache headers

## Getting Started

### Prerequisites

- Node.js (version 18+ recommended)
- npm or pnpm / yarn

### Run Locally

```bash
# Clone the repository
git clone https://github.com/radhika817/radhika-portfolio.git
cd radhika-portfolio

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open the local address printed in your terminal (typically `http://localhost:5173`).

### Project Structure

```text
radhika-portfolio/
├── public/
│   ├── favicon.svg             # Violet After Dark monogram favicon
│   ├── images/
│   │   ├── avatar.png          # Fallback avatar
│   │   └── avatar.webp         # Compressed WebP avatar
│   ├── models/                 # 3D model assets
│   └── resume.pdf              # Developer resume
├── src/
│   ├── components/
│   │   ├── About.jsx           # Bio & animated stat counters
│   │   ├── Achievements.jsx    # Hackathon awards & counters
│   │   ├── Avatar3D.jsx        # 3D interactive avatar
│   │   ├── ClickRipple.jsx     # Global click ripple pulses
│   │   ├── Contact.jsx         # Direct contact hub & mailto form
│   │   ├── CursorGlow.jsx      # Ambient radial spotlight
│   │   ├── CustomCursor.jsx    # Dual-ring cursor with labels
│   │   ├── Experience.jsx      # Vertical timeline
│   │   ├── Footer.jsx          # Philosophy quote & back-to-top
│   │   ├── Hero.jsx            # Hero layout & typing intro
│   │   ├── MagneticButton.jsx  # Spring magnetic wrapper
│   │   ├── MobileMenu.jsx      # Slide-out glass drawer
│   │   ├── Navbar.jsx          # Fixed glassmorphic navigation
│   │   ├── ParticleTrail.jsx   # Canvas particle sparkles
│   │   ├── Preloader.jsx       # Introductory reveal sequence
│   │   ├── ProjectCard.jsx     # Spotlight cards with 3D tilt
│   │   ├── ProjectCaseStudyModal.jsx # Deep-dive modal
│   │   ├── Projects.jsx        # Featured projects grid
│   │   ├── ScrollProgressBar.jsx # Viewport scroll indicator
│   │   ├── Skills.jsx          # Skill chips & infinite tech marquee
│   │   └── Terminal.jsx        # Interactive Unix terminal
│   ├── data/
│   │   └── content.js          # Structured portfolio content
│   ├── hooks/
│   │   ├── useActiveSection.js # IntersectionObserver nav spy
│   │   ├── useMousePosition.js # Throttled mouse position hook
│   │   ├── usePointerType.js   # Fine vs coarse device detection
│   │   ├── useReducedMotion.js # prefers-reduced-motion listener
│   │   └── useSmoothScroll.js  # Lenis + GSAP sync hook
│   ├── App.jsx                 # Application root & lazy split views
│   ├── index.css               # Design tokens, reset & responsive media
│   └── main.jsx                # React DOM entrypoint
├── index.html                  # SEO tags, OG metadata, fonts
├── package.json
├── vercel.json                 # Vercel SPA routing configuration
└── README.md
```

## Built Implementation Stages

1. **Stage 1 (Setup):** Repository scaffold, dependencies, and Violet After Dark design tokens.
2. **Stage 2 (Cursor System):** Spring cursor, dynamic labels, radial spotlight, canvas sparkles, and click ripple.
3. **Stage 3 (Hero & Avatar):** Preloader sequence, hero layout with typewriter intro, magnetic CTAs, and 3D avatar.
4. **Stage 4 (Navigation & Smooth Scroll):** Lenis smooth scroll, glass navbar, mobile menu drawer, and active section spy.
5. **Stage 5 (Projects):** Spotlight border glow, 3D tilt physics, architecture case study modals, and link fallbacks.
6. **Stage 6 (Skills, Experience, Achievements):** Categorized chips, infinite tech marquee, experience timeline, and counters.
7. **Stage 7 (Terminal & Contact):** Interactive bash terminal with tab-completion and themes, contact hub, and footer.
8. **Stage 8 (Polish):** Full keyboard accessibility, reduced-motion compliance, lazy code-splitting, rAF throttling, and responsive pass.
9. **Stage 9 (Deployment):** Vercel SPA configuration, asset caching, and production deployment documentation.


Built with curiosity, iteration, and a focus on solving real problems.
