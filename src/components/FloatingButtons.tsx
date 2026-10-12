"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 lg:right-6">
      {/* Zalo */}
      <a
        href="https://zalo.me/0901234567"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl lg:h-14 lg:w-14"
        aria-label="Chat Zalo"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
          alt="Zalo"
          className="h-7 w-7"
        />
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/thanhnhu"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl lg:h-14 lg:w-14"
        aria-label="Chat Messenger"
      >
        <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.5 2 2 6.2 2 11.5c0 2.9 1.4 5.5 3.5 7.3V22l3.3-1.8c1 .3 2.1.4 3.2.4 5.5 0 10-4.2 10-9.5S17.5 2 12 2zm1 12.5l-2.5-2.7-4.9 2.7L10.7 9l2.6 2.7 4.8-2.7-5.1 5.5z" />
        </svg>
      </a>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b08d57] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl lg:h-14 lg:w-14"
            aria-label="Lên đầu trang"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}