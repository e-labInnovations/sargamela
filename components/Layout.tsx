import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TICKER_NEWS } from "../constants";

interface LayoutProps {
  children: React.ReactNode;
  scrollNews?: string[];
  programStatus?: "Live" | "Upcoming" | "Completed";
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  scrollNews,
  programStatus = "Completed",
}) => {
  // Keep track of the last valid scroll news to avoid showing empty ticker
  const lastValidScrollNews = useRef<string[]>([]);
  // Toggle between status and breaking news
  const [showStatus, setShowStatus] = useState(true);

  useEffect(() => {
    // Update cache only when we have actual data
    if (scrollNews !== undefined) {
      if (scrollNews.length > 0) {
        lastValidScrollNews.current = scrollNews;
      } else {
        // Clear cache if scroll news is explicitly empty
        lastValidScrollNews.current = [];
      }
    }
  }, [scrollNews]);

  // Alternate between status and breaking news every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowStatus((prev) => !prev);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Use scroll news if available, otherwise use last valid data or fallback
  const displayNews =
    scrollNews && scrollNews.length > 0
      ? scrollNews
      : lastValidScrollNews.current.length > 0
      ? lastValidScrollNews.current
      : TICKER_NEWS;

  return (
    <div className="h-screen w-screen bg-neutral-900 text-white flex flex-col overflow-hidden font-sans">
      {/* Top Decoration Bar */}
      <div className="h-2 w-full bg-gradient-to-r from-news-red via-news-gold to-news-red"></div>

      {/* Main Content Area */}
      <main className="flex-grow relative overflow-hidden flex flex-col">
        {children}
      </main>

      {/* Bottom Ticker */}
      <div
        className={`h-16 text-news-black flex items-center shadow-lg z-50 border-t-4 relative overflow-hidden ${
          programStatus === "Live"
            ? "bg-news-gold border-news-dark"
            : programStatus === "Upcoming"
            ? "bg-yellow-400 border-yellow-700"
            : "bg-gray-300 border-gray-600"
        }`}
      >
        <AnimatePresence mode="wait">
          {showStatus ? (
            <motion.div
              key="status"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-white font-display font-bold text-xl px-6 h-full flex items-center justify-center tracking-widest uppercase shrink-0 z-10 shadow-md ${
                programStatus === "Live"
                  ? "bg-news-red"
                  : programStatus === "Upcoming"
                  ? "bg-yellow-600"
                  : "bg-gray-600"
              }`}
            >
              {programStatus === "Live" && (
                <>
                  <span className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></span>
                  Live
                </>
              )}
              {programStatus === "Upcoming" && "Upcoming"}
              {programStatus === "Completed" && "Completed"}
            </motion.div>
          ) : (
            <motion.div
              key="breaking"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-news-red text-white font-display font-bold text-xl px-6 h-full flex items-center justify-center tracking-widest uppercase shrink-0 z-10 shadow-md"
            >
              Breaking News
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex-grow overflow-hidden relative h-full flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {displayNews.map((news, i) => (
              <span
                key={i}
                className="mx-8 text-2xl font-bold uppercase tracking-tight"
              >
                <span className="text-news-red mr-2">●</span> {news}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {displayNews.map((news, i) => (
              <span
                key={`dup-${i}`}
                className="mx-8 text-2xl font-bold uppercase tracking-tight"
              >
                <span className="text-news-red mr-2">●</span> {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
