import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Plus, Edit, Trash2, X, Check, Rocket, Star, BookOpen, Cpu, Trophy, Shield, Zap } from "lucide-react";
import { usePortfolio, Achievement } from "../../context/PortfolioContext";

export function AdminAchievements() {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = usePortfolio();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | number>("");

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [iconName, setIconName] = useState("award");
  const [color, setColor] = useState("blue");

  const openAddModal = () => {
    setModalMode("add");
    setTitle("");
    setCategory("");
    setDesc("");
    setIconName("award");
    setColor("blue");
    setIsModalOpen(true);
  };

  const openEditModal = (ach: Achievement) => {
    setModalMode("edit");
    setEditingId(ach.id);
    setTitle(ach.title);
    setCategory(ach.category);
    setDesc(ach.desc);
    setIconName(ach.iconName || "award");
    setColor(ach.color || "blue");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim()) return;

    const achData: Achievement = {
      id: modalMode === "add" ? Date.now() : editingId,
      title: title.trim(),
      category: category.trim(),
      desc: desc.trim(),
      iconName: iconName,
      color: color
    };

    if (modalMode === "add") {
      addAchievement(achData);
    } else {
      updateAchievement(editingId, achData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string | number, achTitle: string) => {
    if (confirm(`Are you sure you want to delete "${achTitle}"?`)) {
      deleteAchievement(id);
    }
  };

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "rocket": return Rocket;
      case "star": return Star;
      case "book": return BookOpen;
      case "award": return Award;
      case "cpu": return Cpu;
      case "trophy": return Trophy;
      case "shield": return Shield;
      default: return Award;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Achievements</h1>
          <p className="text-gray-400">Manage your honors, awards, leadership milestones, and certificates</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Achievement
        </button>
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => {
          const IconComponent = getIcon(ach.iconName);
          const achColor = ach.color || "blue";

          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold bg-white/10 px-3 py-1 rounded-full">
                    {ach.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className={`p-2.5 rounded-xl bg-${achColor}-500/10 text-${achColor === 'orange' ? 'amber' : achColor}-400`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gray-200">
                  {ach.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {ach.desc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  onClick={() => openEditModal(ach)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ach.id, ach.title)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  {modalMode === "add" ? "Add New Achievement" : "Edit Achievement"}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Achievement Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PRODUCTION APPLICATION DEPLOYMENT"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category Badge *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mobile & Web Software, Rajshahi Board Excellence"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Detailed explanation of the achievement, impact, evaluation score, or award details..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Icon Type</label>
                    <select
                      value={iconName}
                      onChange={(e) => setIconName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="award">Award Ribbon</option>
                      <option value="rocket">Rocket Deployment</option>
                      <option value="star">Star Leadership</option>
                      <option value="book">Book Academic</option>
                      <option value="cpu">CPU AI Tech</option>
                      <option value="trophy">Trophy Winner</option>
                      <option value="shield">Shield Honor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Badge Accent Color</label>
                    <select
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="green">Green</option>
                      <option value="orange">Orange / Amber</option>
                      <option value="pink">Pink</option>
                    </select>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-5 h-5" />
                    Save Achievement
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
