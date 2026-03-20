"use client";

import { Code2, Zap, Shield, Sparkles, Terminal } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  onExampleClick: (code: string) => void;
}

const EXAMPLES = [
  {
    label: "Complexity Trap",
    language: "JS",
    code: `function findDuplicates(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (i != j && arr[i] == arr[j]) {
        result.push(arr[i]);
      }
    }
  }
  return result;
}`,
  },
  {
    label: "Silent Failure",
    language: "JS",
    code: `async function getUser(id) {
  const res = await fetch('/api/users/' + id);
  const data = await res.json();
  return data.user.profile.name;
}`,
  },
  {
    label: "God Object",
    language: "TS",
    code: `function processOrder(order: any) {
  if (!order.id || !order.items) throw 'bad';
  let total = 0;
  for (let i = 0; i < order.items.length; i++) {
    total += order.items[i].price * order.items[i].qty;
  }
  if (order.user.isPremium) total *= 0.9;
  return total;
}`,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function EmptyState({ onExampleClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-3xl"
      >
        {/* Animated Badge */}
        <motion.div variants={item} className="mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 text-[10px] font-mono uppercase tracking-[0.2em] pulse-emerald">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Centra Engine v4.0 Active</span>
          </div>
        </motion.div>
 
        <motion.h1 
          variants={item}
          className="text-5xl sm:text-7xl font-bold mb-8 tracking-tight text-white leading-[0.9]"
        >
          What can I help <br />
          <span className="text-emerald-500">you build today?</span>
        </motion.h1>
 
        <motion.p 
          variants={item}
          className="text-base sm:text-lg text-neutral-500 mb-16 max-w-xl mx-auto leading-relaxed font-medium"
        >
          I'm Centra, your multi-modal AI architect. From complex refactoring to 
          system design and rapid prototyping—let's create something extraordinary.
        </motion.p>
 
        {/* Action Grid */}
        <motion.div 
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
        >
          {EXAMPLES.map((ex) => (
            <motion.button
              key={ex.label}
              variants={item}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(16, 185, 129, 0.05)", borderColor: "rgba(16, 185, 129, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onExampleClick(ex.code)}
              className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] transition-all text-left group flex flex-col justify-between min-h-[160px]"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 group-hover:text-emerald-400 transition-colors">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-neutral-700 font-bold uppercase tracking-widest">{ex.language}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors mb-1">{ex.label}</h3>
                <p className="text-[10px] text-neutral-600 line-clamp-2">Instant assessment and optimized refactor</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
