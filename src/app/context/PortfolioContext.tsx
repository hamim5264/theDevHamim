import React, { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";

export interface Project {
  id: string | number;
  name: string;
  category: string;
  description: string;
  tech: string[];
  impact: string;
  status: string;
  image: string;
  users?: string;
  lastUpdated?: string;
  liveLink?: string;
  playstoreLink?: string;
  githubLink?: string;
}

export interface Skill {
  name: string;
  category: string;
  level: number;
  projects: number;
  trend: "up" | "stable";
}

export interface TimelineEvent {
  id: string | number;
  year: string;
  startYear?: string;
  startMonth?: string;
  startDay?: string;
  endYear?: string;
  endMonth?: string;
  endDay?: string;
  isPresent?: boolean;
  title: string;
  description: string;
  tech: string;
  type: "milestone" | "achievement" | "career" | "learning" | "work" | "family_business" | "edu" | "cert" | "hobby";
  subtitle?: string;
}

export interface SocialLink {
  id: string | number;
  name: string;
  url: string;
  handleOrValue: string;
  description: string;
  category: "main" | "social" | "other";
  iconName?: string; // e.g. 'youtube', 'github', 'linkedin', 'facebook', 'instagram', 'twitter', 'discord', 'globe', 'link'
  color?: string; // e.g. 'red', 'blue', 'green', 'purple', 'pink', 'amber', 'cyan'
}

export interface Achievement {
  id: string | number;
  title: string;
  category: string;
  desc: string;
  iconName: string; // 'rocket' | 'star' | 'book' | 'award' | 'cpu' | 'shield' | 'trophy'
  color: string; // 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'amber' | 'cyan'
}

export interface FamilyMember {
  id: string | number;
  relation: string; // 'Father', 'Mother', 'Elder Sister 1', 'Wife', 'Son', etc.
  name: string;
  occupation: string;
  details: string;
  mobile?: string;
  edu?: string;
  iconName?: string; // 'user' | 'heart' | 'briefcase' | 'graduation' | 'star'
}

export interface VisionPillar {
  id: string | number;
  title: string;
  subtitle: string;
  desc: string;
  iconName: string; // 'cpu' | 'smartphone' | 'lightbulb' | 'compass' | 'rocket' | 'star'
  color: string; // 'purple' | 'blue' | 'pink' | 'green' | 'orange'
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  philosophy: string;
  about: string;
  aboutBeginning?: string;
  aboutAwakening?: string;
  aboutStruggle?: string;
  aboutBreakthrough?: string;
  aboutMindset?: string;
  heroThoughts?: string;
  visibleTechBadges?: string[];
  email: string;
  emailSecondary?: string;
  emailDIU: string;
  phone: string;
  phoneSecondary?: string;
  whatsapp: string;
  telegram: string;
  location: string;
  bloodGroup?: string;
  dob?: string;
  nationality?: string;
  nid?: string;
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
  threads: string;
  discord: string;
  teams: string;
  businessInfo: string;
  profilePic: string;
  resumeUrl: string;
  geminiApiKey?: string;
  // Family Information
  fatherName: string;
  fatherOccupation: string;
  fatherMobile: string;
  motherName: string;
  motherOccupation: string;
  motherMobile: string;
  sister1Name: string;
  sister1Edu: string;
  sister2Name: string;
  sister2Edu: string;
}

interface PortfolioContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string | number, updatedProject: Partial<Project>) => void;
  deleteProject: (id: string | number) => void;
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  updateSkill: (name: string, updatedSkill: Partial<Skill>) => void;
  deleteSkill: (name: string) => void;
  timelineEvents: TimelineEvent[];
  addTimelineEvent: (event: TimelineEvent) => void;
  updateTimelineEvent: (id: string | number, updatedEvent: Partial<TimelineEvent>) => void;
  deleteTimelineEvent: (id: string | number) => void;
  customSocialLinks: SocialLink[];
  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (id: string | number, updatedLink: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string | number) => void;
  achievements: Achievement[];
  addAchievement: (achievement: Achievement) => void;
  updateAchievement: (id: string | number, updatedAchievement: Partial<Achievement>) => void;
  deleteAchievement: (id: string | number) => void;
  familyMembers: FamilyMember[];
  addFamilyMember: (member: FamilyMember) => void;
  updateFamilyMember: (id: string | number, updatedMember: Partial<FamilyMember>) => void;
  deleteFamilyMember: (id: string | number) => void;
  visionPillars: VisionPillar[];
  addVisionPillar: (pillar: VisionPillar) => void;
  updateVisionPillar: (id: string | number, updatedPillar: Partial<VisionPillar>) => void;
  deleteVisionPillar: (id: string | number) => void;
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  profileViews: number;
  loading: boolean;
  user: any;
  authLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const defaultProjects: Project[] = [
  {
    id: "qari",
    name: "QARI - Quran Learning & Recitation App",
    category: "AI-Powered Quran Learning",
    description: "A comprehensive Quran learning platform built with Flutter that combines traditional Islamic education with modern technology, featuring interactive Quranic text and multi-language support.",
    tech: ["Flutter", "Dart", "OpenAI", "Firebase", "Django", "FastAPI", "Speech Recognition"],
    impact: "Quran",
    status: "Live",
    image: "🕌",
    users: "Live",
    lastUpdated: "Today"
  },
  {
    id: "kick360",
    name: "Kick 360",
    category: "AI-Powered Sports Tracking",
    description: "An interactive soccer tracking and training app. Users can record kicking sessions, view detailed statistics, analyze leaderboards, and join tournaments.",
    tech: ["Flutter", "Dart", "Firebase", "Hive", "GetX", "Mapbox", "Stripe"],
    impact: "Sports",
    status: "Live",
    image: "⚽",
    users: "Live",
    lastUpdated: "Today"
  },
  {
    id: "ai-reservation",
    name: "AI Receptionist & Appointment System",
    category: "AI CRM & Booking Automation",
    description: "An intelligent, AI-powered receptionist system that transforms business websites into interactive chatbots capable of handling customer inquiries and managing appointments autonomously.",
    tech: ["Django 6.0", "PostgreSQL", "LangChain", "OpenAI GPT-4o-mini", "ChromaDB", "BeautifulSoup"],
    impact: "CRM",
    status: "Live",
    image: "📞",
    users: "Live",
    lastUpdated: "1 week ago"
  },
  {
    id: "khazna",
    name: "Khazna Counter & FCM Scaffold",
    category: "Cross-Platform Skeleton",
    description: "A Flutter application scaffold configured for cross-platform development with Firebase options for Android, iOS, Web, macOS, and Windows. Built-in push notifications.",
    tech: ["Flutter", "Dart", "Firebase Core", "Cloud Messaging (FCM)", "Local Notifications"],
    impact: "Finance",
    status: "Live",
    image: "💼",
    users: "Live",
    lastUpdated: "5 days ago"
  },
  {
    id: "epic-nz-travel",
    name: "Epic Nz Travel App",
    category: "AI Travel Companion",
    description: "A Flutter mobile application designed with modern app architecture, Mapbox maps, Stripe subscription management, onboarding flows, and Hive persistence.",
    tech: ["Flutter", "Dart", "GetX", "Mapbox Maps", "Stripe Payments", "Hive DB", "Firebase"],
    impact: "Travel",
    status: "Live",
    image: "✈️",
    users: "Live",
    lastUpdated: "1 week ago"
  },
  {
    id: "uzzamax",
    name: "Uzza Max Streaming App",
    category: "Live Streaming IPTV Platform",
    description: "A modern, high-performance IPTV live streaming application. Experience seamless streaming across multiple platforms with advanced features like multi-stream viewing.",
    tech: ["Flutter", "Dart", "GetX", "Dio", "Better Player Plus", "Skeletonizer", "Chrome Cast"],
    impact: "IPTV",
    status: "Live",
    image: "📺",
    users: "Live",
    lastUpdated: "Today"
  },
  {
    id: "hifun",
    name: "HiFun App and Web",
    category: "Admin Dashboard & Support System",
    description: "A modern admin dashboard and landing platform. Features public landing pages, authenticated admin dashboards, real-time chat support, dispute resolution workflows, and Recharts integration.",
    tech: ["Next.js 16", "React 19", "Tailwind CSS 4", "Firebase (Firestore/Auth/Storage)", "Recharts"],
    impact: "Support",
    status: "Live",
    image: "💬",
    users: "Live",
    lastUpdated: "Today"
  },
  {
    id: "quiz-crafter",
    name: "Qnect Quiz Crafter",
    category: "Role-Based EdTech Platform",
    description: "A role-based EdTech mobile app for students, teachers, and admins. Supports course management, live quiz countdown timers, and phone OTP verification.",
    tech: ["Flutter", "Dart", "Firebase Auth", "Firestore", "Google Sign-In", "Phone OTP"],
    impact: "EdTech",
    status: "Live",
    image: "🎓",
    users: "Live",
    lastUpdated: "3 days ago"
  },
  {
    id: "craftybay",
    name: "CraftyBay eCommerce",
    category: "Full eCommerce App",
    description: "A state-of-the-art Flutter eCommerce mobile app with end-to-end shopping cart management, product catalogs, order processing, and payment gateway integration.",
    tech: ["Flutter", "Dart", "REST APIs", "GetX", "Payment Gateway", "Shared Preferences"],
    impact: "eCommerce",
    status: "Live",
    image: "🛒",
    users: "Live",
    lastUpdated: "Today"
  },
  {
    id: "find-it",
    name: "Find It - Lost & Found",
    category: "Utility Social App",
    description: "A utility mobile application designed to connect people who lost items with those who found them. Features location tagging and real-time updates.",
    tech: ["Flutter", "Dart", "Firebase Auth", "Firestore", "Google Maps API"],
    impact: "Utility",
    status: "Live",
    image: "🔍",
    users: "Live",
    lastUpdated: "2 weeks ago"
  },
  {
    id: "devengine",
    name: "DevEngine Marketplace",
    category: "Professional Project Marketplace",
    description: "A specialized professional project marketplace platform where clients hire premium developers and automate business contracts.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express", "MongoDB", "REST APIs"],
    impact: "Marketplace",
    status: "Live",
    image: "💻",
    users: "Live",
    lastUpdated: "Yesterday"
  },
  {
    id: "anemia-detector",
    name: "Anemia Detector AI",
    category: "AI Healthcare Classification",
    description: "An advanced artificial intelligence project classifying blood dataset entries for anemia detection with 99%+ accuracy.",
    tech: ["Python", "Scikit-Learn", "Pandas", "Machine Learning Model", "Flask API"],
    impact: "Healthcare",
    status: "Live",
    image: "🩸",
    users: "Live",
    lastUpdated: "4 days ago"
  },
  {
    id: "nexttalent",
    name: "NextTalent Job Portal",
    category: "Job Portal Web Platform",
    description: "A next-generation job portal web application where job seekers apply for opportunities and employers manage applications.",
    tech: ["React.js", "Supabase", "PHP", "Tailwind CSS", "PostgreSQL"],
    impact: "Recruitment",
    status: "Live",
    image: "💼",
    users: "Live",
    lastUpdated: "Today"
  },
  {
    id: "quizwhiz",
    name: "QuizWhiz Desktop App",
    category: "Desktop Java Quiz",
    description: "A lightweight Java-based desktop quiz application with elegant question patterns and instantaneous grading metrics.",
    tech: ["Java", "Swing", "OOP Principles", "Local Persistence"],
    impact: "Quiz",
    status: "Live",
    image: "✍️",
    users: "Live",
    lastUpdated: "1 month ago"
  },
  {
    id: "lineage-ai",
    name: "Lineage.ai App",
    category: "Generative Memory App",
    description: "An Android and iOS app allowing users to preserve their voice, stories, and daily memories, so family members can converse with them using AI avatars in the future.",
    tech: ["Flutter", "Firebase", "Django", "OpenAI", "Avatar API", "Clean Architecture"],
    impact: "Memory",
    status: "Development",
    image: "🧠",
    users: "Under Development",
    lastUpdated: "Today"
  },
  {
    id: "kidport",
    name: "KidPort Baby Tracker",
    category: "Newborn Care Platform",
    description: "A comprehensive baby care tracker app for newborns aged 0-5. Features feeding tracking, sleep logging, and growth milestone charting.",
    tech: ["Flutter", "Firebase", "GetX", "State Management", "Local Notifications"],
    impact: "Newborn",
    status: "Development",
    image: "👶",
    users: "Under Development",
    lastUpdated: "Today"
  },
  {
    id: "vipyy",
    name: "VIPyy Luxury Booking",
    category: "Event & Ticket Booking",
    description: "A luxury club service booking application to book tables, drinks, club tickets, and long-distance transport bus tickets seamlessly.",
    tech: ["Flutter", "React.js", "REST APIs", "Firebase", "Payment Gateways"],
    impact: "Club",
    status: "Development",
    image: "🎟️",
    users: "Under Development",
    lastUpdated: "Today"
  },
  {
    id: "food-nutrition",
    name: "Food Nutrition Detector",
    category: "AI Nutrition & Health",
    description: "A custom health application matching image and nutrient data inputs with Django backend classifications for direct lifestyle recommendations.",
    tech: ["Flutter", "Django", "Custom CNN Model", "Python", "REST APIs"],
    impact: "Health",
    status: "Development",
    image: "🥗",
    users: "Under Development",
    lastUpdated: "Today"
  }
];

const defaultPersonalInfo: PersonalInfo = {
  firstName: "MD. ABDUL",
  lastName: "HAMIM LEON",
  fullName: "MD. ABDUL HAMIM LEON",
  title: "Software Developer | Flutter & AI Developer",
  philosophy: "THE FUTURE ISN'T SOMETHING WE ENTER. THE FUTURE IS SOMETHING WE CREATE.",
  about: "Passionate Software Engineer specializing in Flutter development, AI-powered applications, backend systems, and scalable full-stack solutions. Experienced in building production-ready mobile apps, SaaS platforms, and automation systems.",
  email: "hamim.leon@gmail.com",
  emailDIU: "hamim15-5264@diu.edu.bd",
  phone: "+880 1724-879284",
  whatsapp: "+8801724879284",
  telegram: "+8801724879284",
  location: "Banasree, Rampura, Dhaka-1219, Bangladesh",
  github: "https://github.com/hamim5264",
  linkedin: "https://www.linkedin.com/in/abdul-hamim-a35b02253/",
  facebook: "https://www.facebook.com/hamim.leon",
  instagram: "https://www.instagram.com/hamimleon/",
  twitter: "https://x.com/HamimLeon42320",
  threads: "https://www.threads.com/@hamimleon",
  discord: "hamim_27693",
  teams: "hamim.leon@gmail.com",
  businessInfo: "https://devengine-three.vercel.app/",
  profilePic: "/assets/hamim.png",
  resumeUrl: "",
  geminiApiKey: "",
  // Family Information
  fatherName: "MD. SALIM REZA",
  fatherOccupation: "Business Man (Electric Shop)",
  fatherMobile: "01716303414",
  motherName: "MST. AKTARA BEUM",
  motherOccupation: "Housewife",
  motherMobile: "01783176394",
  sister1Name: "Shahina Akter Liza",
  sister1Edu: "Master of Science (M.Sc.) in Entomology, Rajshahi College (First Class, 2013)",
  sister2Name: "Shirajom Monira Lima",
  sister2Edu: "Masters of Social Science, Rajshahi New Govt. Degree College (2019)"
};

const defaultSkills: Skill[] = [
  { name: "Flutter", category: "Frontend", level: 95, projects: 8, trend: "up" },
  { name: "Python", category: "Backend", level: 90, projects: 12, trend: "up" },
  { name: "AI/ML", category: "AI/ML", level: 85, projects: 10, trend: "up" },
  { name: "FastAPI", category: "Backend", level: 88, projects: 6, trend: "stable" },
  { name: "React", category: "Frontend", level: 82, projects: 5, trend: "up" },
  { name: "Firebase", category: "Backend", level: 90, projects: 7, trend: "stable" },
  { name: "PostgreSQL", category: "Backend", level: 80, projects: 6, trend: "up" },
  { name: "Docker", category: "DevOps", level: 75, projects: 8, trend: "up" },
  { name: "LangChain", category: "AI/ML", level: 85, projects: 4, trend: "up" },
  { name: "OpenAI", category: "AI/ML", level: 88, projects: 6, trend: "up" },
  { name: "TensorFlow", category: "AI/ML", level: 70, projects: 3, trend: "stable" },
  { name: "Git", category: "Tools", level: 92, projects: 12, trend: "stable" },
  { name: "AWS", category: "DevOps", level: 72, projects: 5, trend: "up" },
  { name: "UI/UX", category: "Frontend", level: 80, projects: 10, trend: "up" }
];

export function calculateDuration(event: TimelineEvent): string {
  const isPres = Boolean(event.isPresent || (event.year && event.year.toLowerCase().includes("present")));
  
  if (isPres) {
    return "Present";
  }

  const monthsMap: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };

  let startDate: Date | null = null;
  let endDate: Date | null = null;

  if (event.startYear && !isNaN(Number(event.startYear))) {
    const sYear = Number(event.startYear);
    const sMonth = event.startMonth ? (monthsMap[event.startMonth.toLowerCase().slice(0, 3)] ?? 0) : 0;
    const sDay = event.startDay && !isNaN(Number(event.startDay)) ? Number(event.startDay) : 1;
    startDate = new Date(sYear, sMonth, sDay);
  }

  if (event.endYear && !isNaN(Number(event.endYear))) {
    const eYear = Number(event.endYear);
    const eMonth = event.endMonth ? (monthsMap[event.endMonth.toLowerCase().slice(0, 3)] ?? 11) : 11;
    const eDay = event.endDay && !isNaN(Number(event.endDay)) ? Number(event.endDay) : 28;
    endDate = new Date(eYear, eMonth, eDay);
  }

  // Fallback if structured dates missing: parse numbers from string
  if (!startDate || !endDate) {
    const datesMatch = event.year?.match(/([a-zA-Z]+)?\s*(\d{1,2})?,?\s*(\d{4})/g);
    const yearsMatch = event.year?.match(/\d{4}/g);

    if (yearsMatch && yearsMatch.length >= 2) {
      startDate = startDate || new Date(Number(yearsMatch[0]), 0, 1);
      endDate = endDate || new Date(Number(yearsMatch[yearsMatch.length - 1]), 11, 31);
    }
  }

  if (startDate && endDate) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      if (diffDays > 365) {
        const years = (diffDays / 365).toFixed(1);
        return `${diffDays} days (${years} yrs)`;
      }
      return `${diffDays} days`;
    }
  }

  return "Completed";
}

export function sortTimelineEvents(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => {
    // Determine priority ranks:
    // 0: Present Work Experience ('work') -> FIRST
    // 1: Present Family Business ('family_business') -> SECOND
    // 2: Present Other Categories -> THIRD
    // 3: Non-Present events -> FOURTH (sorted by end date/year, start date/year)
    const getRank = (e: TimelineEvent): number => {
      // Check if marked isPresent OR string contains "present" (for legacy database entries)
      const isPres = Boolean(e.isPresent || (e.year && e.year.toLowerCase().includes("present")));
      if (!isPres) return 3;
      if (e.type === "work") return 0;
      if (e.type === "family_business") return 1;
      return 2;
    };

    const rankA = getRank(a);
    const rankB = getRank(b);

    if (rankA !== rankB) {
      return rankA - rankB; // Lower rank index comes first
    }

    // If both events share the same rank (e.g. both are non-present, or both are present work)
    const getEnd = (e: TimelineEvent): number => {
      if (e.endYear && !isNaN(Number(e.endYear))) return Number(e.endYear);
      const matches = e.year?.match(/\d{4}/g);
      if (matches && matches.length > 0) {
        return Math.max(...matches.map(Number));
      }
      return 0;
    };

    const getStart = (e: TimelineEvent): number => {
      if (e.startYear && !isNaN(Number(e.startYear))) return Number(e.startYear);
      const matches = e.year?.match(/\d{4}/g);
      if (matches && matches.length > 0) {
        return Number(matches[0]);
      }
      return 0;
    };

    const endA = getEnd(a);
    const endB = getEnd(b);
    if (endA !== endB) return endB - endA; // Higher end year first

    const startA = getStart(a);
    const startB = getStart(b);
    return startB - startA; // Higher start year first
  });
}

const defaultTimeline: TimelineEvent[] = [
  {
    id: 1,
    year: "Nov 20, 2025 - May 04, 2026",
    startYear: "2025",
    endYear: "2026",
    isPresent: false,
    title: "Junior Flutter Developer & Captain of Team Systemica Intelligence",
    subtitle: "Beup Tech Agency (A Concern of Betopia Group)",
    description: "Led and managed development workflows, coordinated modular architecture structures, and engineered scalable Flutter applications. Developed production-ready mobile features, embedded REST APIs, integrated payment gateways, push notifications, and AI features.",
    tech: "Flutter, Dart, Firebase, REST APIs, Clean Architecture, Stripe, Team Leadership",
    type: "work"
  },
  {
    id: 2,
    year: "2025 - Present",
    startYear: "2025",
    isPresent: true,
    title: "Entrepreneur & Technology Lead",
    subtitle: "Family Electronics Business",
    description: "Contributing to daily business operations, managing customer relationships, coordinating electronics distribution, and modernizing processes through technological improvements and digital sales management.",
    tech: "Operations, Business Analytics, Supply Management, IT Systems",
    type: "family_business"
  },
  {
    id: 3,
    year: "2021 - 2025",
    startYear: "2021",
    endYear: "2025",
    isPresent: false,
    title: "B.Sc. in Computer Science & Engineering",
    subtitle: "Daffodil International University (DIU)",
    description: "Acquired formal theoretical foundation in computer systems, algorithms, database designs, and machine intelligence. Graduated with a CGPA of 2.90 out of 4.00, completing projects across advanced software architecture.",
    tech: "Algorithms, Data Structures, DBMS, Software Engineering, AI Research",
    type: "edu"
  },
  {
    id: 4,
    year: "July 2023 - June 2024",
    startYear: "2023",
    endYear: "2024",
    isPresent: false,
    title: "App Development with Flutter (Trainee Pro Batch)",
    subtitle: "Ostad",
    description: "Completed an intensive 12-month professional training program focusing on production-grade Flutter applications. Graduated with an outstanding academic score of 96.5/100, focusing on Git/GitHub workflows, state management, and API architectures.",
    tech: "Flutter Pro, Dart, State Management, Bloc / Riverpod, Git Workflows, API Integration",
    type: "cert"
  },
  {
    id: 5,
    year: "2020",
    startYear: "2020",
    endYear: "2020",
    isPresent: false,
    title: "HSC (Science) - Higher Secondary School Certificate",
    subtitle: "Shahid Buddhijibi Govt. College, Rajshahi",
    description: "Successfully completed higher secondary education with a perfect academic grade of GPA 5.00 out of 5.00 (Golden), establishing highly advanced analytical capabilities.",
    tech: "Physics, Chemistry, Mathematics, Science",
    type: "edu"
  },
  {
    id: 6,
    year: "2018",
    startYear: "2018",
    endYear: "2018",
    isPresent: false,
    title: "SSC - Secondary School Certificate",
    subtitle: "Rajshahi Board",
    description: "Graduated secondary school education under the Rajshahi Board with a perfect score of GPA 5.00 out of 5.00.",
    tech: "Science, Mathematics, Analytical Skills",
    type: "edu"
  },
  {
    id: 7,
    year: "2020",
    startYear: "2020",
    endYear: "2020",
    isPresent: false,
    title: "The Programming Awakening",
    subtitle: "First Line of HTML Code",
    description: "Discovered the magic of software engineering in school. Wrote my first page using HTML, CSS, and basic scripting, establishing an unbreakable passion for digital creation. This was my hobby, i was so exited for learning, creating programming.",
    tech: "HTML5, CSS3, Logic & Scripts",
    type: "hobby"
  }
];

const defaultSocialLinks: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/hamim5264",
    handleOrValue: "github.com/hamim5264",
    description: "Check out my open source contributions",
    category: "main",
    iconName: "github"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abdul-hamim-a35b02253/",
    handleOrValue: "Connect professionally",
    description: "linkedin.com/in/abdul-hamim-a35b02253",
    category: "main",
    iconName: "linkedin"
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    url: "https://wa.me/8801724879284",
    handleOrValue: "+8801724879284",
    description: "Quick messaging for urgent matters",
    category: "main",
    iconName: "whatsapp"
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/hamim.leon",
    handleOrValue: "hamim.leon",
    description: "Connect on Facebook",
    category: "social",
    iconName: "facebook"
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/hamimleon/",
    handleOrValue: "@hamimleon",
    description: "Follow on Instagram",
    category: "social",
    iconName: "instagram"
  },
  {
    id: "twitter",
    name: "Twitter / X",
    url: "https://x.com/HamimLeon42320",
    handleOrValue: "@HamimLeon42320",
    description: "Follow on Twitter / X",
    category: "social",
    iconName: "twitter"
  },
  {
    id: "threads",
    name: "Threads",
    url: "https://www.threads.net/@hamimleon",
    handleOrValue: "@hamimleon",
    description: "Follow on Threads",
    category: "social",
    iconName: "threads"
  },
  {
    id: "discord",
    name: "Discord",
    url: "https://discord.com",
    handleOrValue: "hamim_27693",
    description: "Connect on Discord",
    category: "other",
    iconName: "discord"
  }
];

const defaultAchievements: Achievement[] = [
  {
    id: 1,
    title: "PRODUCTION APPLICATION DEPLOYMENT",
    category: "Mobile & Web Software",
    desc: "Built, optimized, and successfully deployed production-ready applications across multiple sectors including AI, EdTech (Qari 24/7), SaaS, automation (CRM Calling), and eCommerce (Kick360).",
    iconName: "rocket",
    color: "blue"
  },
  {
    id: 2,
    title: "TEAM LEADERSHIP & CAPTAINCY",
    category: "Team Systemica Intelligence",
    desc: "Led complex software development operations as the Team Captain of Systemica Intelligence at Beup Tech Agency, coordinating agile workflows, modular clean architectures, and strict code review structures.",
    iconName: "star",
    color: "purple"
  },
  {
    id: 3,
    title: "ACADEMIC EXCELLENCE (PERFECT GPA)",
    category: "Rajshahi Board Excellence",
    desc: "Secured perfect academic credentials with a perfect score of GPA 5.00 out of 5.00 (Golden) in both SSC and HSC (Science) studies under the Rajshahi Board.",
    iconName: "book",
    color: "green"
  },
  {
    id: 4,
    title: "PROFESSIONAL FLUTTER CERTIFICATION",
    category: "Ostad Training Academy",
    desc: "Completed 12-month professional mobile engineering training, graduating in the Pro Batch with a spectacular final evaluation score of 96.5 out of 100.",
    iconName: "award",
    color: "orange"
  },
  {
    id: 5,
    title: "AI & AUTOMATION INTEGRATION",
    category: "Advanced Technology",
    desc: "Successfully integrated advanced Large Language Model (LLM) agents, vector databases (ChromaDB), calling automations, and AI personalized tutors into functional commercial SaaS products.",
    iconName: "cpu",
    color: "pink"
  }
];

const defaultFamilyMembers: FamilyMember[] = [
  {
    id: 1,
    relation: "Father",
    name: "MD. SALIM REZA",
    occupation: "Business Man (Electric Shop)",
    details: "An inspiring business leader who runs our family electronics store. Teaches me daily operational discipline, work ethics, and the engineering behind electronic logic systems.",
    mobile: "01716303414",
    iconName: "briefcase"
  },
  {
    id: 2,
    relation: "Mother",
    name: "MST. AKTARA BEUM",
    occupation: "Housewife",
    details: "The emotional foundation and heart of our family. Supports all my creative software endeavors and teaches me resilience, empathy, and patience.",
    mobile: "01783176394",
    iconName: "heart"
  },
  {
    id: 3,
    relation: "Elder Sister 1",
    name: "Shahina Akter Liza",
    occupation: "Master of Science (M.Sc.) – Entomology",
    details: "Rajshahi College, National University (Passing Year: 2013 | First Class). Instilled in me early scientific curiosity, database organization, and strict research practices.",
    edu: "Master of Science (M.Sc.) in Entomology, Rajshahi College (First Class, 2013)",
    iconName: "graduation"
  },
  {
    id: 4,
    relation: "Elder Sister 2",
    name: "Shirajom Monira Lima",
    occupation: "Masters of Social Science",
    details: "Rajshahi New Govt. Degree College, Rajshahi (Passing Year: 2019). Guided my social skills, project management, and public communication strategy.",
    edu: "Masters of Social Science, Rajshahi New Govt. Degree College (2019)",
    iconName: "graduation"
  }
];

const defaultVisionPillars: VisionPillar[] = [
  {
    id: 1,
    title: "INTELLIGENT AI AGENTS",
    subtitle: "Autonomous Operations",
    desc: "Architecting autonomous AI agent networks (using tools like LangChain, ChromaDB, FastAPI, and OpenAI) that transition static CRM and customer support structures into responsive conversational networks.",
    iconName: "cpu",
    color: "purple"
  },
  {
    id: 2,
    title: "CLEAN MOBILE ECOSYSTEMS",
    subtitle: "Scalable Flutter Systems",
    desc: "Pioneering highly modular state management frameworks (Riverpod, Bloc) and clean architecture strategies inside cross-platform Flutter platforms to secure high-performance, live application deployments.",
    iconName: "smartphone",
    color: "blue"
  },
  {
    id: 3,
    title: "HUMANITARIAN TECHNOLOGY",
    subtitle: "Purpose-Driven Design",
    desc: "Remaining anchored to the engineering belief that 'Technology should serve humanity, not the other way around.' Building high-impact structures like Qari 24/7 and Khazna to simplify learning and tracking.",
    iconName: "lightbulb",
    color: "pink"
  }
];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultPersonalInfo);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [customSocialLinks, setCustomSocialLinks] = useState<SocialLink[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [visionPillars, setVisionPillars] = useState<VisionPillar[]>([]);
  const [profileViews, setProfileViews] = useState(0);
  const [loading, setLoading] = useState(true);

  // Authentication States
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Check local storage fallback first
    const fallback = localStorage.getItem("fallback_session");
    if (fallback === "true") {
      setUser({ email: "hamim.leon@gmail.com", displayName: "MD. Abdul Hamim", uid: "fallback-admin" });
      setAuthLoading(false);
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else if (localStorage.getItem("fallback_session") !== "true") {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      console.warn("Firebase Auth signIn failed, trying custom fallback...", err);
      
      // Fallback only triggers if the user doesn't exist in Firebase Auth yet (user-not-found)
      // Once you create your user in the Firebase Console, this local bypass is deactivated for total security!
      const isUserMissing = err.code === "auth/user-not-found" || err.message?.includes("user-not-found");

      if (isUserMissing && email === "hamim.leon@gmail.com" && pass === "123456") {
        setUser({ email, displayName: "MD. Abdul Hamim", uid: "fallback-admin" });
        localStorage.setItem("fallback_session", "true");
        return;
      }
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Firebase signOut failed:", err);
    }
    setUser(null);
    localStorage.removeItem("fallback_session");
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const docRef = doc(db, "portfolio", "data");

    // Live Snapshot Listener
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        let dbProjects = data.projects || [];
        
        setProjects(dbProjects);
        if (data.personalInfo) {
          setPersonalInfo(prev => ({
            ...defaultPersonalInfo,
            ...prev,
            ...data.personalInfo
          }));
        }
        if (data.profileViews !== undefined) setProfileViews(data.profileViews);
        if (data.skills) setSkills(data.skills);
        else setSkills(defaultSkills);
        if (data.timelineEvents) setTimelineEvents(sortTimelineEvents(data.timelineEvents));
        else setTimelineEvents(sortTimelineEvents(defaultTimeline));
        if (data.customSocialLinks) setCustomSocialLinks(data.customSocialLinks);
        else setCustomSocialLinks(defaultSocialLinks);
        if (data.achievements) setAchievements(data.achievements);
        else setAchievements(defaultAchievements);
        if (data.familyMembers) setFamilyMembers(data.familyMembers);
        else setFamilyMembers(defaultFamilyMembers);
        if (data.visionPillars) setVisionPillars(data.visionPillars);
        else setVisionPillars(defaultVisionPillars);
        setLoading(false);
      } else {
        // If doc doesn't exist, create it with defaults
        await setDoc(docRef, {
          projects: defaultProjects,
          personalInfo: defaultPersonalInfo,
          profileViews: 1,
          skills: defaultSkills,
          timelineEvents: defaultTimeline,
          customSocialLinks: defaultSocialLinks,
          achievements: defaultAchievements,
          familyMembers: defaultFamilyMembers,
          visionPillars: defaultVisionPillars
        });
        setProjects(defaultProjects);
        setPersonalInfo(defaultPersonalInfo);
        setProfileViews(1);
        setSkills(defaultSkills);
        setTimelineEvents(sortTimelineEvents(defaultTimeline));
        setCustomSocialLinks(defaultSocialLinks);
        setAchievements(defaultAchievements);
        setFamilyMembers(defaultFamilyMembers);
        setVisionPillars(defaultVisionPillars);
        setLoading(false);
      }
    }, (error) => {
      console.error("Firestore loading error, falling back to localStorage", error);
      // Fallback to local storage
      const savedProjects = localStorage.getItem("portfolio_projects");
      if (savedProjects) setProjects(JSON.parse(savedProjects));
      else setProjects(defaultProjects);

      const savedInfo = localStorage.getItem("portfolio_personal_info");
      if (savedInfo) setPersonalInfo(JSON.parse(savedInfo));
      else setPersonalInfo(defaultPersonalInfo);

      const savedSkills = localStorage.getItem("portfolio_skills");
      if (savedSkills) setSkills(JSON.parse(savedSkills));
      else setSkills(defaultSkills);

      const savedTimeline = localStorage.getItem("portfolio_timeline");
      if (savedTimeline) setTimelineEvents(sortTimelineEvents(JSON.parse(savedTimeline)));
      else setTimelineEvents(sortTimelineEvents(defaultTimeline));

      const savedSocial = localStorage.getItem("portfolio_social_links");
      if (savedSocial) setCustomSocialLinks(JSON.parse(savedSocial));
      else setCustomSocialLinks(defaultSocialLinks);

      const savedAch = localStorage.getItem("portfolio_achievements");
      if (savedAch) setAchievements(JSON.parse(savedAch));
      else setAchievements(defaultAchievements);

      const savedFam = localStorage.getItem("portfolio_family_members");
      if (savedFam) setFamilyMembers(JSON.parse(savedFam));
      else setFamilyMembers(defaultFamilyMembers);

      const savedVis = localStorage.getItem("portfolio_vision_pillars");
      if (savedVis) setVisionPillars(JSON.parse(savedVis));
      else setVisionPillars(defaultVisionPillars);

      const savedViews = localStorage.getItem("portfolio_views");
      const currentViews = savedViews ? parseInt(savedViews, 10) + 1 : 1;
      setProfileViews(currentViews);
      localStorage.setItem("portfolio_views", currentViews.toString());
      setLoading(false);
    });

    // Increment profile views on mount (only once per session/mount)
    const incrementViews = async () => {
      try {
        await updateDoc(docRef, {
          profileViews: increment(1)
        });
      } catch (err) {
        console.warn("Failed to increment views in Firestore", err);
      }
    };
    incrementViews();

    return () => unsubscribe();
  }, []);

  const addProject = async (project: Project) => {
    const updated = [project, ...projects];
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
    try {
      await setDoc(doc(db, "portfolio", "data"), { projects: updated }, { merge: true });
    } catch (err) {
      console.error(err);
    }
  };

  const updateProject = async (id: string | number, updatedProject: Partial<Project>) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updatedProject } : p);
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
    try {
      await setDoc(doc(db, "portfolio", "data"), { projects: updated }, { merge: true });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async (id: string | number) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
    try {
      await setDoc(doc(db, "portfolio", "data"), { projects: updated }, { merge: true });
    } catch (err) {
      console.error(err);
    }
  };

  const addSkill = async (skill: Skill) => {
    const updated = [...skills, skill];
    setSkills(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { skills: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_skills", JSON.stringify(updated));
    }
  };

  const updateSkill = async (name: string, updatedSkill: Partial<Skill>) => {
    const updated = skills.map(s => s.name === name ? { ...s, ...updatedSkill } : s);
    setSkills(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { skills: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_skills", JSON.stringify(updated));
    }
  };

  const deleteSkill = async (name: string) => {
    const updated = skills.filter(s => s.name !== name);
    setSkills(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { skills: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_skills", JSON.stringify(updated));
    }
  };

  const addTimelineEvent = async (event: TimelineEvent) => {
    const updated = sortTimelineEvents([event, ...timelineEvents]);
    setTimelineEvents(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { timelineEvents: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_timeline", JSON.stringify(updated));
    }
  };

  const updateTimelineEvent = async (id: string | number, updatedEvent: Partial<TimelineEvent>) => {
    const updated = sortTimelineEvents(timelineEvents.map(e => e.id === id ? { ...e, ...updatedEvent } : e));
    setTimelineEvents(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { timelineEvents: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_timeline", JSON.stringify(updated));
    }
  };

  const deleteTimelineEvent = async (id: string | number) => {
    const updated = sortTimelineEvents(timelineEvents.filter(e => e.id !== id));
    setTimelineEvents(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { timelineEvents: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_timeline", JSON.stringify(updated));
    }
  };

  const addSocialLink = async (link: SocialLink) => {
    const updated = [...customSocialLinks, link];
    setCustomSocialLinks(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { customSocialLinks: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_social_links", JSON.stringify(updated));
    }
  };

  const updateSocialLink = async (id: string | number, updatedLink: Partial<SocialLink>) => {
    const updated = customSocialLinks.map(l => l.id === id ? { ...l, ...updatedLink } : l);
    setCustomSocialLinks(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { customSocialLinks: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_social_links", JSON.stringify(updated));
    }
  };

  const deleteSocialLink = async (id: string | number) => {
    const updated = customSocialLinks.filter(l => l.id !== id);
    setCustomSocialLinks(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { customSocialLinks: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_social_links", JSON.stringify(updated));
    }
  };

  const addAchievement = async (ach: Achievement) => {
    const updated = [ach, ...achievements];
    setAchievements(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { achievements: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_achievements", JSON.stringify(updated));
    }
  };

  const updateAchievement = async (id: string | number, updatedAch: Partial<Achievement>) => {
    const updated = achievements.map(a => a.id === id ? { ...a, ...updatedAch } : a);
    setAchievements(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { achievements: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_achievements", JSON.stringify(updated));
    }
  };

  const deleteAchievement = async (id: string | number) => {
    const updated = achievements.filter(a => a.id !== id);
    setAchievements(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { achievements: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_achievements", JSON.stringify(updated));
    }
  };

  const addFamilyMember = async (member: FamilyMember) => {
    const updated = [...familyMembers, member];
    setFamilyMembers(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { familyMembers: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_family_members", JSON.stringify(updated));
    }
  };

  const updateFamilyMember = async (id: string | number, updatedMember: Partial<FamilyMember>) => {
    const updated = familyMembers.map(m => m.id === id ? { ...m, ...updatedMember } : m);
    setFamilyMembers(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { familyMembers: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_family_members", JSON.stringify(updated));
    }
  };

  const deleteFamilyMember = async (id: string | number) => {
    const updated = familyMembers.filter(m => m.id !== id);
    setFamilyMembers(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { familyMembers: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_family_members", JSON.stringify(updated));
    }
  };

  const addVisionPillar = async (pillar: VisionPillar) => {
    const updated = [...visionPillars, pillar];
    setVisionPillars(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { visionPillars: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_vision_pillars", JSON.stringify(updated));
    }
  };

  const updateVisionPillar = async (id: string | number, updatedPillar: Partial<VisionPillar>) => {
    const updated = visionPillars.map(p => p.id === id ? { ...p, ...updatedPillar } : p);
    setVisionPillars(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { visionPillars: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_vision_pillars", JSON.stringify(updated));
    }
  };

  const deleteVisionPillar = async (id: string | number) => {
    const updated = visionPillars.filter(p => p.id !== id);
    setVisionPillars(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { visionPillars: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_vision_pillars", JSON.stringify(updated));
    }
  };

  const updatePersonalInfo = async (info: Partial<PersonalInfo>) => {
    const updated = { ...personalInfo, ...info };
    setPersonalInfo(updated);
    localStorage.setItem("portfolio_personal_info", JSON.stringify(updated));
    try {
      await setDoc(doc(db, "portfolio", "data"), { personalInfo: updated }, { merge: true });
    } catch (err) {
      console.error("Firestore update error, saved to localStorage fallback:", err);
    }
  };

  return (
    <PortfolioContext.Provider value={{ 
      projects, addProject, updateProject, deleteProject,
      skills, addSkill, updateSkill, deleteSkill,
      timelineEvents, addTimelineEvent, updateTimelineEvent, deleteTimelineEvent,
      customSocialLinks, addSocialLink, updateSocialLink, deleteSocialLink,
      achievements, addAchievement, updateAchievement, deleteAchievement,
      familyMembers, addFamilyMember, updateFamilyMember, deleteFamilyMember,
      visionPillars, addVisionPillar, updateVisionPillar, deleteVisionPillar,
      personalInfo, updatePersonalInfo,
      profileViews, loading,
      user, authLoading, login, logout, resetPassword
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
