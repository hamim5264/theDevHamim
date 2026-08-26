import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Eye, Compass, Cpu, Smartphone, Lightbulb, Plus, Edit, Trash2, Save, Check, X, Star, Rocket } from "lucide-react";
import { usePortfolio, VisionPillar } from "../../context/PortfolioContext";

export function AdminAboutVision() {
  const { 
    personalInfo, 
    updatePersonalInfo, 
    visionPillars, 
    addVisionPillar, 
    updateVisionPillar, 
    deleteVisionPillar 
  } = usePortfolio();

  // Local state for editing About Story section texts
  const [aboutData, setAboutData] = useState({
    about: personalInfo.about || "",
    aboutBeginning: personalInfo.aboutBeginning || "",
    aboutAwakening: personalInfo.aboutAwakening || "",
    aboutStruggle: personalInfo.aboutStruggle || "",
    aboutBreakthrough: personalInfo.aboutBreakthrough || "",
    aboutMindset: personalInfo.aboutMindset || "",
    philosophy: personalInfo.philosophy || "",
    visionSubtitle: personalInfo.visionSubtitle || "",
  });

  // Modal state for Vision Pillars
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | number>("");

  const [pillarTitle, setPillarTitle] = useState("");
  const [pillarSubtitle, setPillarSubtitle] = useState("");
  const [pillarDesc, setPillarDesc] = useState("");
  const [pillarIcon, setPillarIcon] = useState("cpu");
  const [pillarColor, setPillarColor] = useState("purple");

  const openAddModal = () => {
    setModalMode("add");
    setPillarTitle("");
    setPillarSubtitle("");
    setPillarDesc("");
    setPillarIcon("cpu");
    setPillarColor("purple");
    setIsModalOpen(true);
  };

  const openEditModal = (pillar: VisionPillar) => {
    setModalMode("edit");
    setEditingId(pillar.id);
    setPillarTitle(pillar.title);
    setPillarSubtitle(pillar.subtitle);
    setPillarDesc(pillar.desc);
    setPillarIcon(pillar.iconName || "cpu");
    setPillarColor(pillar.color || "purple");
    setIsModalOpen(true);
  };

  const handleSavePillar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pillarTitle.trim()) return;

    const data: VisionPillar = {
      id: modalMode === "add" ? Date.now() : editingId,
      title: pillarTitle.trim(),
      subtitle: pillarSubtitle.trim() || "Pillar",
      desc: pillarDesc.trim(),
      iconName: pillarIcon,
      color: pillarColor
    };

    if (modalMode === "add") {
      addVisionPillar(data);
    } else {
      updateVisionPillar(editingId, data);
    }
    setIsModalOpen(false);
  };

  const handleDeletePillar = (id: string | number, title: string) => {
    if (confirm(`Are you sure you want to delete pillar "${title}"?`)) {
      deleteVisionPillar(id);
    }
  };

  const handleSaveAboutStory = () => {
    updatePersonalInfo(aboutData);
    alert("About & Vision information updated successfully!");
  };

  return (
    <div className="p-8 pb-28 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 pb-4 border-b border-white/10"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Compass className="w-8 h-8 text-purple-400" />
            About & Vision Management
          </h1>
          <p className="text-gray-400">Manage user-side story narrative, mindset philosophy, and future vision pillars</p>
        </div>

        <button 
          onClick={handleSaveAboutStory}
          className="px-5 py-2.5 bg-white text-black hover:bg-gray-200 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 text-sm"
        >
          <Save className="w-4 h-4 text-purple-600" />
          Save Story Edits
        </button>
      </motion.div>

      <div className="max-w-4xl space-y-8">
        {/* Main Hero & Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4"
        >
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-purple-400" />
            Main Hero Subtitle & Core Philosophy
          </h2>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Main About Hero Subtitle Paragraph</label>
            <textarea
              rows={3}
              value={aboutData.about}
              onChange={(e) => setAboutData({ ...aboutData, about: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Core Philosophy Quote</label>
              <input
                type="text"
                value={aboutData.philosophy}
                onChange={(e) => setAboutData({ ...aboutData, philosophy: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors font-mono"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Vision Page Subtitle Ambition</label>
              <input
                type="text"
                value={aboutData.visionSubtitle}
                onChange={(e) => setAboutData({ ...aboutData, visionSubtitle: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Story Milestones Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-6"
        >
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            About Page Narrative Cards
          </h2>

          <div>
            <label className="block text-sm text-purple-300 font-semibold mb-2">1. THE BEGINNING Paragraph</label>
            <textarea
              rows={3}
              value={aboutData.aboutBeginning}
              onChange={(e) => setAboutData({ ...aboutData, aboutBeginning: e.target.value })}
              placeholder="Defaults to family support, SSC/HSC GPA 5.00 foundation..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-purple-300 font-semibold mb-2">2. THE AWAKENING Paragraph</label>
            <textarea
              rows={3}
              value={aboutData.aboutAwakening}
              onChange={(e) => setAboutData({ ...aboutData, aboutAwakening: e.target.value })}
              placeholder="Defaults to first line of code, joining DIU for B.Sc in CSE..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-purple-300 font-semibold mb-2">3. THE STRUGGLE & TRAINING Paragraph</label>
            <textarea
              rows={3}
              value={aboutData.aboutStruggle}
              onChange={(e) => setAboutData({ ...aboutData, aboutStruggle: e.target.value })}
              placeholder="Defaults to Ostad training 96.5/100 score, state management mastery..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-purple-300 font-semibold mb-2">4. THE BREAKTHROUGH & LEADERSHIP Paragraph</label>
            <textarea
              rows={3}
              value={aboutData.aboutBreakthrough}
              onChange={(e) => setAboutData({ ...aboutData, aboutBreakthrough: e.target.value })}
              placeholder="Defaults to Beup Tech Agency Captain of Team Systemica Intelligence..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-purple-300 font-semibold mb-2">5. THE MINDSET Paragraph</label>
            <textarea
              rows={3}
              value={aboutData.aboutMindset}
              onChange={(e) => setAboutData({ ...aboutData, aboutMindset: e.target.value })}
              placeholder="Defaults to philosophy on code as medium to solve human problems..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </motion.div>

        {/* Dynamic Vision Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-pink-400" />
                Future Vision Pillars (Vision Page)
              </h2>
              <p className="text-sm text-gray-400">Add, edit, or customize core future pillars shown on the Vision page</p>
            </div>

            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Vision Pillar
            </button>
          </div>

          <div className="space-y-4">
            {visionPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="flex items-start justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex gap-4 flex-1 pr-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{pillar.title}</h3>
                    <p className="text-sm text-gray-300 mt-1 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditModal(pillar)}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="Edit Pillar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePillar(pillar.id, pillar.title)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete Pillar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Save Action Bar */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-6 right-8 z-40 flex items-center gap-3 p-3 px-5 bg-zinc-900/90 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-xl"
      >
        <div className="hidden sm:block text-left mr-2">
          <p className="text-xs font-bold text-white tracking-wide">About & Vision Edits</p>
          <p className="text-[11px] text-gray-400">Save story and pillar updates</p>
        </div>
        <button
          onClick={handleSaveAboutStory}
          className="p-2.5 px-5 rounded-xl bg-white hover:bg-gray-200 text-black transition-all font-bold text-sm flex items-center gap-2 cursor-pointer shadow-xl hover:scale-105"
        >
          <Save className="w-4 h-4 text-purple-600" />
          Save Changes
        </button>
      </motion.div>

      {/* Add / Edit Vision Pillar Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  {modalMode === "add" ? "Add Vision Pillar" : "Edit Vision Pillar"}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePillar} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Pillar Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. INTELLIGENT AI AGENTS"
                    value={pillarTitle}
                    onChange={(e) => setPillarTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Autonomous Operations, Scalable Systems"
                    value={pillarSubtitle}
                    onChange={(e) => setPillarSubtitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Detailed breakdown of the ambition, technology stack, and impact..."
                    value={pillarDesc}
                    onChange={(e) => setPillarDesc(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Icon Type</label>
                    <select
                      value={pillarIcon}
                      onChange={(e) => setPillarIcon(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="cpu">Cpu / AI Agent</option>
                      <option value="smartphone">Smartphone / Flutter</option>
                      <option value="lightbulb">Lightbulb / Design</option>
                      <option value="compass">Compass / Vision</option>
                      <option value="rocket">Rocket / Launch</option>
                      <option value="star">Star / Excellence</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Theme Color</label>
                    <select
                      value={pillarColor}
                      onChange={(e) => setPillarColor(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="purple">Purple</option>
                      <option value="blue">Blue</option>
                      <option value="pink">Pink</option>
                      <option value="green">Green</option>
                      <option value="orange">Amber / Orange</option>
                    </select>
                  </div>
                </div>

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
                    Save Pillar
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
