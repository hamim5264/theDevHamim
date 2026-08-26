import { Navigation } from "../components/Navigation";
import { motion } from "motion/react";
import { Award, ShieldAlert, Cpu, Rocket, BookOpen, Star, Trophy, Shield, Zap } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export function Achievements() {
  const { achievements } = usePortfolio();

  const getAchievementIcon = (iconName = "") => {
    switch (iconName.toLowerCase()) {
      case "rocket": return Rocket;
      case "star": return Star;
      case "book": return BookOpen;
      case "award": return Award;
      case "cpu": return Cpu;
      case "trophy": return Trophy;
      case "shield": return Shield;
      default: return Award;
    }
  };

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
              KEY ACHIEVEMENTS
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-wide max-w-3xl mx-auto">
              A comprehensive showcase of professional milestones, leadership milestones, and academic awards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((ach, i) => {
              const Icon = getAchievementIcon(ach.iconName);
              const color = ach.color || "blue";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold bg-white/5 px-3 py-1 rounded-full">
                        {ach.category}
                      </span>
                      <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color === 'orange' ? 'amber' : color}-400 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 tracking-wide text-white group-hover:text-gray-200">
                      {ach.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-base tracking-wide mb-6">
                      {ach.desc}
                    </p>
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
