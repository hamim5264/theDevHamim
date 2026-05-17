import { motion } from "motion/react";
import { Github, Linkedin, Mail, Download, Sparkles, Code2, Brain, Rocket, Target } from "lucide-react";
import { LeoChatbot } from "../components/LeoChatbot";
import resumePdf from "../../../assets/Resume of Hamim_Flutter & AI Developer.pdf";
import { usePortfolio } from "../context/PortfolioContext";

export function Portfolio() {
  const { personalInfo, skills, timelineEvents } = usePortfolio();
  const resumeLink = personalInfo.resumeUrl || resumePdf;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0yLTJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0tMiAydjJoMnYtMmgtMnptMC0ydjJoMnYtMmgtMnptMC0ydjJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Software Engineer & AI Innovator</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                MD. ABDUL
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
              >
                HAMIM
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-400 leading-relaxed max-w-xl"
            >
              Flutter & AI Developer building production-ready systems that transform ideas into intelligent, scalable solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Explore Journey
              </button>
              <a href={resumeLink} download="Resume_of_Hamim.pdf">
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 text-white">
                  <Download className="w-5 h-5" />
                  Download Resume
                </button>
              </a>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
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
                { icon: "🚀", label: "Flutter", position: "top-0 right-12" },
                { icon: "🤖", label: "AI", position: "top-12 right-0" },
                { icon: "⚡", label: "FastAPI", position: "bottom-12 right-0" },
                { icon: "🔥", label: "Firebase", position: "bottom-0 right-12" },
                { icon: "⚛️", label: "React", position: "bottom-0 left-12" },
                { icon: "🐍", label: "Python", position: "bottom-12 left-0" },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                  transition={{
                    delay: 0.8 + i * 0.1,
                    duration: 0.5,
                    y: { duration: 3, repeat: Infinity, delay: i * 0.5 }
                  }}
                  className={`absolute ${badge.position} px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm flex items-center gap-2`}
                >
                  <span>{badge.icon}</span>
                  <span className="text-white">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">About Leon</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              More than just code — a journey of passion, innovation, and relentless pursuit of excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12" />,
                title: "Problem Solver",
                description: "Passionate about turning complex challenges into elegant, scalable solutions through AI and automation."
              },
              {
                icon: <Code2 className="w-12 h-12" />,
                title: "Full-Stack Builder",
                description: "From Flutter mobile apps to AI-powered backends, building production-ready systems that make an impact."
              },
              {
                icon: <Target className="w-12 h-12" />,
                title: "Founder Mindset",
                description: "Not just a developer, but an entrepreneur who sees technology as a tool to create value and solve real problems."
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
                <div className="text-blue-400 mb-4">{card.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-32 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">Life Journey</h2>
            <p className="text-xl text-gray-400">The path that shaped a software engineer</p>
          </motion.div>

          <div className="space-y-12">
            {timelineEvents.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative pl-8 border-l-2 border-white/20"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-blue-500 ring-4 ring-black" />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                  <div>
                    <span className="text-blue-400 text-sm font-mono">{item.year}</span>
                    <h3 className="text-2xl font-bold mt-1">{item.title}</h3>
                  </div>
                  <span className="text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit">{item.tech}</span>
                </div>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Skills Ecosystem</h2>
            <p className="text-xl text-gray-400">The technologies powering innovation</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-center cursor-pointer"
              >
                <div className="text-lg font-semibold">{skill.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-32 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Production Projects</h2>
            <p className="text-xl text-gray-400">Real systems serving real users</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Qari 24/7",
                description: "AI-powered Quran learning platform with personalized teaching assistants",
                tech: ["Flutter", "AI", "Firebase"],
                impact: "10K+ users"
              },
              {
                name: "Epic NZ Travel",
                description: "Complete travel booking platform with real-time availability and smart recommendations",
                tech: ["Flutter", "FastAPI", "PostgreSQL"],
                impact: "5K+ bookings"
              },
              {
                name: "Kick360",
                description: "Sports performance tracking with AI-powered analytics and coaching insights",
                tech: ["Flutter", "Python", "ML"],
                impact: "3K+ athletes"
              },
              {
                name: "AI Reservation System",
                description: "Intelligent booking automation with natural language processing",
                tech: ["FastAPI", "LangChain", "OpenAI"],
                impact: "15K+ reservations"
              },
              {
                name: "CRM Calling Agent",
                description: "AI voice agent for automated customer relationship management",
                tech: ["Python", "AI Agents", "Twilio"],
                impact: "50K+ calls handled"
              },
              {
                name: "DevEngine",
                description: "AI-powered development automation platform for rapid prototyping",
                tech: ["Python", "AI", "Full Stack"],
                impact: "Startup product"
              }
            ].map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-2xl font-bold">{project.name}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    {project.impact}
                  </span>
                </div>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(tech => (
                    <span key={tech} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 rounded-lg bg-white text-black text-sm hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Github className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6">Let's Build Together</h2>
            <p className="text-xl text-gray-400 mb-12">
              Have a project in mind? Let's turn your vision into reality.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-16">
              {[
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hamim@devengine.ai" },
                { icon: <Github className="w-5 h-5" />, label: "GitHub", value: "github.com/hamim" },
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "linkedin.com/in/hamim" }
              ].map((contact, i) => (
                <motion.button
                  key={contact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                >
                  {contact.icon}
                  <div className="text-left">
                    <div className="text-xs text-gray-500">{contact.label}</div>
                    <div className="text-sm">{contact.value}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              © 2026 MD. Abdul Hamim (Leon). Built with Flutter, AI, and passion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leo AI Chatbot */}
      <LeoChatbot />
    </div>
  );
}
