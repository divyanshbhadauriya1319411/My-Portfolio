export const projects = [
  {
    id: 1,
    title: "RAMA INTERNATIONAL",
    type: "fullstack",
    tags: ["React", "TypeScript", "Django", "Python", "PostgreSQL", "REST API", "Tailwind CSS"],
    githubLink: "https://github.com/divyanshbhadauriya1319411/RAMAINTERNATIONAL",
    demoLink: "",
    status: "Completed",
    featured: true,
    description: "A luxury hotel booking web application with real-time reservation systems, administrative control dashboards, Stripe payment gateway integration, and localized multi-language features.",
    problemSolved: "Manual room reservation checks were slow and prone to double-bookings. I solved this by building an interactive, synchronized real-time booking ledger with automatic room allocation and instant email confirmation receipts.",
    keyFeatures: [
      "Real-time room availability matrix and reservation ledger",
      "Stripe payment gateway integration with webhooks handling",
      "Interactive administrator control panel for room updates",
      "Localized i18n multi-language support (English & Hindi)",
      "Role-based authorization and session tokens (JWT)"
    ],
    challengesSolved: "Handling concurrent booking requests on the same room without causing double bookings. Resolved this using database transaction locks (select_for_update) in PostgreSQL to serialize reservations."
  },
  {
    id: 2,
    title: "Rent-Drive",
    type: "frontend",
    tags: ["React", "Vite", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Git"],
    githubLink: "https://github.com/divyanshbhadauriya1319411/Rent-Drive",
    demoLink: "",
    status: "Completed",
    featured: true,
    description: "A modern car rental platform enabling users to browse available vehicles, compare pricing packages, filter by category, and place booking requests.",
    problemSolved: "Traditional car rental web lists were slow to load and visually cluttered. Implemented an optimized frontend layout utilizing Client-Side caching and virtual lists for ultra-fast browsing.",
    keyFeatures: [
      "Dynamic interactive filters (category, brand, rate thresholds)",
      "Redux-like Client-Side state management for booking summary cart",
      "Seamless layout transitions with micro-animations",
      "Complete cross-device response mapping for mobile screens"
    ],
    challengesSolved: "Managing catalog rendering times. Optimized render cycles by using React memoization hooks (useMemo, useCallback) to prevent unnecessary child component re-renders."
  },
  {
    id: 3,
    title: "StoreSaga",
    type: "fullstack",
    tags: ["React", "Redux", "Django", "Python", "REST API", "PostgreSQL", "Tailwind CSS", "Vercel"],
    githubLink: "https://github.com/divyanshbhadauriya1319411/StoreSaga",
    demoLink: "",
    status: "Completed",
    featured: true,
    description: "A high-performance e-commerce platform incorporating Redux global state stores, RESTful product catalogs, user session management, and catalog indexing.",
    problemSolved: "Decoupled frontend checkout carts often lost sync with the backend inventory. Resolved this by building synchronized Redux state hooks and building background Django inventory validators.",
    keyFeatures: [
      "Redux Toolkit global state store with localStorage persistence",
      "Django REST API product catalog endpoints with pagination",
      "User authentication and profile transaction history list",
      "Full search autocomplete index mapping"
    ],
    challengesSolved: "Synchronizing state updates under high-volume clicks. Designed debounced API dispatch calls to throttle database load while keeping client UI snappy."
  },
  {
    id: 4,
    title: "Premium Portfolio Website",
    type: "frontend",
    tags: ["React", "Vite", "Framer Motion", "Tailwind CSS", "Context API", "i18next", "GitHub"],
    githubLink: "https://github.com/divyanshbhadauriya1319411/Portfolio",
    demoLink: "https://divyanshbhadauriya.vercel.app",
    status: "Completed",
    featured: true,
    description: "Your modern recruiter-focused SaaS-inspired developer portfolio. Incorporates system theme tracking, EN/HI translations, and spring physics micro-interactions.",
    problemSolved: "Recruiters reviewing portfolios spend less than 30 seconds. Solved this by designing a high-impact, clean, Vercel-like typography layout with instant context rendering and no flash on reload.",
    keyFeatures: [
      "Flicker-free initial load theme context rendering",
      "Spring physics mouse parallax avatar card",
      "Full English & Hindi translations with static import loaders",
      "Fully responsive clean grid styling"
    ],
    challengesSolved: "Synchronizing theme styles across dynamic components. Configured class-based Tailwind overrides directly on documentElement to ensure transitions cascade globally."
  }
];
