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
  title: string;
  description: string;
  tech: string;
  type: "milestone" | "achievement" | "career" | "learning" | "work" | "edu" | "cert" | "hobby";
  subtitle?: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  philosophy: string;
  about: string;
  email: string;
  emailDIU: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  location: string;
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

const defaultTimeline: TimelineEvent[] = [
  {
    id: 1,
    year: "Nov 20, 2025 - May 04, 2026",
    title: "Junior Flutter Developer & Captain of Team Systemica Intelligence",
    subtitle: "Beup Tech Agency (A Concern of Betopia Group)",
    description: "Led and managed development workflows, coordinated modular architecture structures, and engineered scalable Flutter applications. Developed production-ready mobile features, embedded REST APIs, integrated payment gateways, push notifications, and AI features.",
    tech: "Flutter, Dart, Firebase, REST APIs, Clean Architecture, Stripe, Team Leadership",
    type: "work"
  },
  {
    id: 2,
    year: "2025 - Present",
    title: "Entrepreneur & Technology Lead",
    subtitle: "Family Electronics Business",
    description: "Contributing to daily business operations, managing customer relationships, coordinating electronics distribution, and modernizing processes through technological improvements and digital sales management.",
    tech: "Operations, Business Analytics, Supply Management, IT Systems",
    type: "work"
  },
  {
    id: 3,
    year: "2021 - 2025",
    title: "B.Sc. in Computer Science & Engineering",
    subtitle: "Daffodil International University (DIU)",
    description: "Acquired formal theoretical foundation in computer systems, algorithms, database designs, and machine intelligence. Graduated with a CGPA of 2.90 out of 4.00, completing projects across advanced software architecture.",
    tech: "Algorithms, Data Structures, DBMS, Software Engineering, AI Research",
    type: "edu"
  },
  {
    id: 4,
    year: "July 2023 - June 2024",
    title: "App Development with Flutter (Trainee Pro Batch)",
    subtitle: "Ostad",
    description: "Completed an intensive 12-month professional training program focusing on production-grade Flutter applications. Graduated with an outstanding academic score of 96.5/100, focusing on Git/GitHub workflows, state management, and API architectures.",
    tech: "Flutter Pro, Dart, State Management, Bloc / Riverpod, Git Workflows, API Integration",
    type: "cert"
  },
  {
    id: 5,
    year: "2020",
    title: "HSC (Science) - Higher Secondary School Certificate",
    subtitle: "Shahid Buddhijibi Govt. College, Rajshahi",
    description: "Successfully completed higher secondary education with a perfect academic grade of GPA 5.00 out of 5.00 (Golden), establishing highly advanced analytical capabilities.",
    tech: "Physics, Chemistry, Mathematics, Science",
    type: "edu"
  },
  {
    id: 6,
    year: "2018",
    title: "SSC - Secondary School Certificate",
    subtitle: "Rajshahi Board",
    description: "Graduated secondary school education under the Rajshahi Board with a perfect score of GPA 5.00 out of 5.00.",
    tech: "Science, Mathematics, Analytical Skills",
    type: "edu"
  },
  {
    id: 7,
    year: "2020",
    title: "The Programming Awakening",
    subtitle: "First Line of HTML Code",
    description: "Discovered the magic of software engineering in school. Wrote my first page using HTML, CSS, and basic scripting, establishing an unbreakable passion for digital creation. This was my hobby, i was so exited for learning, creating programming.",
    tech: "HTML5, CSS3, Logic & Scripts",
    type: "hobby"
  }
];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultPersonalInfo);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
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
        if (data.personalInfo) setPersonalInfo(data.personalInfo);
        if (data.profileViews !== undefined) setProfileViews(data.profileViews);
        if (data.skills) setSkills(data.skills);
        else setSkills(defaultSkills);
        if (data.timelineEvents) setTimelineEvents(data.timelineEvents);
        else setTimelineEvents(defaultTimeline);
        setLoading(false);
      } else {
        // If doc doesn't exist, create it with defaults
        await setDoc(docRef, {
          projects: defaultProjects,
          personalInfo: defaultPersonalInfo,
          profileViews: 1,
          skills: defaultSkills,
          timelineEvents: defaultTimeline
        });
        setProjects(defaultProjects);
        setPersonalInfo(defaultPersonalInfo);
        setProfileViews(1);
        setSkills(defaultSkills);
        setTimelineEvents(defaultTimeline);
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
      if (savedTimeline) setTimelineEvents(JSON.parse(savedTimeline));
      else setTimelineEvents(defaultTimeline);

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
    try {
      await setDoc(doc(db, "portfolio", "data"), { projects: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_projects", JSON.stringify(updated));
    }
  };

  const updateProject = async (id: string | number, updatedProject: Partial<Project>) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updatedProject } : p);
    setProjects(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { projects: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_projects", JSON.stringify(updated));
    }
  };

  const deleteProject = async (id: string | number) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { projects: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_projects", JSON.stringify(updated));
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
    const updated = [...timelineEvents, event];
    setTimelineEvents(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { timelineEvents: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_timeline", JSON.stringify(updated));
    }
  };

  const updateTimelineEvent = async (id: string | number, updatedEvent: Partial<TimelineEvent>) => {
    const updated = timelineEvents.map(e => e.id === id ? { ...e, ...updatedEvent } : e);
    setTimelineEvents(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { timelineEvents: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_timeline", JSON.stringify(updated));
    }
  };

  const deleteTimelineEvent = async (id: string | number) => {
    const updated = timelineEvents.filter(e => e.id !== id);
    setTimelineEvents(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { timelineEvents: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_timeline", JSON.stringify(updated));
    }
  };

  const updatePersonalInfo = async (info: Partial<PersonalInfo>) => {
    const updated = { ...personalInfo, ...info };
    setPersonalInfo(updated);
    try {
      await setDoc(doc(db, "portfolio", "data"), { personalInfo: updated }, { merge: true });
    } catch (err) {
      console.error(err);
      localStorage.setItem("portfolio_personal_info", JSON.stringify(updated));
      throw err;
    }
  };

  return (
    <PortfolioContext.Provider value={{ 
      projects, addProject, updateProject, deleteProject,
      skills, addSkill, updateSkill, deleteSkill,
      timelineEvents, addTimelineEvent, updateTimelineEvent, deleteTimelineEvent,
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
