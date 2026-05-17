import { Navigation } from "../components/Navigation";
import { motion } from "motion/react";
import { Home, Users, Heart, GraduationCap, Briefcase, MapPin } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export function PersonalLife() {
  const { personalInfo } = usePortfolio();

  const familyMembers = [
    {
      relation: "Father",
      name: personalInfo.fatherName,
      occupation: personalInfo.fatherOccupation,
      details: "An inspiring business leader who runs our family electronics store. Teaches me daily operational discipline, work ethics, and the engineering behind electronic logic systems.",
      mobile: personalInfo.fatherMobile,
      icon: Briefcase
    },
    {
      relation: "Mother",
      name: personalInfo.motherName,
      occupation: personalInfo.motherOccupation,
      details: "The emotional foundation and heart of our family. Supports all my creative software endeavors and teaches me resilience, empathy, and patience.",
      mobile: personalInfo.motherMobile,
      icon: Heart
    },
    {
      relation: "Elder Sister 1",
      name: personalInfo.sister1Name,
      occupation: "Master of Science (M.Sc.) – Entomology",
      details: "Rajshahi College, National University (Passing Year: 2013 | First Class). Instilled in me early scientific curiosity, database organization, and strict research practices.",
      edu: personalInfo.sister1Edu,
      icon: GraduationCap
    },
    {
      relation: "Elder Sister 2",
      name: personalInfo.sister2Name,
      occupation: "Masters of Social Science",
      details: "Rajshahi New Govt. Degree College, Rajshahi (Passing Year: 2019). Guided my social skills, project management, and public communication strategy.",
      edu: personalInfo.sister2Edu,
      icon: GraduationCap
    }
  ];

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
              PERSONAL LIFE & FAMILY
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-wide max-w-3xl mx-auto">
              Behind the screen: the family, values, and environment that inspire my development journey daily.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Family Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 border-b border-white/10 pb-6">
            <Users className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold tracking-tight">MY SUPPORT SYSTEM</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {familyMembers.map((member, i) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-sm font-mono text-purple-400 uppercase tracking-widest font-bold">
                      {member.relation}
                    </span>
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{member.name}</h3>
                  <h4 className="text-lg text-gray-400 mb-4">{member.occupation}</h4>
                  <p className="text-gray-300 leading-relaxed text-base tracking-wide">
                    {member.details}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Residence & Roots */}
          <div className="flex items-center gap-3 mb-12 border-b border-white/10 pb-6">
            <Home className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold tracking-tight">RESIDENCE & ROOTS</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6 text-blue-400">
                <MapPin className="w-6 h-6" />
                <h3 className="text-xl font-bold uppercase tracking-wide">CURRENT RESIDENCE</h3>
              </div>
              <p className="text-2xl font-bold mb-3">Dhaka, Bangladesh</p>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                Banasree, Rampura, Dhaka-1219.
              </p>
              <p className="text-gray-300">
                This is where I build products, coordinate with Beup Tech Agency, run team workflows, and manage operations at DevEngine.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6 text-blue-400">
                <MapPin className="w-6 h-6" />
                <h3 className="text-xl font-bold uppercase tracking-wide">PERMANENT ADDRESS</h3>
              </div>
              <p className="text-2xl font-bold mb-3">Chapainawabganj, Rajshahi</p>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                Nongola, Post Code: 6320, City: Chapainawabganj, Bangladesh.
              </p>
              <p className="text-gray-300">
                My hometown where my academic science foundation was set, achieving perfect scores in SSC and HSC studies under the Rajshahi Board.
              </p>
            </motion.div>
          </div>

          {/* Personal Key Details */}
          <div className="flex items-center gap-3 mt-20 mb-12 border-b border-white/10 pb-6">
            <Heart className="w-8 h-8 text-red-400" />
            <h2 className="text-3xl font-bold tracking-tight">PERSONAL DATA SHEET</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { label: "BLOOD GROUP", value: "A+" },
              { label: "DATE OF BIRTH", value: "November 10, 2002" },
              { label: "NATIONALITY", value: "Bangladeshi" },
              { label: "NID NUMBER", value: "6010606058" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center hover:bg-white/10 hover:border-white/10 transition-all duration-300"
              >
                <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mb-1">{item.label}</p>
                <p className="text-xl font-bold tracking-wide text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
