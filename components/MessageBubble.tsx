"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, User, Code2, AlertCircle, Wrench, GraduationCap } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

// ─── Copy Button ─────────────────────────────────────────────────────────────
function CopyButton({ text, className }: { text: string; className?: string }) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <button
      onClick={() => copy(text)}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono transition-all border",
        copied 
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
          : "bg-white/5 border-white/5 text-neutral-500 hover:text-neutral-300 hover:bg-white/10",
        className
      )}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ─── Code block renderer ──────────────────────────────────────────────────────
function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden border border-white/5 bg-[#080808] my-4 group shadow-2xl"
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/20" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 ml-2">
            {language || "source"}
          </span>
        </div>
        <CopyButton text={code} />
      </div>

      <SyntaxHighlighter
        language={language || "typescript"}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "20px",
          background: "transparent",
          fontSize: "13px",
          lineHeight: "1.6",
        }}
        showLineNumbers
        lineNumberStyle={{
          color: "#404040",
          fontSize: "11px",
          minWidth: "2.5em",
          paddingRight: "20px",
          textAlign: "right",
          userSelect: "none",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </motion.div>
  );
}

// ─── Section Card ────────────────────────────────────────────────────────────
type SectionType = "critique" | "refactor" | "principle";

const SECTION_META: Record<SectionType, { icon: any; label: string; color: string; bg: string; border: string }> = {
  critique: { 
    icon: AlertCircle, 
    label: "Critique", 
    color: "text-red-400", 
    bg: "bg-red-500/[0.03]", 
    border: "border-red-500/10" 
  },
  refactor: { 
    icon: Wrench, 
    label: "Refactor", 
    color: "text-blue-400", 
    bg: "bg-blue-500/[0.03]", 
    border: "border-blue-500/10" 
  },
  principle: { 
    icon: GraduationCap, 
    label: "Principle", 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/[0.03]", 
    border: "border-emerald-500/10" 
  },
};

function SectionCard({ type, children, originalCode }: { type: SectionType; children: React.ReactNode; originalCode?: string }) {
  const meta = SECTION_META[type];
  const Icon = meta.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border p-5 my-4 relative overflow-hidden transition-all group/card",
        meta.bg,
        meta.border,
        "hover:bg-opacity-10 shadow-sm"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={cn("p-1.5 rounded-lg bg-white/5", meta.color)}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className={cn("text-[10px] font-mono uppercase tracking-[0.2em] font-bold opacity-80", meta.color)}>
            {meta.label}
          </span>
        </div>
        
        {type === "refactor" && originalCode && (
           <div className="text-[9px] font-mono text-neutral-600 bg-white/5 px-2 py-1 rounded-md border border-white/5">
              DIFF VIEW ACTIVE
           </div>
        )}
      </div>

      <div className="text-neutral-300 text-[13px] leading-relaxed">
        {children}
      </div>
      
      {type === "refactor" && originalCode && (
        <div className="mt-6 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2 mb-4 opacity-40">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-neutral-700" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">Archival Comparison</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-neutral-700" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] text-red-500/50 font-mono uppercase font-bold ml-2">Legacy</span>
              <div className="max-h-[200px] overflow-hidden rounded-xl bg-red-500/[0.02] border border-red-500/10 grayscale opacity-40">
                 <SyntaxHighlighter
                  language="typescript"
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, padding: "12px", background: "transparent", fontSize: "10px", lineHeight: "1.4" }}
                >
                  {originalCode}
                </SyntaxHighlighter>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-emerald-500/50 font-mono uppercase font-bold ml-2">Engineered</span>
              <div className="max-h-[200px] overflow-hidden rounded-xl bg-emerald-500/[0.02] border border-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                 <div className="p-3 text-[10px] text-emerald-400/80 font-mono italic">
                   {"Check the full refactor above for implementation details."}
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function detectSection(heading: string): SectionType | null {
  const h = heading.toLowerCase();
  if (h.includes("critique")) return "critique";
  if (h.includes("refactor")) return "refactor";
  if (h.includes("principle")) return "principle";
  return null;
}

function parseAssistantContent(content: string) {
  // Enhanced splitter to handle various heading levels and styles
  const parts = content.split(/^#{1,4}\s+.+$/m);
  const headings = Array.from(content.matchAll(/^#{1,4}\s+(.+)$/gm)).map((m) => m[1]);
  const sections = [];

  if (parts[0]?.trim()) {
    sections.push({ type: "other", heading: "", body: parts[0].trim() });
  }

  headings.forEach((heading, i) => {
    const body = parts[i + 1]?.trim() || "";
    if (body) {
      sections.push({
        type: detectSection(heading) ?? "other",
        heading: detectSection(heading) ? "" : heading, // Only keep heading if it's not a known section type
        body,
      });
    }
  });

  return sections.length > 0 ? sections : [{ type: "other", heading: "", body: content.trim() }];
}

function buildMarkdownComponents(): Components {
  return {
    code({ className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const isBlock = match || String(children).includes("\n");
      const code = String(children).replace(/\n$/, "");
      
      if (isBlock) return <CodeBlock language={match?.[1] ?? "typescript"} code={code} />;
      
      return (
        <code className="text-[12px] font-mono text-neutral-200 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded mx-0.5">
          {children}
        </code>
      );
    },
    p: ({ children }) => <p className="mb-6 last:mb-0 leading-relaxed text-neutral-400 font-medium">{children}</p>,
    ul: ({ children }) => <ul className="space-y-3 mb-6 ml-6">{children}</ul>,
    li: ({ children }) => (
      <li className="flex gap-4 text-neutral-400">
        <span className="text-emerald-500/40 mt-2.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-current" />
        <span className="leading-relaxed">{children}</span>
      </li>
    ),
    h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-6 mt-10 tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold text-white mb-4 mt-8 tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold text-neutral-100 mb-3 mt-6 tracking-tight">{children}</h3>,
    strong: ({ children }) => <strong className="text-emerald-100 font-bold">{children}</strong>,
    em: ({ children }) => <em className="text-neutral-500 italic font-medium">{children}</em>,
  };
}

export default function MessageBubble({ message, isLast, previousMessage }: { message: any; isLast: boolean; previousMessage?: any }) {
  const role = message.role as "user" | "assistant";
  const content = message.content;
  const components = buildMarkdownComponents();
  const sections = role === "assistant" ? parseAssistantContent(content) : [];
  
  // Extract original code from previous message if it exists
  const originalCode = previousMessage?.role === "user" ? previousMessage.content : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex w-full mb-10 last:mb-0 px-4",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex flex-col max-w-[90%] sm:max-w-[80%]",
        role === "user" ? "items-end" : "items-start"
      )}>
        {/* Simplified Identity Row */}
        <div className={cn(
          "flex items-center gap-2 mb-3 px-2 text-[10px] font-mono tracking-widest uppercase opacity-30",
          role === "user" ? "flex-row-reverse" : "flex-row"
        )}>
           <div className={cn("w-1 h-1 rounded-full", role === "user" ? "bg-emerald-500" : "bg-neutral-500")} />
           <span>{role === "user" ? "Query" : "Buddy D+"}</span>
        </div>

        {/* Capsule Body */}
        <div className={cn(
          "relative px-7 py-5 rounded-[var(--radius-xl)] transition-all duration-500",
          role === "user" 
            ? "bg-[#111111] border border-emerald-500/10 text-neutral-200 shadow-[0_0_30px_rgba(34,197,94,0.05)]" 
            : "bg-[#0a0a0a] border border-white/5 text-neutral-300 shadow-2xl"
        )}>
          {role === "user" ? (
             <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-emerald-100 mb-2">{content.length > 100 ? content.slice(0, 100) + '...' : content}</p>
                {content.includes('\n') && (
                  <div className="max-h-[200px] overflow-hidden rounded-2xl bg-black/40 border border-emerald-500/10 backdrop-blur-md">
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, padding: "16px", background: "transparent", fontSize: "11px", lineHeight: "1.5" }}
                    >
                      {content}
                    </SyntaxHighlighter>
                  </div>
                )}
             </div>
          ) : (
            <div className="prose-v3 min-w-[240px]">
              {sections.map((section, i) => {
                if (section.type !== "other") {
                  return (
                    <SectionCard 
                      key={i} 
                      type={section.type as SectionType}
                      originalCode={section.type === "refactor" ? originalCode : undefined}
                    >
                      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
                        {section.body}
                      </ReactMarkdown>
                    </SectionCard>
                  );
                }
                return (
                  <div key={i} className="mb-4 last:mb-0">
                    {section.heading && (
                      <h4 className="text-[11px] font-bold text-neutral-500 mb-3 uppercase tracking-[0.15em] border-l-2 border-emerald-500/30 pl-3">
                        {section.heading}
                      </h4>
                    )}
                    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
                      {section.body}
                    </ReactMarkdown>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
