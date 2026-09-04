import { Navigation } from "../components/Navigation";
import { motion } from "motion/react";
import { Cpu, Smartphone, Database, Grid, Wrench, TrendingUp, Minus, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { usePortfolio, type Skill } from "../context/PortfolioContext";

export function SkillsUniverse() {
  const { skills } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState("All");

  const categoriesList = ["All", "Frontend", "Backend", "AI/ML", "DevOps", "Tools"];
  const categoryIcons: Record<string, any> = {
    Frontend: Smartphone,
    Backend: Database,
    "AI/ML": Cpu,
    DevOps: Grid,
    Tools: Wrench
  };
  const categoryGradients: Record<string, string> = {
    Frontend: "from-blue-500/20 to-blue-600/5",
    Backend: "from-purple-500/20 to-purple-600/5",
    "AI/ML": "from-pink-500/20 to-pink-600/5",
    DevOps: "from-green-500/20 to-green-600/5",
    Tools: "from-orange-500/20 to-amber-600/5"
  };
  const categoryBarColors: Record<string, string> = {
    Frontend: "bg-blue-500",
    Backend: "bg-purple-500",
    "AI/ML": "bg-pink-500",
    DevOps: "bg-green-500",
    Tools: "bg-amber-500"
  };
  const categoryTextColors: Record<string, string> = {
    Frontend: "text-blue-400",
    Backend: "text-purple-400",
    "AI/ML": "text-pink-400",
    DevOps: "text-green-400",
    Tools: "text-amber-400"
  };

  const filteredSkills = activeFilter === "All" 
    ? skills 
    : skills.filter(s => s.category === activeFilter);

  // Stats
  const totalSkills = skills.length;
  const avgLevel = skills.length > 0 ? Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length) : 0;
  const expertSkills = skills.filter(s => s.level >= 80).length;
  const growingSkills = skills.filter(s => s.trend === "up").length;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />

      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black pointer-events-none" />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 pt-32 pb-12">
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

      {/* Stats Bar */}
      <section className="relative px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Total Skills", value: totalSkills, color: "text-blue-400" },
              { label: "Average Level", value: `${avgLevel}%`, color: "text-purple-400" },
              { label: "Expert Skills", value: expertSkills, color: "text-green-400" },
              { label: "Growing Skills", value: growingSkills, color: "text-pink-400" },
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="relative px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {categoriesList.map((cat) => {
              const isActive = activeFilter === cat;
              const count = cat === "All" ? skills.length : skills.filter(s => s.category === cat).length;
              if (cat !== "All" && count === 0) return null;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${
                    isActive
                      ? "bg-white text-black border-white shadow-lg shadow-white/10"
                      : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat} <span className="ml-1 opacity-60">({count})</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="relative py-8 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, i) => {
              const barColor = categoryBarColors[skill.category] || "bg-blue-500";
              const textColor = categoryTextColors[skill.category] || "text-blue-400";
              const gradient = categoryGradients[skill.category] || "from-blue-500/20 to-blue-600/5";
              const Icon = categoryIcons[skill.category] || Grid;
              const isGrowing = skill.trend === "up";

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.08, duration: 0.6 }}
                  className={`group relative p-6 rounded-2xl bg-gradient-to-br ${gradient} border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5 backdrop-blur-sm overflow-hidden`}
                >
                  {/* Subtle glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-wide">{skill.name}</h3>
                        <p className={`text-xs uppercase tracking-widest mt-1 ${textColor}`}>{skill.category}</p>
                      </div>
                      <div className={`p-2 rounded-lg bg-white/5 ${textColor} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Proficiency Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Proficiency</span>
                        <span className="text-sm font-bold text-white">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: (i % 6) * 0.08 + 0.3, duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${barColor}`}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        Projects: <span className="font-semibold text-white">{skill.projects}</span>
                      </span>
                      <div className={`flex items-center gap-1 text-xs font-medium ${isGrowing ? "text-green-400" : "text-gray-500"}`}>
                        {isGrowing ? (
                          <>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            Growing
                          </>
                        ) : (
                          <>
                            <Minus className="w-3.5 h-3.5" />
                            Stable
                          </>
                        )}
                      </div>
                    </div>
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
