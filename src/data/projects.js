export const projects = [
  {
    id: 1,
    title: "RAMA INTERNATIONAL — Commercial Export Platform",
    type: "fullstack",
    tags: ["React.js", "Tailwind CSS", "Django REST Framework", "PostgreSQL", "JWT Auth"],
    githubLink: "https://github.com/divyanshbhadauriya1319411/RAMAINTERNATIONAL",
    demoLink: "https://github.com/divyanshbhadauriya1319411/RAMAINTERNATIONAL",
    status: "Completed",
    featured: true,
    description: "Full-stack commercial export trading and catalog platform with dynamic product filtering, automated inquiry routing, and optimized backend APIs.",
    problemSolved: "Traditional export inquiry workflows relied on disjointed email chains and manual data entry, leading to delayed response times and unorganized candidate/lead routing.",
    keyFeatures: [
      "Dynamic product filtering and real-time catalog search",
      "Automated client inquiry routing and notification system",
      "Optimized Django REST Framework backend APIs with sub-50ms latency",
      "Role-based JWT authentication and secure session handling",
      "PostgreSQL relational database schema with strict indexing"
    ],
    challengesSolved: "Optimizing complex multi-table JOINs for dynamic filtering across thousands of catalog items while maintaining instantaneous frontend state synchronization."
  },
  {
    id: 2,
    title: "Rent-Drive — Vehicle Rental & Reservation Portal",
    type: "fullstack",
    tags: ["React.js", "Node.js/Django REST", "PostgreSQL", "Tailwind CSS"],
    githubLink: "https://github.com/divyanshbhadauriya1319411/Rent-Drive",
    demoLink: "https://github.com/divyanshbhadauriya1319411/Rent-Drive",
    status: "Completed",
    featured: true,
    description: "End-to-end vehicle rental platform featuring real-time availability checks, multi-date pricing algorithms, and an admin dashboard.",
    problemSolved: "Concurrency challenges in high-demand vehicle reservation systems often cause overlapping bookings when multiple users attempt to reserve the same vehicle simultaneously.",
    keyFeatures: [
      "Real-time vehicle availability checks across multi-date intervals",
      "Dynamic pricing algorithms computing packages and discounts",
      "Comprehensive administrative dashboard for fleet management",
      "Relational validation and transaction locking in PostgreSQL",
      "Responsive React single-page UI with zero layout shift"
    ],
    challengesSolved: "Implemented database-level constraint locking inside backend ORM serializers to guarantee strict transactional integrity and eliminate booking overlap."
  },
  {
    id: 3,
    title: "AI Sign Language Recognition & Translation System",
    type: "backend",
    tags: ["Python", "OpenCV", "TensorFlow/MediaPipe", "FastAPI", "React.js"],
    githubLink: "https://github.com/divyanshbhadauriya1319411",
    demoLink: "https://github.com/divyanshbhadauriya1319411",
    status: "Completed",
    featured: true,
    description: "AI-powered real-time hand gesture recognition system converting sign language into text/speech using computer vision and deep learning models.",
    problemSolved: "Communication barriers between deaf/hard-of-hearing individuals and non-signers require high-accuracy, real-time translation tools without heavy processing lag.",
    keyFeatures: [
      "Real-time video stream hand landmark detection using MediaPipe & OpenCV",
      "Deep learning gesture classifier built with TensorFlow/Keras",
      "High-performance FastAPI inference endpoint with WebSocket video streaming",
      "Instantaneous conversion of sign gestures into natural text and speech output",
      "Interactive React.js client interface with live visual feedback"
    ],
    challengesSolved: "Achieving high frame-rate inference (30+ FPS) inside web browsers by decoupling computer vision processing via async FastAPI WebSockets."
  },
  {
    id: 4,
    title: "StoreSaga — Modern E-Commerce Ecosystem",
    type: "frontend",
    tags: ["React.js", "JavaScript", "Tailwind CSS", "REST APIs", "State Management"],
    githubLink: "https://github.com/divyanshbhadauriya1319411/StoreSaga",
    demoLink: "https://github.com/divyanshbhadauriya1319411/StoreSaga",
    status: "Completed",
    featured: true,
    description: "Feature-rich e-commerce platform offering instant debounced search, dynamic shopping cart calculation, and responsive product catalog.",
    problemSolved: "Decoupled frontend checkout carts often suffer from slow UI re-renders and unoptimized search queries during catalog exploration.",
    keyFeatures: [
      "Instant debounced search filtering across product categories and attributes",
      "Dynamic real-time shopping cart calculation with local storage synchronization",
      "Responsive product grid cards with quick-view modal triggers",
      "Clean RESTful API data hydration and optimized caching",
      "Modular state management hooks preventing redundant component re-renders"
    ],
    challengesSolved: "Synchronizing state updates across multiple browser tabs and optimizing debounced search queries to ensure sub-100ms UI response times."
  },
  {
    id: 5,
    title: "MNC-Grade Portfolio Architecture",
    type: "frontend",
    tags: ["React 19", "Tailwind CSS v4", "GSAP", "Framer Motion", "i18next"],
    githubLink: "https://github.com/divyanshbhadauriya1319411/divyanshbhadauriya1319411",
    demoLink: "https://github.com/divyanshbhadauriya1319411/divyanshbhadauriya1319411",
    status: "Completed",
    featured: false,
    description: "Senior software engineering showcase crafted with Vercel and Apple design system, Lenis smooth scrolling, and custom interactive cursor.",
    problemSolved: "Traditional developer portfolios often rely on generic Bootstrap/Tailwind templates with clunky animations and poor mobile touch ergonomics.",
    keyFeatures: [
      "Lenis exponential decay smooth momentum scrolling",
      "GSAP 3D perspective card tilts and dynamic mouse tracking spotlight",
      "Zero-latency bilingual internationalization (English & Hindi) using i18next",
      "Clean Apple, Linear, and Vercel aesthetic with custom dual-layer cursor"
    ],
    challengesSolved: "Ensuring fluid 60fps animations across both desktop monitors and mobile touch screens without memory leaks."
  }
];

