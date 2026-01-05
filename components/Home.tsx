import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../types";
import { Wind, Timer, Heart } from "lucide-react";
import { useDocumentTitle } from "../src/hooks/useDocumentTitle";

const QUOTES = [
  "The best time for new beginnings is now.",
  "Breathe. Let go directly. Remind yourself that this very moment is the only one you know you have for sure.",
  "You don’t have to control your thoughts. You just have to stop letting them control you.",
  "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
  "Peace comes from within. Do not seek it without.",
  "Wherever you go, go with all your heart.",
  "What you think, you become.",
  "Realize deeply that the present moment is all you have.",
  "To understand the immeasurable, the mind must be extraordinarily quiet, still.",
  "Happiness is not something ready made. It comes from your own actions.",
  "Walk as if you are kissing the Earth with your feet.",
  "Smile, breathe and go slowly.",
  "The only way out is through.",
  "Nothing can bring you peace but yourself.",
  "With every breath, I release the anxiety that no longer serves me.",
  "Your calm mind is the ultimate weapon against your challenges.",
  "Nature does not hurry, yet everything is accomplished.",
  "Quiet the mind, and the soul will speak.",
  "Don't believe everything you think.",
  "You are enough just as you are.",
  "Inhale the future, exhale the past.",
  "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
  "Just for today, I will not worry.",
  "Let it be.",
  "Act as if what you do makes a difference. It does.",
];

export const Home: React.FC = () => {
  useDocumentTitle("Home");
  const [quote, setQuote] = useState("");

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const dateDisplay = new Date().toLocaleDateString("en-US", dateOptions);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("wellness_daily_date");
    const storedQuote = localStorage.getItem("wellness_daily_quote");

    if (storedDate === today && storedQuote) {
      setQuote(storedQuote);
    } else {
      // Pick a random quote
      const randomIndex = Math.floor(Math.random() * QUOTES.length);
      const newQuote = QUOTES[randomIndex];

      localStorage.setItem("wellness_daily_date", today);
      localStorage.setItem("wellness_daily_quote", newQuote);
      setQuote(newQuote);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fade-in text-slate-700 dark:text-slate-200">
      <header className="mb-10 mt-4">
        <p className="text-purple-600 dark:text-purple-400 font-medium mb-1">
          {dateDisplay}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Good Morning,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">
            Friend
          </span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
          Take a moment for yourself today. What does your mind and body need
          right now?
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main CTA */}
        <Link
          to={AppRoute.BREATHE}
          className="col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 rounded-3xl p-8 text-white shadow-lg cursor-pointer transform transition-transform hover:scale-[1.01] flex flex-col justify-between min-h-[240px] block"
        >
          <div>
            <div className="bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm">
              Recommended
            </div>
            <h3 className="text-3xl font-bold mb-2">Feeling Overwhelmed?</h3>
            <p className="text-purple-100 text-lg max-w-md">
              Try the 4-7-8 breathing technique to quickly lower your heart rate
              and center your mind.
            </p>
          </div>
          <div className="flex items-center gap-2 font-semibold mt-6">
            <Wind /> Start Breathing Exercise
          </div>
        </Link>

        {/* Quick Access Card - Meditate */}
        <Link
          to={AppRoute.MEDITATE}
          className="bg-white dark:bg-zen-dark-card rounded-3xl p-6 shadow-sm border border-purple-50 dark:border-slate-800 cursor-pointer hover:shadow-md transition-all group block"
        >
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Timer size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Timer
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Set a timer for your daily meditation practice.
          </p>
        </Link>

        {/* Quick Access Card - Emotions */}
        <Link
          to={AppRoute.EMOTIONS}
          className="bg-white dark:bg-zen-dark-card rounded-3xl p-6 shadow-sm border border-purple-50 dark:border-slate-800 cursor-pointer hover:shadow-md transition-all group block"
        >
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Heart size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Identify Feelings
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Use the emotion wheel to understand what you're feeling.
          </p>
        </Link>
      </div>

      {/* Quote Section */}
      <div className="mt-12 bg-purple-50 dark:bg-slate-800/50 rounded-2xl p-8 text-center border border-purple-100 dark:border-slate-700 transition-all hover:shadow-md">
        <p className="font-serif text-2xl text-purple-800 dark:text-purple-300 italic leading-relaxed">
          "{quote}"
        </p>
        <p className="text-xs text-purple-400 dark:text-purple-500 mt-4 uppercase tracking-widest font-semibold">
          Daily Reminder
        </p>
      </div>
    </div>
  );
};
