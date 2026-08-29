import { Navigation } from "../components/Navigation";
import { motion } from "motion/react";
import { Compass, Cpu, Smartphone, Lightbulb, Star, Rocket } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export function Vision() {
  const { personalInfo, visionPillars } = usePortfolio();

  const getPillarIcon = (iconName = "") => {
    switch (iconName.toLowerCase()) {
      case "cpu": return Cpu;
      case "smartphone": return Smartphone;
      case "lightbulb": return Lightbulb;
      case "compass": return Compass;
      case "rocket": return Rocket;
      case "star": return Star;
      default: return Cpu;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />

      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black pointer-events-none" />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <Compass className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300 tracking-wide">FUTURE LOOKOUT</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight uppercase leading-none">
              FUTURE VISION & PHILOSOPHY
            </h1>
            <blockquote className="text-2xl md:text-3xl font-bold mb-6 max-w-4xl mx-auto leading-relaxed tracking-wide bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent uppercase">
              "{personalInfo.philosophy || "THE FUTURE ISN'T SOMETHING WE ENTER. THE FUTURE IS SOMETHING WE CREATE."}"
            </blockquote>
            <p className="text-xl md:text-2xl text-purple-400 font-mono tracking-wider uppercase mb-8">
              {personalInfo.visionSubtitle || "My ultimate ambition is to become one of the greatest software engineers of our generation."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Pillars */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            {visionPillars.map((pillar, i) => {
              const Icon = getPillarIcon(pillar.iconName);
              const colorClass = pillar.color === 'orange' ? 'text-amber-400 bg-amber-500/10' :
                                 pillar.color === 'blue' ? 'text-blue-400 bg-blue-500/10' :
                                 pillar.color === 'pink' ? 'text-pink-400 bg-pink-500/10' :
                                 pillar.color === 'green' ? 'text-emerald-400 bg-emerald-500/10' :
                                 'text-purple-400 bg-purple-500/10';
              return (
                <motion.div
                  key={pillar.id || i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex flex-col md:flex-row gap-8 items-start group"
                >
                  <div className={`p-5 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-sm font-mono text-purple-400 font-bold uppercase tracking-wider">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-3xl font-bold mb-4 tracking-wide text-white mt-1 group-hover:text-gray-200">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg tracking-wide">
                      {pillar.desc}
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
