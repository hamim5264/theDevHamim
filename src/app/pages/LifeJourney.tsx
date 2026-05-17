import { Navigation } from "../components/Navigation";
import { motion } from "motion/react";
import { Briefcase, GraduationCap, Award, BookOpen, Star, Zap } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export function LifeJourney() {
  const { personalInfo, timelineEvents } = usePortfolio();

  const getEventIcon = (type: string) => {
    switch (type) {
      case "work": return Briefcase;
      case "edu": return GraduationCap;
      case "cert": return Award;
      case "hobby": return BookOpen;
      default: return Briefcase;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "work": return "blue";
      case "edu": return "green";
      case "cert": return "orange";
      case "hobby": return "pink";
      default: return "blue";
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
              PROFESSIONAL JOURNEY
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-wide max-w-3xl mx-auto">
              A comprehensive timeline of my jobs, academic milestones, specialized certifications, and hands-on engineering experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {timelineEvents.map((event, i) => {
            const Icon = getEventIcon(event.type);
            const color = getEventColor(event.type);
            const techArray = typeof event.tech === "string" ? event.tech.split(",").map(t => t.trim()) : event.tech || [];

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="relative pl-12 pb-16 border-l-2 border-white/10 last:pb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-0 w-8 h-8 -translate-x-[17px] rounded-full bg-black border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Icon className={`w-4 h-4 text-${color === "orange" ? "amber" : color}-400`} />
                </div>

                {/* Event Card */}
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className="text-xl font-mono text-gray-400 font-bold tracking-wider">{event.year}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/5 border border-white/10 text-gray-300">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-wide text-white group-hover:text-gray-200 transition-colors">
                    {event.title}
                  </h3>
                  {event.subtitle && (
                    <h4 className="text-lg md:text-xl font-medium mb-4 text-gray-400">
                      {event.subtitle}
                    </h4>
                  )}
                  <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed tracking-wide">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techArray.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm tracking-wide text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">THE JOURNEY CONTINUES</h2>
            <p className="text-xl text-gray-400 mb-12 tracking-wide">
              Every milestone is just the beginning of the next engineering adventure.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/projects">
                <button className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 font-semibold tracking-wide">
                  VIEW PROJECTS
                </button>
              </a>
              <a href="/vision">
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm font-semibold tracking-wide">
                  FUTURE VISION
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
