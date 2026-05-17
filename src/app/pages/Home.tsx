import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Sparkles, Rocket, Brain, Target, Star, Download } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { usePortfolio } from "../context/PortfolioContext";
import resumePdf from "../../../assets/Resume of Hamim_Flutter & AI Developer.pdf";


export function Home() {
  const { personalInfo } = usePortfolio();
  const resumeLink = personalInfo.resumeUrl || resumePdf;
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />

      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0yLTJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0tMiAydjJoMnYtMmgtMnptMC0ydjJoMnYtMmgtMnptMC0ydjJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm text-gray-300 tracking-wide">{personalInfo.title}</span>
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold tracking-tight leading-none mb-4"
              >
                {personalInfo.firstName}
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold tracking-tight leading-none bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent"
              >
                {personalInfo.lastName}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl text-gray-400 leading-relaxed max-w-xl tracking-wide"
            >
              {personalInfo.about}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link to="/journey">
                <button className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 flex items-center gap-2 font-semibold tracking-wide">
                  EXPLORE JOURNEY
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <a href={resumeLink} download="Resume_of_Hamim.pdf">
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 font-semibold tracking-wide text-white">
                  <Download className="w-5 h-5" />
                  DOWNLOAD RESUME
                </button>
              </a>
              <Link to="/projects">
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm font-semibold tracking-wide">
                  VIEW PROJECTS
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm font-semibold tracking-wide">
                  CONTACT
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/10"
                style={{ transform: 'scale(1.1)' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/5"
                style={{ transform: 'scale(1.2)' }}
              />

              {/* Profile Image with Hover Zoom & Glowing Border */}
              <div className="absolute inset-0 rounded-full overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(168,85,247,0.15)] group bg-gradient-to-br from-gray-900 to-black">
                <img 
                  src={personalInfo.profilePic || "/assets/hamim.png"} 
                  alt={personalInfo.fullName} 
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>


              {/* Floating Tech Badges */}
              {[
                { icon: "🚀", label: "FLUTTER", position: "top-0 right-12", delay: 0.8 },
                { icon: "🤖", label: "AI", position: "top-12 right-0", delay: 0.9 },
                { icon: "🤖", label: "ANDROID", position: "top-28 -right-8", delay: 0.95 },
                { icon: "🍎", label: "IOS", position: "bottom-28 -right-8", delay: 1.0 },
                { icon: "⚡", label: "FASTAPI", position: "bottom-12 right-0", delay: 1.05 },
                { icon: "🔥", label: "FIREBASE", position: "bottom-0 right-12", delay: 1.1 },
                { icon: "⚛️", label: "REACT", position: "bottom-0 left-12", delay: 1.15 },
                { icon: "🐍", label: "PYTHON", position: "bottom-12 left-0", delay: 1.2 },
                { icon: "🍏", label: "SOFTWARE", position: "bottom-28 -left-8", delay: 1.25 },
                { icon: "⚙️", label: "DJANGO", position: "top-28 -left-8", delay: 1.3 },
                { icon: "💡", label: "SYSTEMS", position: "top-0 left-12", delay: 1.35 },
              ].map((badge) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                  transition={{
                    opacity: { delay: badge.delay, duration: 0.5 },
                    scale: { delay: badge.delay, duration: 0.5 },
                    y: { duration: 3, repeat: Infinity, delay: badge.delay }
                  }}
                  className={`absolute ${badge.position} px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm flex items-center gap-2 font-semibold tracking-wide`}
                >
                  <span>{badge.icon}</span>
                  <span className="text-white">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Sections */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">THE ENGINEER</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto tracking-wide">
              More than code. A journey of passion, innovation, and relentless pursuit of excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-16 h-16" />,
                title: "AI ARCHITECT",
                description: "Designing intelligent systems that learn, adapt, and evolve. From LangChain workflows to custom ML models."
              },
              {
                icon: <Rocket className="w-16 h-16" />,
                title: "PRODUCTION BUILDER",
                description: "Shipping real products to thousands of users. From Flutter apps to AI-powered backends."
              },
              {
                icon: <Target className="w-16 h-16" />,
                title: "FOUNDER MINDSET",
                description: "Not just executing - leading. Building teams, products, and visions that create real impact."
              }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="text-white mb-6">{card.icon}</div>
                <h3 className="text-2xl font-bold mb-4 tracking-wide">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed tracking-wide">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="relative py-32 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">FEATURED WORK</h2>
            <p className="text-xl text-gray-400 tracking-wide">Production systems serving thousands</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { name: "QARI 24/7", impact: "10K+ Users", tech: "AI • Flutter • Firebase" },
              { name: "EPIC NZ TRAVEL", impact: "5K+ Bookings", tech: "Flutter • FastAPI • PostgreSQL" },
              { name: "KICK360", impact: "3K+ Athletes", tech: "Flutter • ML • Analytics" },
              { name: "AI RESERVATION", impact: "15K+ Calls", tech: "LangChain • OpenAI • Python" },
            ].map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-3xl font-bold tracking-wide">{project.name}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 tracking-wide">
                    LIVE
                  </span>
                </div>
                <p className="text-gray-400 mb-4 tracking-wide">{project.tech}</p>
                <p className="text-2xl font-bold tracking-wide">{project.impact}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/projects">
              <button className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto font-semibold tracking-wide">
                VIEW ALL PROJECTS
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Vision Quote */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <Star className="w-16 h-16 mx-auto mb-8 text-white" />
            <blockquote className="text-3xl md:text-4xl font-bold mb-8 leading-relaxed tracking-wide">
              "{personalInfo.philosophy}"
            </blockquote>
            <p className="text-xl text-gray-400 tracking-wide">— {personalInfo.lastName}'s Philosophy</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">EXPLORE THE JOURNEY</h2>
            <p className="text-xl text-gray-400 mb-12 tracking-wide">
              Dive deeper into the life, work, and vision of a modern AI engineer
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/about">
                <button className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 font-semibold tracking-wide">
                  ABOUT LEON
                </button>
              </Link>
              <Link to="/leo">
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm font-semibold tracking-wide">
                  TALK TO LEO AI
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
