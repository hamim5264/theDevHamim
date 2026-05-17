import { motion } from "motion/react";
import { Heart, Users, Lightbulb, Zap, BookOpen, Trophy } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { usePortfolio } from "../context/PortfolioContext";

export function About() {
  const { personalInfo } = usePortfolio();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />

      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              ABOUT {personalInfo.lastName.toUpperCase()}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-wide max-w-4xl mx-auto">
              More than just code. A story of passion, structural engineering, machine intelligence, and an unwavering belief in building things that solve real-world problems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Beginning */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm mb-20"
          >
            <Heart className="w-16 h-16 mb-8 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">THE BEGINNING</h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed tracking-wide">
              <p>
                Born as <strong className="text-white">{personalInfo.fullName}</strong> (Blood Group: <strong className="text-white">A+</strong>), I grew up in Rajshahi and later moved to Dhaka for my graduation. My journey in computing was born from pure curiosity. Supported deeply by my family—my father, {personalInfo.fatherName}, and my mother, {personalInfo.motherName}—I learned that education and focus are the keys to unlocking infinite possibilities.
              </p>
              <p>
                From my early schooling to securing a perfect <strong className="text-white">GPA 5.00 out of 5.00</strong> in my SSC and HSC studies under the Rajshahi Board, I developed a strong scientific foundation and a passion for engineering.
              </p>
            </div>
          </motion.div>

          {/* The Awakening */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm mb-20"
          >
            <Lightbulb className="w-16 h-16 mb-8 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">THE AWAKENING</h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed tracking-wide">
              <p>
                My programming journey truly started when I wrote my first script. The ability to create dynamic user interfaces sparked a drive to build scalable software.
              </p>
              <p>
                I pursued my passion formally by joining <strong className="text-white">Daffodil International University</strong> for my B.Sc. in Computer Science & Engineering. Combining my academic studies with intense technical research allowed me to transition into AI automation and advanced Flutter app architecture.
              </p>
            </div>
          </motion.div>

          {/* The Struggle */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm mb-20"
          >
            <Zap className="w-16 h-16 mb-8 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">THE STRUGGLE & TRAINING</h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed tracking-wide">
              <p>
                Transitioning from theoretical computer science to engineering production-grade software required relentless dedication. To sharpen my skills, I completed an intensive Flutter training program at <strong className="text-white">Ostad</strong>, graduating in the Pro Batch with a stellar <strong className="text-white">96.5/100</strong> score.
              </p>
              <p>
                Building solutions like AI agents, sports analytics platforms, and payment-integrated travel systems taught me how to tackle bugs, design modular clean architecture (Riverpod, Provider, Clean Architecture), and optimize live servers.
              </p>
            </div>
          </motion.div>

          {/* The Breakthrough */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm mb-20"
          >
            <Trophy className="w-16 h-16 mb-8 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">THE BREAKTHROUGH & LEADERSHIP</h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed tracking-wide">
              <p>
                My breakthrough occurred when I joined <strong className="text-white">Beup Tech Agency</strong> (A Concern of Betopia Group) as a Junior Flutter Developer and was appointed as the <strong className="text-white">Captain of Team Systemica Intelligence</strong>.
              </p>
              <p>
                Leading teams, architecting secure API structures, integrating Firebase and Stripe databases, and scaling microservice products like <strong className="text-white">Kick360</strong>, <strong className="text-white">Qari 24/7</strong>, and <strong className="text-white">Epic NZ Travel</strong> turned my vision into production reality.
              </p>
            </div>
          </motion.div>

          {/* The Mindset */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm mb-20"
          >
            <BookOpen className="w-16 h-16 mb-8 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">THE MINDSET</h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed tracking-wide">
              <p>
                I believe code is not just instructions for machines, but a medium to solve human problems. My philosophy is clear: <strong className="text-white">"{personalInfo.philosophy}"</strong>
              </p>
              <p>
                Whether it is optimizing a live stream pipeline or embedding LLMs like GPT-4 via LangChain for intelligent CRM booking, I architect systems to be clean, modular, and extremely scalable.
              </p>
            </div>
          </motion.div>

          {/* Who I Am Today */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <Users className="w-16 h-16 mb-8 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">WHO I AM TODAY</h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed tracking-wide">
              <p>
                Today, I am a fully rounded Software Engineer and AI Innovator. I specialize in building intelligent SaaS systems, cross-platform mobile apps with Flutter, and robust backend architectures with Python, FastAPI, and Django.
              </p>
              <p>
                From coordinating daily workflows in our family electronics business to scaling modern startup systems at DevEngine, I continue to push the boundaries of what is possible.
              </p>
              <p className="text-white text-2xl font-bold">
                And we are just getting started.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-32 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">WANT TO KNOW MORE?</h2>
            <p className="text-xl text-gray-400 mb-12 tracking-wide">
              Explore the full journey, projects, and vision
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/journey">
                <button className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 font-semibold tracking-wide">
                  VIEW LIFE JOURNEY
                </button>
              </a>
              <a href="/projects">
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm font-semibold tracking-wide">
                  SEE PROJECTS
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
