import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Edit, Trash2, TrendingUp, X, Check } from "lucide-react";
import { usePortfolio, Skill } from "../../context/PortfolioContext";

export function AdminSkills() {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingSkillName, setEditingSkillName] = useState("");
  
  // Form States
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Frontend");
  const [formLevel, setFormLevel] = useState(90);
  const [formProjects, setFormProjects] = useState(5);
  const [formTrend, setFormTrend] = useState<"up" | "stable">("up");

  const categories = ["All", "Frontend", "Backend", "AI/ML", "DevOps", "Tools"];

  const openAddModal = () => {
    setModalMode("add");
    setFormName("");
    setFormCategory("Frontend");
    setFormLevel(90);
    setFormProjects(5);
    setFormTrend("up");
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setModalMode("edit");
    setEditingSkillName(skill.name);
    setFormName(skill.name);
    setFormCategory(skill.category);
    setFormLevel(skill.level);
    setFormProjects(skill.projects);
    setFormTrend(skill.trend);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const skillData: Skill = {
      name: formName.trim(),
      category: formCategory,
      level: Number(formLevel),
      projects: Number(formProjects),
      trend: formTrend,
    };

    if (modalMode === "add") {
      // Check if skill already exists
      if (skills.some(s => s.name.toLowerCase() === skillData.name.toLowerCase())) {
        alert("A skill with this name already exists.");
        return;
      }
      addSkill(skillData);
    } else {
      updateSkill(editingSkillName, skillData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteSkill(name);
    }
  };

  const filteredSkills = selectedCategory === "All"
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  const avgLevel = skills.length > 0 
    ? Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length) 
    : 0;

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Skills</h1>
          <p className="text-gray-400">Manage your technical expertise</p>
        </div>
        <button 
          onClick={openAddModal}
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add New Skill
        </button>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex gap-3 overflow-x-auto pb-2"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-white text-black'
                : 'bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 relative group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1 text-white">{skill.name}</h3>
                  <p className="text-sm text-gray-400">{skill.category}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => openEditModal(skill)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    title="Edit Skill"
                  >
                    <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                  <button 
                    onClick={() => handleDelete(skill.name)}
                    className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                  </button>
                </div>
              </div>

              {/* Skill Level Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Proficiency</span>
                  <span className="text-sm font-semibold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full rounded-full ${
                      skill.level >= 85
                        ? 'bg-green-500'
                        : skill.level >= 70
                        ? 'bg-blue-500'
                        : 'bg-orange-500'
                    }`}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Projects:</span>
                  <span className="font-semibold">{skill.projects}</span>
                </div>
                <div className="flex items-center gap-1">
                  {skill.trend === 'up' ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-xs">Growing</span>
                    </>
                  ) : (
                    <span className="text-gray-400 text-xs">Stable</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Total Skills</p>
          <p className="text-3xl font-bold">{skills.length}</p>
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Average Level</p>
          <p className="text-3xl font-bold">{avgLevel}%</p>
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Expert Skills</p>
          <p className="text-3xl font-bold text-green-400">
            {skills.filter(s => s.level >= 85).length}
          </p>
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Growing Skills</p>
          <p className="text-3xl font-bold text-blue-400">
            {skills.filter(s => s.trend === 'up').length}
          </p>
        </div>
      </motion.div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg overflow-hidden bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  {modalMode === "add" ? "Add New Skill" : "Edit Skill"}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Skill Name</label>
                  <input
                    type="text"
                    required
                    disabled={modalMode === "edit"}
                    placeholder="e.g. Flutter"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Tools">Tools</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Trend Status</label>
                    <select
                      value={formTrend}
                      onChange={(e) => setFormTrend(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="up">Growing</option>
                      <option value="stable">Stable</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Proficiency ({formLevel}%)</label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={formLevel}
                      onChange={(e) => setFormLevel(Number(e.target.value))}
                      className="w-full accent-blue-500 mt-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Projects Count</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formProjects}
                      onChange={(e) => setFormProjects(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Save Skill
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
