import { Navigation } from "../components/Navigation";
import { motion } from "motion/react";

export function AILaboratory() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="pt-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-7xl font-bold mb-8 tracking-tight">AILaboratory</h1>
            <p className="text-2xl text-gray-400 tracking-wide">Coming soon...</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
