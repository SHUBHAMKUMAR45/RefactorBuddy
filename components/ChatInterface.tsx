"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useChat } from "ai/react";
import { AlertCircle, Plus, Send, RefreshCw, Paperclip, Globe, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import CodeInputArea from "./CodeInputArea";
import EmptyState from "./EmptyState";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/lib/types";

export default function ChatInterface() {
  const [language, setLanguage] = useState<SupportedLanguage>("auto");
  const [inputCode, setInputCode] = useState("");
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { messages, append, isLoading, error, setMessages } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("[RefactorBuddy] Chat error:", err);
    },
  });

  // Auto-scroll logic
  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;
      if (isNearBottom || messages.length === 0) {
        scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, isLoading]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0 && !isLoading) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "#### 🚨 System Active\nCentra v4.0 Architectural Engine online. I am ready for your code. Paste any snippet below for an authoritative architectural critique and optimized refactor.\n\n#### 🎓 Senior Principle\n\"Clean code is not just a standard; it's a technical debt prevention strategy.\"",
        },
      ]);
    }
  }, [messages.length, isLoading, setMessages]);

  const handleSubmit = useCallback(async () => {
    const code = inputCode.trim();
    if (!code || isLoading) return;

    try {
      await append({
        role: "user",
        content: code,
      });
      setInputCode("");
    } catch (err) {
      console.error("[RefactorBuddy] Failed to send message:", err);
    }
  }, [inputCode, isLoading, append]);

  const handleReset = () => {
    setMessages([]);
    setInputCode("");
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent selection:bg-emerald-500/20">
      <div className="cyber-bg" />

      {/* Glass Header */}
      <header className="fixed top-0 left-0 right-0 h-20 glass-header z-50 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              Centra AI
              <span className="text-[10px] bg-white/5 text-neutral-400 px-2 py-0.5 rounded-full font-mono border border-white/10 uppercase tracking-tighter">BETA</span>
            </h1>
            <p className="text-[11px] text-neutral-500 font-sans font-medium">Neural Architecture assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold text-neutral-300 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20 transition-all group"
          >
            <RefreshCw className={cn("w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-500", isLoading && "animate-spin")} />
            REFRESH CHAT
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-24 pb-44">
        <div className="chat-container px-6 h-full flex flex-col">
          <AnimatePresence mode="wait">
            {!hasMessages ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex flex-col items-center justify-center py-12"
              >
                <EmptyState onExampleClick={(ex) => setInputCode(ex)} />
              </motion.div>
            ) : (
              <div ref={messagesContainerRef} className="space-y-12">
                <AnimatePresence initial={false}>
                  {messages.map((m, idx) => (
                    <MessageBubble 
                      key={m.id || idx} 
                      message={m} 
                      previousMessage={idx > 0 ? messages[idx - 1] : null}
                      isLast={idx === messages.length - 1}
                    />
                  ))}
                </AnimatePresence>
                
                {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-neutral-500 ml-4 pb-8"
                  >
                    <TypingIndicator />
                  </motion.div>
                )}

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mx-auto flex items-center gap-3 p-5 rounded-3xl bg-red-500/5 border border-red-500/10 text-red-400 text-sm max-w-md"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>Neural sync failed. Please refresh the chat.</p>
                  </motion.div>
                )}
                
                <div ref={scrollAnchorRef} className="h-4" />
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-8 z-40 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="chat-container">
          <CodeInputArea 
            value={inputCode}
            onChange={setInputCode}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            language={language}
            onLanguageChange={setLanguage}
          />
          <p className="text-[10px] text-center mt-4 text-neutral-700 font-sans tracking-wide">
            Centra may display inaccurate information. <span className="underline cursor-pointer hover:text-neutral-500 transition-colors">Privacy and Query handled by V4 Engine</span>
          </p>
        </div>
      </div>
    </div>
  );
}
