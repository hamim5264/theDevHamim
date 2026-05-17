import { Navigation } from "../components/Navigation";
import { motion } from "motion/react";
import { Cpu, Smartphone, Database, Grid, Layout, Wrench } from "lucide-react";

import { usePortfolio } from "../context/PortfolioContext";

export function SkillsUniverse() {
  const { skills } = usePortfolio();

  const categoriesList = ["Frontend", "Backend", "AI/ML", "DevOps", "Tools"];
  const categoryIcons: Record<string, any> = {
    Frontend: Smartphone,
    Backend: Database,
    "AI/ML": Cpu,
    DevOps: Grid,
    Tools: Wrench
  };
  const categoryColors: Record<string, string> = {
    Frontend: "blue",
    Backend: "purple",
    "AI/ML": "pink",
    DevOps: "green",
    Tools: "orange"
  };

  const skillCategories = categoriesList.map(catName => ({
    title: catName === "AI/ML" ? "AI & INTELLIGENT SYSTEMS" : catName === "Frontend" ? "MOBILE & FRONTEND DEVELOPMENT" : catName === "Backend" ? "BACKEND & DATABASES" : catName === "DevOps" ? "ARCHITECTURE & DEPLOYMENT" : "TOOLS & SYSTEMS",
    icon: categoryIcons[catName] || Grid,
    color: categoryColors[catName] || "blue",
    skills: skills.filter(s => s.category === catName).map(s => s.name)
  })).filter(c => c.skills.length > 0);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />

      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black pointer-events-none" />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight uppercase">
              SKILLS UNIVERSE
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-wide max-w-3xl mx-auto">
              My engineering stack: specialized categorizations from mobile systems and intelligent backend networks to AI integrations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group"
                >
                  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                    <h3 className="text-lg font-bold tracking-wider text-white">
                      {cat.title}
                    </h3>
                    <div className={`p-2.5 rounded-lg bg-${cat.color}-500/10 text-${cat.color === 'orange' ? 'amber' : cat.color}-400 group-hover:scale-115 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-2 rounded-full bg-white/5 border border-white/5 text-sm tracking-wide text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
