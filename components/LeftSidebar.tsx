"use client";

import { 
  LayoutDashboard, 
  MessageSquare, 
  Library, 
  Layers, 
  Search, 
  Settings, 
  UserPlus, 
  Clock,
  ChevronRight,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: MessageSquare, label: "AI Chat", active: true },
  { icon: Library, label: "Library", active: false },
  { icon: Settings, label: "Plugins", active: false },
];

const RECENT_CHATS = [
  "Retro style image generation wit...",
  "Text for a business solution for a...",
  "Making a healthy eating plan",
  "Video rendering and generation...",
  "Exporting files from the database"
];

export default function LeftSidebar() {
  return (
    <aside className="sidebar-panel w-[var(--sidebar-width)] flex flex-col h-full border-r border-white/5 bg-[#0a0a0a]">
      {/* Profile Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
              <Image 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Guy" 
                alt="Profile" 
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white leading-tight">Guy Hawkins</h3>
              <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Premium Plan</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg text-neutral-500">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-600" />
          <input 
            type="text" 
            placeholder="Search for chats..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-2.5 pl-9 pr-4 text-xs outline-none focus:border-emerald-500/30 transition-all placeholder:text-neutral-700"
          />
        </div>

        {/* Navigation */}
        <div className="space-y-1 mb-8">
          <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-3 px-3">Features</p>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group",
                item.active 
                  ? "bg-emerald-500/10 text-emerald-400" 
                  : "text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
              {item.active && <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="space-y-1">
          <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-3 px-3">Chat History</p>
          {RECENT_CHATS.map((chat) => (
            <button
              key={chat}
              className="w-full text-left px-3 py-2 rounded-lg text-[11px] text-neutral-500 hover:text-neutral-300 hover:bg-white/5 truncate transition-all"
            >
              {chat}
            </button>
          ))}
        </div>
      </div>

      {/* Footer / Invite */}
      <div className="mt-auto p-4">
        <div className="relative group p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="relative z-10">
            <div className="flex -space-x-2 mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0a0a] overflow-hidden relative">
                  <Image 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} 
                    alt="user" 
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Invite Teammates</h4>
            <p className="text-[10px] text-neutral-500 mb-4 leading-relaxed">Add new team members to collaborate on projects.</p>
            <button className="w-full py-2 bg-white text-black rounded-xl text-[10px] font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2">
              <UserPlus className="w-3 h-3" />
              <span>Invite teammates</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
