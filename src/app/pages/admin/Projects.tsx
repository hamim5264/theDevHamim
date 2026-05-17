import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Edit, Trash2, Eye, X, Search, Check, Save } from "lucide-react";
import { usePortfolio, Project } from "../../context/PortfolioContext";

export function AdminProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    id: "",
    name: "",
    category: "",
    description: "",
    tech: [],
    impact: "Mobile Application",
    status: "Live",
    image: "🚀",
    users: "Live",
    lastUpdated: "Today"
  });

  const [techInput, setTechInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiList = [
    // Tech, Programming & Intelligence
    "🚀", "💻", "📱", "🤖", "🧠", "⚡", "⚙️", "🌐", "🔒", "🔑", "🛡️", "🔥", "💡", "📡", "🔋", "🔌",
    "💾", "🖥️", "⌨️", "🎮", "🕹️", "👾", "📷", "🎥", "🎬", "🎨", "🎭", "🎤", "🎧", "🎵", "🔊", "🔮",
    // Business, Organization & Management
    "📊", "📈", "📉", "📁", "📂", "💼", "📅", "📆", "📝", "🗒️", "✏️", "🖋️", "📐", "📏", "📌", "📍",
    "💵", "🪙", "💳", "💰", "🏦", "🏛️", "🏢", "🏭", "🏪", "🏫", "🏥", "🏨", "🚀", "🛸", "🌍", "🌎",
    // Islamic, Traditional & Spiritual
    "🕌", "🕋", "🌙", "⭐", "🕯️", "📖", "📜", "🤲", "🧎", "📿", "🕊️", "🕌",
    // Creative, Weather & Visual Assets
    "✨", "🌟", "⭐", "🌈", "☀️", "🌤️", "⛈️", "❄️", "🌊", "🌋", "🏜️", "🏝️", "🏕️", "🏠", "🏡", "🌳",
    // Travel, Companion & Vehicles
    "✈️", "🛫", "🛬", "🚢", "⛵", "🚗", "🚕", "🚙", "🚌", "🏎️", "🏍️", "🚲", "🗺️", "🧭", "🧭", "🗺️",
    // Play, Sports & Competition
    "⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🥅", "🛹", "🥋",
    // Animals & Creatures
    "🦁", "🐯", "🐼", "🐻", "🦊", "🐰", "🐱", "🐶", "🦅", "🦉", "🦜", "🦈", "🐬", "🐳", "🦖", "🐉",
    // Food, Drinks & Lifestyle
    "🥗", "🍎", "🍉", "🍇", "🍓", "🍒", "🍑", "🥭", "🍍", "🥥", "🍕", "🍔", "🍟", "🍣", "🌮", "🧁"
  ];

  const handleOpenAdd = () => {
    setCurrentProject({
      id: "project-" + Date.now(),
      name: "",
      category: "",
      description: "",
      tech: [],
      impact: "Mobile Application",
      status: "Live",
      image: "🚀",
      users: "Live",
      lastUpdated: "Today"
    });
    setTechInput("");
    setIsEditing(false);
    setIsOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setCurrentProject({ ...project });
    setTechInput(project.tech.join(", "));
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!currentProject.name || !currentProject.id) {
      alert("Please enter project name and unique ID.");
      return;
    }

    const techArray = techInput
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const projectToSave: Project = {
      ...(currentProject as Project),
      tech: techArray,
      lastUpdated: "Just now"
    };

    if (isEditing) {
      updateProject(projectToSave.id, projectToSave);
    } else {
      addProject(projectToSave);
    }

    setIsOpen(false);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "All Status" || p.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects CRUD Manager</h1>
          <p className="text-gray-400">Add, edit, and delete dynamic portfolio projects</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Add New Project
        </button>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-lg bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
        >
          <option>All Status</option>
          <option>Live</option>
          <option>Development</option>
        </select>
      </motion.div>

      {/* Projects Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
      >
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Project</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Tech Stack</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">App Keyword</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Last Updated</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredProjects.map((project, i) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{project.image}</span>
                    <div className="font-semibold">{project.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Live' || project.status === 'Live & Deployed' || project.status === 'Live in Production' || project.status === 'Live & Scaling'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    }`}
                  >
                    {project.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded bg-white/10 text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 rounded bg-white/10 text-xs text-gray-400">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-purple-400 font-mono text-xs font-bold tracking-wider">{project.impact}</td>
                <td className="px-6 py-4 text-gray-400 text-sm">{project.lastUpdated}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleOpenEdit(project)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this project?')) {
                          deleteProject(project.id);
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-zinc-950 border border-white/10 w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {isEditing ? "Edit Project Details" : "Create New Project"}
                </h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full cursor-pointer"
                >
                  <X className="w-6 h-6 text-gray-400 hover:text-white" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Unique ID (lowercase, e.g. "qari")</label>
                    <input
                      type="text"
                      disabled={isEditing}
                      value={currentProject.id}
                      onChange={(e) => setCurrentProject({ ...currentProject, id: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 disabled:opacity-50"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm text-gray-400 mb-2">Icon Emoji</label>
                    <div 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 cursor-pointer flex items-center justify-between hover:bg-white/10 transition-colors"
                    >
                      <span className="text-xl">{currentProject.image || "🚀"}</span>
                      <span className="text-xs text-gray-400">Choose...</span>
                    </div>

                    {showEmojiPicker && (
                      <div className="absolute left-0 right-0 mt-2 p-4 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                        {emojiList.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => {
                              setCurrentProject({ ...currentProject, image: emoji });
                              setShowEmojiPicker(false);
                            }}
                            className="text-2xl p-2 rounded hover:bg-white/20 transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={currentProject.name}
                    onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Category (e.g. AI Quran Platform)</label>
                    <input
                      type="text"
                      value={currentProject.category}
                      onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">App Keyword (e.g. Mobile Application)</label>
                    <input
                      type="text"
                      value={currentProject.impact}
                      onChange={(e) => setCurrentProject({ ...currentProject, impact: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Development Status</label>
                    <select
                      value={currentProject.status}
                      onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-white/30 cursor-pointer"
                    >
                      <option>Live</option>
                      <option>Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Live Availability Link Description</label>
                    <input
                      type="text"
                      value={currentProject.users}
                      onChange={(e) => setCurrentProject({ ...currentProject, users: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={currentProject.description}
                    onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Tech Stack (comma separated, e.g. "Flutter, Dart, Firebase")</label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={handleSave}
                    className="flex-1 py-4 bg-white text-black hover:bg-gray-200 rounded-xl transition-all duration-300 font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-5 h-5" />
                    Save Project
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-colors font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
