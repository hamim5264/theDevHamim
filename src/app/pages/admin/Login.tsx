import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Mail, ArrowRight, ShieldAlert, Check, Loader2, Sparkles } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export function AdminLogin() {
  const { user, login, resetPassword } = usePortfolio();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Password Reset Modal States
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState("");

  // If already logged in, redirect to dashboard immediately
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setLoading(true);
    setError("");

    try {
      await login(email.trim(), password);
      navigate("/admin");
    } catch (err: any) {
      console.error(err);
      setError(
        err.code === "auth/invalid-credential" || err.code === "auth/user-not-found"
          ? "Invalid admin credentials. Please try again."
          : "Authentication failed. Please verify your internet and credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;

    setResetLoading(true);
    setResetSuccess(false);
    setResetError("");

    try {
      await resetPassword(resetEmail.trim());
      setResetSuccess(true);
      setTimeout(() => {
        setIsResetOpen(false);
        setResetSuccess(false);
        setResetEmail("");
      }, 3000);
    } catch (err: any) {
      console.error("Firebase Auth reset password failed:", err);
      
      let message = "Failed to send reset link. Please check your internet connection.";
      if (err.code === "auth/user-not-found" || err.message?.includes("user-not-found")) {
        message = "User not found! Go to Firebase Console > Authentication > Users tab and click 'Add user' for hamim.leon@gmail.com first.";
      } else if (err.code === "auth/invalid-email" || err.message?.includes("invalid-email")) {
        message = "Please enter a valid email address.";
      } else if (err.message) {
        message = err.message;
      }
      
      setResetError(message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black pointer-events-none" />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-4"
          >
            <Sparkles className="w-8 h-8 text-blue-400" />
          </motion.div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">SYSTEM CONTROL</h2>
          <p className="text-gray-400">Sign in to manage your professional portfolio</p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex gap-3 items-center"
              >
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Security ID / Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  required
                  placeholder="admin@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-400">Auth Token / Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetOpen(true);
                    setResetError("");
                    setResetSuccess(false);
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-xl transition-all duration-300 font-bold flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying Token...
                </>
              ) : (
                <>
                  Verify Access
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            ← Back to live portfolio
          </a>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isResetOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md overflow-hidden bg-zinc-950 border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Reset Admin Password</h3>
                <button
                  onClick={() => setIsResetOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePasswordReset} className="space-y-4">
                {resetError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex gap-3 items-center"
                  >
                    <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                    <span>{resetError}</span>
                  </motion.div>
                )}

                <p className="text-sm text-gray-400 leading-relaxed">
                  Enter your registered admin email. We will send a secure password reset link via Firebase.
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Registered Email</label>
                  <input
                    type="email"
                    required
                    placeholder="hamim.leon@gmail.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={resetLoading || resetSuccess}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    resetSuccess
                      ? "bg-green-500 text-white"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {resetLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Link...
                    </>
                  ) : resetSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      Reset Email Sent!
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
