"use client";

import { Code2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onReset: () => void;
  hasMessages: boolean;
}

export default function Header({ onReset, hasMessages }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="shrink-0 flex items-center justify-between px-4 sm:px-8 py-4 glass z-50 sticky top-0"
    >
      {/* Logo + wordmark */}
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-800 rounded-xl blur-sm group-hover:blur-md transition-all opacity-80" />
          <div className="relative w-full h-full bg-black rounded-xl border border-white/10 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-purple-400" />
          </div>
        </motion.div>
        <div className="flex flex-col">
          <span className="font-bold text-base tracking-tight text-white font-sans">
            RefactorBuddy
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              Architectural Engine
            </span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="text-[10px] font-mono text-purple-400">v2.0</span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-neutral-400">Gemini Pro</span>
        </motion.div>

        {hasMessages && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all bg-white/5 hover:bg-white/10 border border-white/10 text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </motion.button>
        )}
      </div>
    </motion.header>
  );
}
