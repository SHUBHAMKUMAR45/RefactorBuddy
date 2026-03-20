"use client";

import { 
  Zap, 
  Folder, 
  ChevronDown, 
  ChevronRight, 
  Slack, 
  Video, 
  Briefcase,
  Layers,
  FileCode
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function RightPanel() {
  const [activeTab, setActiveTab] = useState("TOOLS");
  
  return (
    <aside className="right-panel w-[var(--right-panel-width)] flex flex-col h-full border-l border-white/5 bg-[#0a0a0a]">
      {/* AI Module Header */}
      <div className="p-6 pb-4 border-b border-white/5">
        <h3 className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-4">AI Module</h3>
        <button className="w-full flex items-center justify-between px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl group hover:bg-emerald-500/20 transition-all">
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 tracking-tight">Query 3.5 Pro</span>
          </div>
          <ChevronDown className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4 flex items-center border-b border-white/5">
        {["TOOLS", "FILES"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 text-[10px] font-bold tracking-[0.2em] transition-all relative pb-2 px-2",
              activeTab === tab ? "text-white" : "text-neutral-600 hover:text-neutral-400"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full mx-6" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {/* Project Explorer Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em]">Your Projects</h4>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] font-bold border border-emerald-500/20 uppercase tracking-widest">New</span>
          </div>
          
          <div className="space-y-2">
            {[
              { label: "Team Project", icon: Folder, active: false },
              { label: "Personal Project", icon: Folder, active: true },
              { label: "Custom Project", icon: Folder, active: false },
            ].map((proj) => (
              <div key={proj.label}>
                <button className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                  proj.active ? "bg-white/[0.03] border border-white/5 shadow-xl" : "hover:bg-white/5"
                )}>
                  <proj.icon className={cn("w-4 h-4", proj.active ? "text-emerald-400 fill-emerald-400/20" : "text-neutral-600")} />
                  <span className={cn("text-xs font-medium", proj.active ? "text-white" : "text-neutral-500")}>
                    {proj.label}
                  </span>
                  {proj.active ? <ChevronDown className="w-3 h-3 ml-auto text-neutral-600" /> : <ChevronRight className="w-3 h-3 ml-auto text-neutral-800" />}
                </button>
                {proj.active && (
                  <div className="ml-10 mt-2 space-y-2 border-l border-white/5 px-4 mb-4">
                    <p className="text-[10px] text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer line-clamp-1 italic">• Retro style image generation wit...</p>
                    <p className="text-[10px] text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer line-clamp-1 italic">• Text for a business solution for a...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Integration Section */}
        <div>
          <h4 className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6">Integrate Apps</h4>
          <div className="space-y-6">
            {[
              { label: "Slack", icon: Slack, desc: "One-touch communication and project control", active: true },
              { label: "Zoom", icon: Video, desc: "Recording and analyzing your calls with captioning", active: true },
              { label: "Upwork", icon: Briefcase, desc: "Auto-responder and scripts for communication with clients", active: false },
            ].map((app) => (
              <div key={app.label} className="flex gap-4 items-start group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-neutral-400 group-hover:bg-white/5 transition-all outline outline-emerald-500/0 group-hover:outline-emerald-500/10">
                  <app.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-neutral-300">{app.label}</span>
                    <button 
                      className={cn(
                        "w-7 h-4 rounded-full relative transition-all duration-300",
                        app.active ? "bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" : "bg-neutral-800"
                      )}
                    >
                      <div className={cn(
                        "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-sm",
                        app.active ? "left-3.5" : "left-0.5"
                      )} />
                    </button>
                  </div>
                  <p className="text-[10px] text-neutral-600 leading-relaxed font-sans">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
