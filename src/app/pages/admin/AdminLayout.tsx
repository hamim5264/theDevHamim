import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  LayoutDashboard,
  FolderKanban,
  Brain,
  Clock,
  Award,
  Compass,
  Image,
  Settings,
  Home,
  LogOut,
  Menu,
  X
} from "lucide-react";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, authLoading, logout } = usePortfolio();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-t-2 border-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Validating Security Token...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { path: "/admin/projects", icon: FolderKanban, label: "Projects" },
    { path: "/admin/skills", icon: Brain, label: "Skills" },
    { path: "/admin/timeline", icon: Clock, label: "Timeline" },
    { path: "/admin/achievements", icon: Award, label: "Achievements" },
    { path: "/admin/about-vision", icon: Compass, label: "About & Vision" },
    { path: "/admin/media", icon: Image, label: "Media" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-white/10 sticky top-0 z-40">
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Leon Admin
          </h1>
          <p className="text-[10px] text-gray-500">Portfolio Management</p>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar & Mobile Overlay Drawer */}
      <AnimatePresence>
        {(isMobileOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`w-64 bg-zinc-950 border-r border-white/10 flex flex-col fixed md:static inset-y-0 left-0 z-50 md:z-auto ${
              isMobileOpen ? "block shadow-2xl" : "hidden md:flex"
            }`}
          >
            {/* Logo */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Leon Admin
                </h1>
                <p className="text-xs text-gray-500 mt-1">Portfolio Management</p>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="md:hidden p-1.5 rounded-lg hover:bg-white/10 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path, item.exact)
                        ? 'bg-white text-black'
                        : 'hover:bg-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <Link to="/" onClick={() => setIsMobileOpen(false)}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">View Portfolio</span>
                </motion.div>
              </Link>
              <motion.button
                onClick={async () => {
                  setIsMobileOpen(false);
                  await logout();
                  navigate("/admin/login");
                }}
                whileHover={{ x: 4 }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
