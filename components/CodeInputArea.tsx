"use client";

import { useRef, useCallback, KeyboardEvent, useState } from "react";
import { Send, ChevronDown, Sparkles, Paperclip, Globe, Command } from "lucide-react";
import { LANGUAGE_LABELS, type SupportedLanguage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CodeInputAreaProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

const MAX_CHARS = 8000;

export default function CodeInputArea({
  value,
  onChange,
  onSubmit,
  isLoading,
  language,
  onLanguageChange,
}: CodeInputAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (!isLoading && value.trim()) onSubmit();
      }
    },
    [isLoading, value, onSubmit]
  );

  const charCount = value.length;
  const isOverLimit = charCount > MAX_CHARS;
  const canSubmit = value.trim().length > 0 && !isLoading && !isOverLimit;

  return (
    <div className="w-full relative group/input">
      <div 
        className={cn(
          "relative transition-all duration-700 rounded-[2rem] bg-[#111111]/80 backdrop-blur-2xl border",
          isFocused ? "border-emerald-500/20 shadow-[0_0_40px_rgba(34,197,94,0.05)]" : "border-white/5"
        )}
      >
        {/* Attachment Icons & Input */}
        <div className="flex items-start gap-3 p-4">
           <div className="flex flex-col gap-3 py-2">
              <button className="p-2 hover:bg-white/5 rounded-xl text-neutral-600 hover:text-neutral-400 transition-all cursor-not-allowed">
                 <Paperclip className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-xl text-neutral-600 hover:text-neutral-400 transition-all cursor-not-allowed">
                 <Globe className="w-4 h-4" />
              </button>
           </div>
           
           <div className="flex-1 min-h-[120px] py-1">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Write your any request..."
                spellCheck={false}
                className="w-full bg-transparent min-h-[40px] max-h-[400px] resize-none outline-none text-[14px] font-sans text-neutral-200 placeholder:text-neutral-700 leading-relaxed custom-scrollbar selection:bg-emerald-500/20"
              />
           </div>
        </div>

        {/* Bottom Panel */}
        <div className="px-6 pb-4 pt-1 flex items-center justify-between border-t border-white/[0.03]">
          <div className="flex items-center gap-6">
            <div className="relative group/select">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="appearance-none bg-white/5 pl-3 pr-8 py-1.5 rounded-xl text-[9px] font-mono text-neutral-500 uppercase tracking-widest cursor-pointer focus:outline-none hover:bg-white/10 transition-all border border-white/5"
              >
                {(Object.keys(LANGUAGE_LABELS) as SupportedLanguage[]).map((lang) => (
                  <option key={lang} value={lang} className="bg-neutral-900 text-white font-sans text-xs">
                    {LANGUAGE_LABELS[lang]}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-600 pointer-events-none group-hover/select:text-neutral-400 transition-colors" />
            </div>

            <span className={cn(
              "text-[9px] font-mono tabular-nums tracking-widest transition-colors",
              isOverLimit ? "text-red-500" : "text-neutral-700"
            )}>
              {charCount} / {MAX_CHARS}
            </span>
          </div>

          <motion.button
            whileHover={canSubmit ? { scale: 1.05 } : {}}
            whileTap={canSubmit ? { scale: 0.95 } : {}}
            onClick={onSubmit}
            disabled={!canSubmit}
            className={cn(
              "w-12 h-12 rounded-2xl transition-all flex items-center justify-center shadow-xl group-hover/input:scale-105",
              canSubmit 
                ? "bg-emerald-500 text-[#050505] shadow-emerald-500/20 hover:shadow-emerald-500/40" 
                : "bg-neutral-900 text-neutral-700 border border-white/5 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            ) : (
              <Send className="w-5 h-5 ml-0.5 fill-current" />
            )}
          </motion.button>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-700">
           CMD + Enter to Instant Review
        </p>
      </div>
    </div>
  );
}
