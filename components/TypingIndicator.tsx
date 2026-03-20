"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-4 py-2 px-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.3, 1, 0.3],
              backgroundColor: ["#10b981", "#34d399", "#10b981"]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.2, 
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 rounded-full"
          />
        ))}
      </div>
      <motion.span 
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-[10px] font-mono font-bold text-emerald-500 tracking-[0.2em] uppercase"
      >
        Neural Processing...
      </motion.span>
    </div>
  );
}
