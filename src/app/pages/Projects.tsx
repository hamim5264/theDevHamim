import { Navigation } from "../components/Navigation";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export function Projects() {
  const { projects } = usePortfolio();


  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />

      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black pointer-events-none" />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-8xl font-bold mb-8 tracking-tight">
              PRODUCTION PROJECTS
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 leading-relaxed tracking-wide">
              Real systems serving real users — from concept to production
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <Link to={`/projects/${project.id}`}>
                  <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-105 cursor-pointer h-full">
                    {/* Project Icon */}
                    <div className="text-7xl mb-6">{project.image}</div>

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 mb-2 tracking-wide uppercase">{project.category}</p>
                        <h3 className="text-3xl font-bold tracking-wide mb-2">{project.name}</h3>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full tracking-wide ${
                        project.status === 'Live'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : project.status === 'Beta'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      }`}>
                        {project.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed tracking-wide">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map(tech => (
                        <span key={tech} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 tracking-wide">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Impact */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                      <div className="text-sm font-mono font-bold tracking-widest text-purple-400 uppercase">
                        {project.impact}
                      </div>
                      <div className="flex gap-2">
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-32 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "8+", label: "PRODUCTION PROJECTS" },
              { value: "75K+", label: "TOTAL USERS SERVED" },
              { value: "99.9%", label: "UPTIME AVERAGE" },
              { value: "12+", label: "TECHNOLOGIES MASTERED" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-5xl font-bold mb-3 tracking-tight">{stat.value}</div>
                <div className="text-sm text-gray-400 tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-8 tracking-tight">WANT TO COLLABORATE?</h2>
            <p className="text-xl text-gray-400 mb-12 tracking-wide">
              Let's build something amazing together
            </p>
            <Link to="/contact">
              <button className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 font-semibold tracking-wide flex items-center gap-2 mx-auto">
                GET IN TOUCH
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
