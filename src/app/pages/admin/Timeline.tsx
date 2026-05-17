import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Edit, Trash2, Calendar, X, Check } from "lucide-react";
import { usePortfolio, TimelineEvent } from "../../context/PortfolioContext";

export function AdminTimeline() {
  const { timelineEvents, addTimelineEvent, updateTimelineEvent, deleteTimelineEvent } = usePortfolio();

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingEventId, setEditingEventId] = useState<string | number>("");

  // Form States
  const [formYear, setFormYear] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formTech, setFormTech] = useState("");
  const [formType, setFormType] = useState<"milestone" | "achievement" | "career" | "learning" | "work" | "edu" | "cert" | "hobby">("work");

  const openAddModal = () => {
    setModalMode("add");
    setFormYear("");
    setFormTitle("");
    setFormSubtitle("");
    setFormDescription("");
    setFormTech("");
    setFormType("work");
    setIsModalOpen(true);
  };

  const openEditModal = (event: TimelineEvent) => {
    setModalMode("edit");
    setEditingEventId(event.id);
    setFormYear(event.year);
    setFormTitle(event.title);
    setFormSubtitle(event.subtitle || "");
    setFormDescription(event.description);
    setFormTech(event.tech);
    setFormType(event.type);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formYear.trim() || !formTitle.trim() || !formDescription.trim()) return;

    const eventData: TimelineEvent = {
      id: modalMode === "add" ? Date.now().toString() : editingEventId,
      year: formYear.trim(),
      title: formTitle.trim(),
      subtitle: formSubtitle.trim() || undefined,
      description: formDescription.trim(),
      tech: formTech.trim(),
      type: formType,
    };

    if (modalMode === "add") {
      addTimelineEvent(eventData);
    } else {
      updateTimelineEvent(editingEventId, eventData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string | number, title: string) => {
    if (confirm(`Are you sure you want to delete event "${title}"?`)) {
      deleteTimelineEvent(id);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'blue';
      case 'edu': return 'green';
      case 'cert': return 'orange';
      case 'hobby': return 'pink';
      case 'milestone': return 'purple';
      case 'achievement': return 'emerald';
      case 'career': return 'cyan';
      case 'learning': return 'indigo';
      default: return 'gray';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Life Journey Timeline</h1>
          <p className="text-gray-400">Manage your career and life milestones</p>
        </div>
        <button 
          onClick={openAddModal}
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-4xl">
        <AnimatePresence mode="popLayout">
          {timelineEvents.map((event, i) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative pl-12 pb-12 border-l-2 border-white/20 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className={`absolute left-0 top-0 w-6 h-6 -translate-x-[13px] rounded-full bg-${getTypeColor(event.type)}-500 ring-4 ring-black flex items-center justify-center`}>
                <Calendar className="w-3 h-3 text-white" />
              </div>

              {/* Event Card */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-blue-400 font-semibold">{event.year}</span>
                      <span className={`px-3 py-0.5 rounded-full text-xs bg-${getTypeColor(event.type)}-500/20 text-${getTypeColor(event.type)}-400 border border-${getTypeColor(event.type)}-500/30 capitalize`}>
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1 text-white">{event.title}</h3>
                    {event.subtitle && (
                      <h4 className="text-sm font-medium mb-3 text-gray-400">{event.subtitle}</h4>
                    )}
                    <p className="text-gray-400 mb-4 leading-relaxed">{event.description}</p>
                    {event.tech && (
                      <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                        {event.tech}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openEditModal(event)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      title="Edit Event"
                    >
                      <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                    <button 
                      onClick={() => handleDelete(event.id, event.title)}
                      className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Total Events</p>
          <p className="text-3xl font-bold">{timelineEvents.length}</p>
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Professional Experience</p>
          <p className="text-3xl font-bold text-blue-400">
            {timelineEvents.filter(e => e.type === 'work').length} Cards
          </p>
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Certifications & Edu</p>
          <p className="text-3xl font-bold text-green-400">
            {timelineEvents.filter(e => e.type === 'edu' || e.type === 'cert').length}
          </p>
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Creative hobbies</p>
          <p className="text-3xl font-bold text-pink-400">
            {timelineEvents.filter(e => e.type === 'hobby').length}
          </p>
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
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
                  {modalMode === "add" ? "Add New Event" : "Edit Event"}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Year / Period</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2025 - Present"
                      value={formYear}
                      onChange={(e) => setFormYear(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Event Type</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="work">Work Experience</option>
                      <option value="edu">Education</option>
                      <option value="cert">Certification</option>
                      <option value="hobby">Hobby / Passion</option>
                      <option value="milestone">Milestone</option>
                      <option value="achievement">Achievement</option>
                      <option value="career">Career Change</option>
                      <option value="learning">Learning Path</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Event Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Junior Flutter Developer"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Subtitle / Org Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Beup Tech Agency"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your role, responsibilities, or what you learned..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Technologies Used (e.g. Flutter, Dart, Firebase)</label>
                  <input
                    type="text"
                    placeholder="e.g. Flutter, Dart, Firebase, REST APIs"
                    value={formTech}
                    onChange={(e) => setFormTech(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
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
                    Save Event
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
