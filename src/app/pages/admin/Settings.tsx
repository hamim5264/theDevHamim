import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Mail, Link as LinkIcon, Globe, Bell, Lock, Database, Palette, Users, Heart, Brain, Eye, EyeOff, Plus, Edit, Trash2, X, Check, Save, RotateCcw } from "lucide-react";
import { usePortfolio, SocialLink, FamilyMember } from "../../context/PortfolioContext";

export function AdminSettings() {
  const { 
    personalInfo, updatePersonalInfo, 
    customSocialLinks, addSocialLink, updateSocialLink, deleteSocialLink,
    familyMembers, addFamilyMember, updateFamilyMember, deleteFamilyMember
  } = usePortfolio();
  
  // Local state for editing personal info
  const [formData, setFormData] = useState({ ...personalInfo });
  const [showApiKey, setShowApiKey] = useState(false);

  // Modal state for Custom Family Members
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [familyModalMode, setFamilyModalMode] = useState<"add" | "edit">("add");
  const [editingFamilyId, setEditingFamilyId] = useState<string | number>("");

  const [familyRelation, setFamilyRelation] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [familyOccupation, setFamilyOccupation] = useState("");
  const [familyDetails, setFamilyDetails] = useState("");
  const [familyMobile, setFamilyMobile] = useState("");
  const [familyEdu, setFamilyEdu] = useState("");
  const [familyIcon, setFamilyIcon] = useState("user");

  const openAddFamilyModal = () => {
    setFamilyModalMode("add");
    setFamilyRelation("");
    setFamilyName("");
    setFamilyOccupation("");
    setFamilyDetails("");
    setFamilyMobile("");
    setFamilyEdu("");
    setFamilyIcon("user");
    setIsFamilyModalOpen(true);
  };

  const openEditFamilyModal = (member: FamilyMember) => {
    setFamilyModalMode("edit");
    setEditingFamilyId(member.id);
    setFamilyRelation(member.relation);
    setFamilyName(member.name);
    setFamilyOccupation(member.occupation);
    setFamilyDetails(member.details);
    setFamilyMobile(member.mobile || "");
    setFamilyEdu(member.edu || "");
    setFamilyIcon(member.iconName || "user");
    setIsFamilyModalOpen(true);
  };

  const handleSaveFamily = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyRelation.trim() || !familyName.trim()) return;

    const memberData: FamilyMember = {
      id: familyModalMode === "add" ? Date.now() : editingFamilyId,
      relation: familyRelation.trim(),
      name: familyName.trim(),
      occupation: familyOccupation.trim(),
      details: familyDetails.trim(),
      mobile: familyMobile.trim(),
      edu: familyEdu.trim(),
      iconName: familyIcon
    };

    if (familyModalMode === "add") {
      addFamilyMember(memberData);
    } else {
      updateFamilyMember(editingFamilyId, memberData);
    }

    setIsFamilyModalOpen(false);
  };

  const handleDeleteFamily = (id: string | number, name: string) => {
    if (confirm(`Are you sure you want to delete family member record for "${name}"?`)) {
      deleteFamilyMember(id);
    }
  };

  // Modal state for Custom Social Links
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [socialModalMode, setSocialModalMode] = useState<"add" | "edit">("add");
  const [editingSocialId, setEditingSocialId] = useState<string | number>("");

  const [socialName, setSocialName] = useState("");
  const [socialUrl, setSocialUrl] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [socialDescription, setSocialDescription] = useState("");
  const [socialCategory, setSocialCategory] = useState<"main" | "social" | "other">("main");
  const [socialColor, setSocialColor] = useState("red");

  const openAddSocialModal = () => {
    setSocialModalMode("add");
    setSocialName("");
    setSocialUrl("");
    setSocialHandle("");
    setSocialDescription("");
    setSocialCategory("other");
    setSocialColor("red");
    setIsSocialModalOpen(true);
  };

  const openEditSocialModal = (link: SocialLink) => {
    setSocialModalMode("edit");
    setEditingSocialId(link.id);
    setSocialName(link.name);
    setSocialUrl(link.url);
    setSocialHandle(link.handleOrValue);
    setSocialDescription(link.description || "");
    setSocialCategory(link.category || "main");
    setSocialColor(link.color || "red");
    setIsSocialModalOpen(true);
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialName.trim() || !socialUrl.trim()) return;

    const linkData: SocialLink = {
      id: socialModalMode === "add" ? Date.now().toString() : editingSocialId,
      name: socialName.trim(),
      url: socialUrl.trim(),
      handleOrValue: socialHandle.trim() || socialUrl.trim(),
      description: socialDescription.trim(),
      category: socialCategory,
      color: socialColor,
    };

    if (socialModalMode === "add") {
      addSocialLink(linkData);
    } else {
      updateSocialLink(editingSocialId, linkData);
    }

    setIsSocialModalOpen(false);
  };

  const handleDeleteSocial = (id: string | number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteSocialLink(id);
    }
  };

  // Sync state if backend data updates
  useEffect(() => {
    setFormData({ ...personalInfo });
  }, [personalInfo]);

  const handleSave = () => {
    updatePersonalInfo(formData);
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-8 pb-28 relative">
      {/* Header with Quick Save */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 pb-4 border-b border-white/10"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Manage your portfolio and admin preferences in real-time</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setFormData({ ...personalInfo })}
            className="px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-colors font-semibold flex items-center gap-2 cursor-pointer text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button 
            onClick={handleSave}
            className="px-5 py-2.5 bg-white text-black hover:bg-gray-200 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 text-sm"
          >
            <Save className="w-4 h-4 text-purple-600" />
            Save Changes
          </button>
        </div>
      </motion.div>

      <div className="max-w-4xl space-y-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold">Personal Information</h2>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName || ""}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName || ""}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName || ""}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Title</label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Bio / About</label>
              <textarea
                rows={4}
                value={formData.about || ""}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Philosophy / Vision Quote</label>
              <input
                type="text"
                value={formData.philosophy || ""}
                onChange={(e) => setFormData({ ...formData, philosophy: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm text-purple-400 font-semibold">Profile Image Thoughts / Speech Bubble (Optional)</label>
                <span className="text-xs text-gray-400 font-mono">Max 250 words</span>
              </div>
              <textarea
                rows={3}
                placeholder="Leave blank to hide thoughts bubble. E.g. 'Engineering AI Agents & High-Performance Flutter Architectures daily!'"
                value={formData.heroThoughts || ""}
                onChange={(e) => setFormData({ ...formData, heroThoughts: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-purple-500/5 border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">If filled, this thought bubble will float above your profile image on the Home screen.</p>
            </div>

            {/* Floating Tech Stack Badges Manager */}
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-purple-300">Floating Hero Tech Stack Library</h3>
                  <p className="text-xs text-gray-400">Select tech items to pop up around your profile image on the Home screen. Uncheck to hide.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      visibleTechBadges: ["FLUTTER", "AI", "ANDROID", "IOS", "FASTAPI", "FIREBASE", "REACT", "PYTHON", "SOFTWARE", "DJANGO", "SYSTEMS"]
                    })}
                    className="text-[11px] px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      visibleTechBadges: []
                    })}
                    className="text-[11px] px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2">
                {[
                  { icon: "🚀", label: "FLUTTER" },
                  { icon: "🤖", label: "AI" },
                  { icon: "🤖", label: "ANDROID" },
                  { icon: "🍎", label: "IOS" },
                  { icon: "⚡", label: "FASTAPI" },
                  { icon: "🔥", label: "FIREBASE" },
                  { icon: "⚛️", label: "REACT" },
                  { icon: "🐍", label: "PYTHON" },
                  { icon: "🍏", label: "SOFTWARE" },
                  { icon: "⚙️", label: "DJANGO" },
                  { icon: "💡", label: "SYSTEMS" },
                ].map((tech) => {
                  const currentSelected = formData.visibleTechBadges || [
                    "FLUTTER", "AI", "ANDROID", "IOS", "FASTAPI", "FIREBASE", "REACT", "PYTHON", "SOFTWARE", "DJANGO", "SYSTEMS"
                  ];
                  const isChecked = currentSelected.includes(tech.label);

                  return (
                    <label
                      key={tech.label}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                        isChecked
                          ? "bg-purple-500/20 border-purple-500/50 text-white"
                          : "bg-white/5 border-white/10 text-gray-500 hover:bg-white/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          let updated: string[];
                          if (e.target.checked) {
                            updated = [...currentSelected, tech.label];
                          } else {
                            updated = currentSelected.filter((item) => item !== tech.label);
                          }
                          setFormData({ ...formData, visibleTechBadges: updated });
                        }}
                        className="rounded border-white/20 text-purple-600 focus:ring-0 cursor-pointer"
                      />
                      <span className="text-sm">{tech.icon}</span>
                      <span className="text-xs font-semibold tracking-wide">{tech.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Profile Picture Path / URL</label>
              <input
                type="text"
                value={formData.profilePic || ""}
                onChange={(e) => setFormData({ ...formData, profilePic: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Mail className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-bold">Contact Information</h2>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Primary Email</label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Secondary Email</label>
                <input
                  type="email"
                  value={formData.emailSecondary || ""}
                  onChange={(e) => setFormData({ ...formData, emailSecondary: e.target.value })}
                  placeholder="e.g. personal@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">University Email</label>
                <input
                  type="email"
                  value={formData.emailDIU || ""}
                  onChange={(e) => setFormData({ ...formData, emailDIU: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Primary Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Secondary Phone</label>
                <input
                  type="tel"
                  value={formData.phoneSecondary || ""}
                  onChange={(e) => setFormData({ ...formData, phoneSecondary: e.target.value })}
                  placeholder="e.g. +880 1800 000000"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">WhatsApp</label>
                <input
                  type="tel"
                  value={formData.whatsapp || ""}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Location Address</label>
              <input
                type="text"
                value={formData.location || ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Personal Data Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-500/10">
              <Heart className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-bold">Personal Data Sheet</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Blood Group</label>
              <input
                type="text"
                value={formData.bloodGroup || "A+"}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                placeholder="e.g. A+"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Date of Birth</label>
              <input
                type="text"
                value={formData.dob || "November 10, 2002"}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                placeholder="e.g. November 10, 2002"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Nationality</label>
              <input
                type="text"
                value={formData.nationality || "Bangladeshi"}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                placeholder="e.g. Bangladeshi"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">NID Number</label>
              <input
                type="text"
                value={formData.nid || "6010606058"}
                onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                placeholder="e.g. 6010606058"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Dynamic Family Information Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Family Members & Support System</h2>
                <p className="text-sm text-gray-400">Add, edit, or manage parents, siblings, spouse/wife, or children</p>
              </div>
            </div>
            <button
              onClick={openAddFamilyModal}
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Family Member
            </button>
          </div>

          {/* Family List */}
          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div 
                key={member.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 shrink-0 text-purple-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-white text-base truncate">{member.name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {member.relation}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-medium truncate mb-0.5">{member.occupation}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{member.details}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditFamilyModal(member)}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="Edit Member"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFamily(member.id, member.name)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold">AI Integrations</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Gemini API Key</label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={formData.geminiApiKey || ""}
                  onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
                  placeholder="AQ..."
                  className="w-full pl-4 pr-12 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This API key powers Leo AI Assistant to answer any question using advanced intelligence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Social Links Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <LinkIcon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Social & Network Links</h2>
                <p className="text-sm text-gray-400">Add, edit, or remove any custom social profile or platform</p>
              </div>
            </div>
            <button
              onClick={openAddSocialModal}
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add New Link
            </button>
          </div>

          {/* Social Links List */}
          <div className="space-y-3">
            {customSocialLinks.map((link) => (
              <div 
                key={link.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 shrink-0 text-purple-400">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-white text-base truncate">{link.name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-white/10 text-gray-300">
                        {link.category}
                      </span>
                    </div>
                    <p className="text-xs text-blue-400 font-mono truncate mb-0.5">{link.url}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>Handle: <strong className="text-gray-200">{link.handleOrValue}</strong></span>
                      {link.description && <span>• {link.description}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditSocialModal(link)}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="Edit Link"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSocial(link.id, link.name)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete Link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Sync Social Inputs for Legacy PersonalInfo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <h3 className="text-lg font-bold mb-4 text-gray-200">Default Quick Profiles</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github || ""}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.linkedin || ""}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Facebook URL</label>
                <input
                  type="url"
                  value={formData.facebook || ""}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={formData.instagram || ""}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Twitter / X URL</label>
                <input
                  type="url"
                  value={formData.twitter || ""}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Save Section */}
        <div className="flex gap-4">
          <button 
            onClick={handleSave}
            className="flex-1 px-6 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-semibold cursor-pointer flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5 text-purple-600" />
            Save Changes
          </button>
          <button 
            onClick={() => setFormData({ ...personalInfo })}
            className="px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors font-semibold cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {/* Floating Save Action Bar (Always Visible Floating at Bottom Right) */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-6 right-8 z-40 flex items-center gap-3 p-3 px-5 bg-zinc-900/90 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-xl"
      >
        <div className="hidden sm:block text-left mr-2">
          <p className="text-xs font-bold text-white tracking-wide">Unsaved or Quick Settings</p>
          <p className="text-[11px] text-gray-400">Save all edits instantly</p>
        </div>
        <button
          onClick={() => setFormData({ ...personalInfo })}
          className="p-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={handleSave}
          className="p-2.5 px-5 rounded-xl bg-white hover:bg-gray-200 text-black transition-all font-bold text-sm flex items-center gap-2 cursor-pointer shadow-xl hover:scale-105"
        >
          <Save className="w-4 h-4 text-purple-600" />
          Save Changes
        </button>
      </motion.div>

      {/* Add / Edit Social Link Modal */}
      <AnimatePresence>
        {isSocialModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  {socialModalMode === "add" ? "Add Social Link" : "Edit Social Link"}
                </h3>
                <button 
                  onClick={() => setIsSocialModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveSocial} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Platform / Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. YouTube, GitHub, Portfolio, Telegram"
                    value={socialName}
                    onChange={(e) => setSocialName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="e.g. https://youtube.com/@yourchannel"
                    value={socialUrl}
                    onChange={(e) => setSocialUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Card Display Value / Handle</label>
                  <input
                    type="text"
                    placeholder="e.g. @hamimleon, +88017..., hamim.leon"
                    value={socialHandle}
                    onChange={(e) => setSocialHandle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Follow for tech tutorials & dev updates"
                    value={socialDescription}
                    onChange={(e) => setSocialDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Display Section</label>
                    <select
                      value={socialCategory}
                      onChange={(e) => setSocialCategory(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="other">Additional Network Grid</option>
                      <option value="main">Main Hero Card (Top)</option>
                      <option value="social">Social Network Card</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Icon & Glow Color</label>
                    <select
                      value={socialColor}
                      onChange={(e) => setSocialColor(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="red">Red (YouTube / Brand)</option>
                      <option value="blue">Blue (LinkedIn / Facebook)</option>
                      <option value="purple">Purple (GitHub / Twitch)</option>
                      <option value="green">Green (WhatsApp / Spotify)</option>
                      <option value="pink">Pink (Instagram / Dribbble)</option>
                      <option value="amber">Amber / Orange (Warn / Business)</option>
                      <option value="cyan">Cyan / Teal (Twitter / X)</option>
                    </select>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsSocialModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-5 h-5" />
                    Save Link
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Add / Edit Family Member Modal */}
      <AnimatePresence>
        {isFamilyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  {familyModalMode === "add" ? "Add Family Member" : "Edit Family Member"}
                </h3>
                <button 
                  onClick={() => setIsFamilyModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveFamily} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Relationship *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wife, Spouse, Son, Daughter, Father, Mother"
                      value={familyRelation}
                      onChange={(e) => setFamilyRelation(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Occupation / Profession</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer, Doctor, Housewife, Student"
                    value={familyOccupation}
                    onChange={(e) => setFamilyOccupation(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Personal & Family Details</label>
                  <textarea
                    rows={3}
                    placeholder="Personal background, emotional foundation, support details, or milestones..."
                    value={familyDetails}
                    onChange={(e) => setFamilyDetails(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Mobile / Contact</label>
                    <input
                      type="text"
                      placeholder="e.g. 01712345678"
                      value={familyMobile}
                      onChange={(e) => setFamilyMobile(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Icon Type</label>
                    <select
                      value={familyIcon}
                      onChange={(e) => setFamilyIcon(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="user">User Person</option>
                      <option value="heart">Heart / Loved One</option>
                      <option value="briefcase">Briefcase Business</option>
                      <option value="graduation">Graduation Education</option>
                      <option value="star">Star Leadership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Education / Credentials (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. M.Sc. in Engineering, Rajshahi College"
                    value={familyEdu}
                    onChange={(e) => setFamilyEdu(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsFamilyModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-5 h-5" />
                    Save Family Member
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
