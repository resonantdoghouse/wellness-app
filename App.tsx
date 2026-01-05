import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { BreathingTool } from "./components/BreathingTool";
import { MeditationTimer } from "./components/MeditationTimer";
import { EmotionSelector } from "./components/EmotionSelector";
import { AppRoute } from "./types";

import { ThemeToggle } from "./components/ThemeToggle";

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-zen-bg dark:bg-zen-dark-bg transition-colors duration-300 font-sans text-slate-700 dark:text-slate-200 flex flex-col lg:flex-row">
      <Navigation currentRoute={location.pathname as AppRoute} />

      <div className="fixed top-4 right-4 z-[100]">
        <ThemeToggle />
      </div>

      <main className="flex-1 transition-all duration-300 pb-44 pt-4 px-4 lg:p-8 lg:pb-8 w-full max-w-[100vw] lg:max-w-none overflow-x-hidden">
        <div className="max-w-6xl mx-auto h-full">
          <Routes>
            <Route path={AppRoute.HOME} element={<Home />} />
            <Route path={AppRoute.BREATHE} element={<BreathingTool />} />
            <Route path={AppRoute.MEDITATE} element={<MeditationTimer />} />
            <Route path={AppRoute.EMOTIONS} element={<EmotionSelector />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
