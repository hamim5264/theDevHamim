import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Upload, FileText, Image as ImageIcon, Check, Eye, Download, ShieldAlert } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export function AdminMedia() {
  const { personalInfo, updatePersonalInfo } = usePortfolio();
  
  const [profileLoading, setProfileLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [resumeSuccess, setResumeSuccess] = useState(false);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (base64Str: string, maxWidth = 1200, maxHeight = 1200): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(base64Str);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // High quality 0.85
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.85);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    });
  };

  // File Upload Handlers (converts to Base64 and updates context/Firestore)
  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setProfileLoading(true);
    setProfileSuccess(false);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64String = reader.result as string;
        
        let finalBase64 = base64String;
        // Bypasses compression completely if image is already small (<700KB) to show raw real image.
        // Otherwise, uses a premium 1200px HD resolution compression to safely prevent Firestore size crashes.
        if (file.size > 700 * 1024) {
          finalBase64 = await compressImage(base64String, 1200, 1200);
        }

        await updatePersonalInfo({ profilePic: finalBase64 });
        setProfileSuccess(true);
      } catch (err) {
        console.error("Failed to update profile pic:", err);
        alert("Failed to upload image. Please try again.");
      } finally {
        setProfileLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      alert("Please select a valid PDF document.");
      return;
    }

    setResumeLoading(true);
    setResumeSuccess(false);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64String = reader.result as string;
        await updatePersonalInfo({ resumeUrl: base64String });
        setResumeSuccess(true);
      } catch (err) {
        console.error("Failed to update resume:", err);
        alert("Failed to upload resume PDF. Please try again.");
      } finally {
        setResumeLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Media & Assets</h1>
        <p className="text-gray-400">Upload and manage active media, portfolio images, and PDF resume assets</p>
      </motion.div>

      {/* Main Assets Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Profile Picture Uploader */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <ImageIcon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Profile Photo Asset</h3>
                <p className="text-sm text-gray-400">Directly syncs to home page orb avatar</p>
              </div>
            </div>

            {/* Active Preview */}
            <div className="flex justify-center items-center p-8 bg-zinc-900 border border-white/5 rounded-xl mb-6 relative overflow-hidden group min-h-[220px]">
              {personalInfo.profilePic ? (
                <div className="relative">
                  <img
                    src={personalInfo.profilePic}
                    alt="Current Profile Pic"
                    className="w-40 h-40 rounded-full object-cover border-2 border-white/20 shadow-2xl transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-xs text-white uppercase tracking-wider font-semibold">Active Profile</span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <ImageIcon className="w-16 h-16 mx-auto mb-2 text-zinc-700" />
                  <p className="text-sm">No profile picture uploaded yet</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <input
              type="file"
              ref={profileInputRef}
              onChange={handleProfilePicUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => profileInputRef.current?.click()}
              disabled={profileLoading}
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                profileSuccess
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {profileLoading ? (
                "Processing image..."
              ) : profileSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  Profile Image Updated!
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload New Photo
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
              Recommended: Square aspect ratio (JPG/PNG). Saved directly into Firestore.
            </p>
          </div>
        </motion.div>

        {/* Resume PDF Uploader */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Professional PDF Resume</h3>
                <p className="text-sm text-gray-400">Directly syncs to download resume button</p>
              </div>
            </div>

            {/* Active Preview */}
            <div className="flex flex-col justify-center items-center p-8 bg-zinc-900 border border-white/5 rounded-xl mb-6 min-h-[220px]">
              {personalInfo.resumeUrl ? (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-purple-500/10 rounded-2xl border border-purple-500/30 flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <FileText className="w-10 h-10 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Latest_Resume.pdf</h4>
                    <p className="text-xs text-green-400 mt-1">Live Database Connection Sync'd</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={personalInfo.resumeUrl}
                      download="Resume_of_Hamim.pdf"
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold tracking-wider flex items-center gap-1.5 text-white transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Test Download
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <ShieldAlert className="w-16 h-16 mx-auto mb-2 text-zinc-700" />
                  <p className="text-sm">Default local static resume active</p>
                  <p className="text-xs text-zinc-600 mt-1">Upload a PDF to sync live database copy</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <input
              type="file"
              ref={resumeInputRef}
              onChange={handleResumeUpload}
              accept=".pdf,application/pdf"
              className="hidden"
            />
            <button
              onClick={() => resumeInputRef.current?.click()}
              disabled={resumeLoading}
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                resumeSuccess
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {resumeLoading ? (
                "Processing document..."
              ) : resumeSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  Resume PDF Sync'd!
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload New Resume PDF
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
              Accepts: .pdf files only. Saved directly into Firestore.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Info Notice Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl bg-zinc-900 border border-yellow-500/20 flex gap-4 items-start"
      >
        <span className="text-2xl mt-1">💡</span>
        <div>
          <h4 className="font-bold text-white mb-1">State-Saving Base64 File Storage Technology</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            By converting profile pictures and resume PDFs to Base64 strings, we can persist entire files inside Firestore! 
            This means you get full CRUD control and dynamic live asset updates without needing to configure complex external object storage.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
