import React from 'react';
import { TICKER_NEWS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-neutral-900 text-white flex flex-col overflow-hidden font-sans">
      {/* Top Decoration Bar */}
      <div className="h-2 w-full bg-gradient-to-r from-news-red via-news-gold to-news-red"></div>

      {/* Main Content Area */}
      <main className="flex-grow relative overflow-hidden flex flex-col">
        {children}
      </main>

      {/* Bottom Ticker */}
      <div className="h-16 bg-news-gold text-news-black flex items-center shadow-lg z-50 border-t-4 border-news-dark relative">
        <div className="bg-news-red text-white font-display font-bold text-xl px-6 h-full flex items-center justify-center tracking-widest uppercase shrink-0 z-10 shadow-md">
          Breaking News
        </div>
        <div className="flex-grow overflow-hidden relative h-full flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {TICKER_NEWS.map((news, i) => (
              <span key={i} className="mx-8 text-2xl font-bold uppercase tracking-tight">
                <span className="text-news-red mr-2">●</span> {news}
              </span>
            ))}
             {/* Duplicate for seamless loop */}
             {TICKER_NEWS.map((news, i) => (
              <span key={`dup-${i}`} className="mx-8 text-2xl font-bold uppercase tracking-tight">
                <span className="text-news-red mr-2">●</span> {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};