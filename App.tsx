import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { IntroSlide } from './components/IntroSlide';
import { ScoreboardSlide } from './components/ScoreboardSlide';
import { PivotTableSlide } from './components/PivotTableSlide';
import { FlashNewsSlide } from './components/FlashNewsSlide';
import { MADRASAS_INITIAL, TABLES_DATA, URGENT_FLASH_NEWS } from './constants';
import { AnimatePresence, motion } from 'framer-motion';

// Configure durations for each slide in milliseconds
const DURATIONS = {
    INTRO: 5000,
    SCOREBOARD: 10000,
    TABLE: 20000, // Increased to allow time for auto-scrolling columns
    FLASH: 6000
};

const App: React.FC = () => {
  const [viewIndex, setViewIndex] = useState(0);
  // Simulating live data with state
  const [madrasas, setMadrasas] = useState(MADRASAS_INITIAL);
  const flashNewsContent = URGENT_FLASH_NEWS;

  // Construct the sequence of views
  // 0: Intro
  // 1: Scoreboard
  // 2-6: Tables 1-5
  // 7: Flash News (Conditional)
  const views = useMemo(() => {
    const sequence = [
        { type: 'INTRO' },
        { type: 'SCOREBOARD' },
        ...TABLES_DATA.map((data, index) => ({ type: 'TABLE', data, index: index + 1 })),
    ];
    
    if (flashNewsContent) {
        sequence.push({ type: 'FLASH' });
    }
    return sequence;
  }, [flashNewsContent]);

  useEffect(() => {
    const currentViewConfig = views[viewIndex];
    
    let duration = 5000;
    if (currentViewConfig.type === 'INTRO') duration = DURATIONS.INTRO;
    else if (currentViewConfig.type === 'SCOREBOARD') duration = DURATIONS.SCOREBOARD;
    else if (currentViewConfig.type === 'TABLE') duration = DURATIONS.TABLE;
    else if (currentViewConfig.type === 'FLASH') duration = DURATIONS.FLASH;

    const timer = setTimeout(() => {
      setViewIndex((prev) => (prev + 1) % views.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [viewIndex, views]);

  // Simulate score updates randomly to demonstrate reordering
  useEffect(() => {
    const interval = setInterval(() => {
        setMadrasas(current => {
            // Pick a random madrasa and add points
            const newScores = [...current];
            const randomIndex = Math.floor(Math.random() * newScores.length);
            newScores[randomIndex] = {
                ...newScores[randomIndex],
                score: newScores[randomIndex].score + Math.floor(Math.random() * 5)
            };
            return newScores;
        });
    }, 4000); // Update scores occasionally
    return () => clearInterval(interval);
  }, []);

  const currentView = views[viewIndex];

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
            key={viewIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-grow flex flex-col h-full w-full"
        >
            {currentView.type === 'INTRO' && <IntroSlide />}
            {currentView.type === 'SCOREBOARD' && <ScoreboardSlide madrasas={madrasas} />}
            {currentView.type === 'TABLE' && (
                // @ts-ignore - dynamic type check safe
                <PivotTableSlide data={currentView.data} pageIndex={currentView.index} />
            )}
            {currentView.type === 'FLASH' && <FlashNewsSlide content={flashNewsContent} />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default App;