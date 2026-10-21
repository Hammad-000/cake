import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSend, FiX, FiMessageCircle } from "react-icons/fi";
import { GiCakeSlice } from "react-icons/gi";

import {
  getRandomSuggestions,
  getRandomWelcome,
} from "../data/chatSuggestions";
import { sendChatMessage } from "../services/chatService";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A1E] dark:focus-visible:outline-[#D4B27A]";

function ChatBot() {
  // Ek dafa random pick — har render pe nahi
  const welcome = useMemo(() => getRandomWelcome(), []);
  const suggestions = useMemo(() => getRandomSuggestions(4), []);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: welcome },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const updated = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    const reply = await sendChatMessage(
      updated.map(({ role, content }) => ({ role, content }))
    );

    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 z-50 flex w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-[#2B1511]/10 bg-[#F7F0E6] shadow-2xl shadow-[#2B1511]/20 dark:border-[#C9A66B]/20 dark:bg-[#140A07] sm:right-6"
            role="dialog"
            aria-modal="true"
            aria-label="Cakes Villa chat assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#2B1511] px-5 py-4 dark:bg-[#2B1511]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A66B] text-[#2B1511]">
                <GiCakeSlice className="text-lg" />
              </div>
              <div className="grow">
                <p className="font-semibold leading-tight text-[#F7F0E6]">Cakes Villa</p>
                <p className="text-xs text-[#C9A66B]">Cake assistant</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className={`text-[#F7F0E6]/70 transition hover:text-[#F7F0E6] ${focus}`}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: "340px" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#2B1511] text-[#F7F0E6] dark:bg-[#C9A66B] dark:text-[#140A07]"
                        : "bg-white text-[#2B1511] shadow-sm dark:bg-white/10 dark:text-[#f3e5d8]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-white/10">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-2 rounded-full bg-[#8A5A1E] dark:bg-[#D4B27A]"
                        style={{
                          animation: "bounce 1.2s infinite",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-3">
                <p className="mb-2 text-xs text-[#2B1511]/50 dark:text-[#f3e5d8]/50">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setInput(s)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${focus}
                        bg-[#8A5A1E]/10 text-[#8A5A1E] hover:bg-[#8A5A1E]/20
                        dark:bg-[#D4B27A]/15 dark:text-[#D4B27A] dark:hover:bg-[#D4B27A]/25`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-[#2B1511]/10 bg-white p-3 dark:border-[#C9A66B]/20 dark:bg-[#2B1511]/30">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about cakes..."
                  rows={1}
                  disabled={loading}
                  className={`flex-1 resize-none rounded-xl border border-[#2B1511]/10 bg-[#F7F0E6] px-4 py-2.5 text-sm text-[#2B1511] placeholder-[#2B1511]/40 transition dark:border-[#C9A66B]/20 dark:bg-[#140A07] dark:text-[#f3e5d8] dark:placeholder-[#f3e5d8]/40 ${focus}`}
                  style={{ maxHeight: "100px" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${focus}
                    bg-[#2B1511] text-[#F7F0E6] hover:bg-[#4a251b]
                    dark:bg-[#C9A66B] dark:text-[#140A07] dark:hover:bg-[#d8b87d]
                    disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <FiSend size={16} />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-[#2B1511]/40 dark:text-[#f3e5d8]/40">
                Enter to send · Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close chat" : "Open chat with Cakes Villa assistant"}
        aria-expanded={isOpen}
        className={`fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-[#2B1511]/30 transition sm:right-6 ${focus}
          bg-[#2B1511] text-[#F7F0E6] hover:bg-[#4a251b]
          dark:bg-[#C9A66B] dark:text-[#140A07] dark:hover:bg-[#d8b87d]`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FiX size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FiMessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>

        {!isOpen && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#C9A66B] dark:bg-[#2B1511]">
            <span className="h-2 w-2 rounded-full bg-[#2B1511] dark:bg-[#C9A66B]" />
          </span>
        )}
      </motion.button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}

export default ChatBot;