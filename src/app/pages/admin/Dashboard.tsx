import { motion } from "motion/react";
import { Users, Eye, FolderKanban, TrendingUp, Github, Linkedin, Mail } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export function AdminDashboard() {
  const { projects, profileViews, skills, timelineEvents, personalInfo } = usePortfolio();
  const stats = [
    { label: "Total Projects", value: projects.length.toString(), icon: FolderKanban, change: "Live from database", color: "blue" },
    { label: "Portfolio Views", value: profileViews.toString(), icon: Eye, change: "Real-time tracking", color: "green" },
    { label: "Technical Skills", value: skills.length.toString(), icon: Github, change: "Fully customizable", color: "purple" },
    { label: "Journey Milestones", value: timelineEvents.length.toString(), icon: Users, change: "Life highlights", color: "orange" },
  ];

  const recentActivity = [
    { action: "Portfolio Initialized", item: "Connected to Firebase Firestore", time: "Active" },
    { action: "Database Loaded", item: `${projects.length} Projects, ${skills.length} Skills sync'd`, time: "Just now" },
    { action: "System Health", item: "Leo AI Assistant online", time: "Live" }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {personalInfo.firstName}! Here's your portfolio overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-500/10`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
            <p className="text-xs text-green-400">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.item}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors text-left font-medium">
              + Add New Project
            </button>
            <button className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition-colors text-left font-medium">
              Update Skills
            </button>
            <button className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition-colors text-left font-medium">
              Add Timeline Event
            </button>
            <button className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition-colors text-left font-medium">
              Upload Media
            </button>
          </div>
        </motion.div>
      </div>

      {/* Social Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10"
      >
        <h2 className="text-xl font-bold mb-6">Social Media Overview</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-white/5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Github className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-gray-400">GitHub Stars</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-white/5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Linkedin className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">1.2K</p>
              <p className="text-sm text-gray-400">LinkedIn Connections</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-white/5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-500/10">
              <Mail className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-gray-400">Contact Requests</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
