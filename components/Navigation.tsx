import React from "react";
import { Link } from "react-router-dom";
import { Home, Wind, Timer, Heart } from "lucide-react";
import { AppRoute } from "../types";

interface NavigationProps {
  currentRoute: AppRoute;
}

const navItems = [
  { id: AppRoute.HOME, label: "Home", icon: Home },
  { id: AppRoute.BREATHE, label: "Breathe", icon: Wind },
  { id: AppRoute.MEDITATE, label: "Meditate", icon: Timer },
  { id: AppRoute.EMOTIONS, label: "Emotions", icon: Heart },
];

export const Navigation: React.FC<NavigationProps> = ({ currentRoute }) => {
  return (
    <>
      {/* Mobile Navigation - Hidden on large screens */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zen-dark-card border-t border-purple-100 dark:border-slate-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex justify-between items-center transition-colors duration-300">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.id}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentRoute === item.id
                ? "text-purple-600 dark:text-purple-400"
                : "text-slate-400 dark:text-slate-500 hover:text-purple-400 dark:hover:text-purple-300"
            }`}
          >
            <item.icon
              size={24}
              strokeWidth={currentRoute === item.id ? 2.5 : 2}
            />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Desktop Sidebar - Hidden on small screens */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 bg-white dark:bg-zen-dark-card h-screen sticky top-0 border-r border-purple-50 dark:border-slate-800 shadow-sm flex-col z-40 transition-colors duration-300 overflow-y-auto">
        <div className="p-8 pb-4">
          <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-300 tracking-tight flex items-center gap-2">
            <span className="text-3xl">🪷</span> ZenWell
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 pl-1">
            Find your calm
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                currentRoute === item.id
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-300"
              }`}
            >
              <item.icon
                size={20}
                className={`transition-transform group-hover:scale-110 ${
                  currentRoute === item.id
                    ? "text-purple-600 dark:text-purple-400"
                    : ""
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <div className="bg-gradient-to-br from-purple-100 to-white dark:from-slate-800 dark:to-slate-900 p-4 rounded-xl border border-purple-100 dark:border-slate-700 shadow-sm">
            <p className="text-xs font-semibold text-purple-800 dark:text-purple-300 uppercase tracking-wider mb-2">
              Daily Reminder
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic">
              "Peace comes from within. Do not seek it without."
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
