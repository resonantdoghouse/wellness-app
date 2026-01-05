import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Square,
  Settings,
  ChevronDown,
  ChevronUp,
  Wind,
  User,
} from "lucide-react";
import { useDocumentTitle } from "../src/hooks/useDocumentTitle";

// --- Types ---

type BreathingPhase = "ready" | "inhale" | "hold" | "exhale";

interface BreathingPattern {
  id: string;
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  description: string;
}

// --- Constants ---

const PRESETS: BreathingPattern[] = [
  {
    id: "4-7-8",
    name: "Relax",
    inhale: 4,
    hold: 7,
    exhale: 8,
    description: "Classic 4-7-8 technique for deep relaxation and sleep.",
  },
  {
    id: "4-4-7",
    name: "Calm",
    inhale: 4,
    hold: 4,
    exhale: 7,
    description: "Gentle nervous system regulation for anxiety.",
  },
  {
    id: "box",
    name: "Box",
    inhale: 4,
    hold: 4,
    exhale: 4,
    description: "Navy SEAL technique for focus and stress relief.",
  },
  {
    id: "balance",
    name: "Balance",
    inhale: 5,
    hold: 5,
    exhale: 5,
    description: "Coherent breathing to equalize energy.",
  },
];

const LIMITS = {
  inhale: { min: 2, max: 10 },
  hold: { min: 0, max: 30 },
  exhale: { min: 2, max: 20 },
};

// --- Helper Components ---

const SettingsButton: React.FC<{
  onClick: () => void;
  activePatternName: string;
}> = ({ onClick, activePatternName }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 text-white shadow-sm hover:shadow-md"
  >
    <Settings
      size={14}
      className="group-hover:rotate-45 transition-transform duration-500"
    />
    <span className="text-sm font-medium tracking-wide">
      {activePatternName}
    </span>
  </button>
);

const IconButton: React.FC<{
  onClick: () => void;
  icon: React.ElementType;
  disabled?: boolean;
}> = ({ onClick, icon: Icon, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-1 rounded-full border transition-all duration-200 ${
      disabled
        ? "border-slate-200 text-slate-300 cursor-not-allowed dark:border-slate-700 dark:text-slate-600"
        : "bg-white border-slate-200 text-slate-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-purple-300"
    }`}
  >
    <Icon size={14} />
  </button>
);

// --- Main Component ---

export const BreathingTool: React.FC = () => {
  useDocumentTitle("Breathing Tool");
  // State
  const [phase, setPhase] = useState<BreathingPhase>("ready");
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Pattern State
  const [selectedPatternId, setSelectedPatternId] = useState<string>("4-4-7");
  const [customPattern, setCustomPattern] = useState<BreathingPattern>({
    id: "custom",
    name: "Custom",
    inhale: 4,
    hold: 4,
    exhale: 4,
    description: "Your personal rhythm.",
  });

  // Derived State
  const activePattern =
    selectedPatternId === "custom"
      ? customPattern
      : PRESETS.find((p) => p.id === selectedPatternId) || PRESETS[0];

  const containerRef = useRef<HTMLDivElement>(null);

  // Timers
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (phase !== "ready") {
      timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [phase]);

  // Phase Logic
  useEffect(() => {
    if (phase === "ready") return;

    let timeout: ReturnType<typeof setTimeout>;

    // Note: The logic here sets up the transition TO the NEXT phase
    // The current phase duration is handled by the PREVIOUS useEffect's setup

    if (phase === "inhale") {
      timeout = setTimeout(() => {
        if (activePattern.hold > 0) {
          setPhase("hold");
          setTimeLeft(activePattern.hold);
        } else {
          setPhase("exhale");
          setTimeLeft(activePattern.exhale);
        }
      }, activePattern.inhale * 1000);
    } else if (phase === "hold") {
      timeout = setTimeout(() => {
        setPhase("exhale");
        setTimeLeft(activePattern.exhale);
      }, activePattern.hold * 1000);
    } else if (phase === "exhale") {
      timeout = setTimeout(() => {
        setPhase("inhale");
        setTimeLeft(activePattern.inhale);
        setCycleCount((c) => c + 1);
      }, activePattern.exhale * 1000);
    }

    return () => clearTimeout(timeout);
  }, [phase, activePattern]);

  // Handlers
  const startBreathing = () => {
    setCycleCount(1);
    setPhase("inhale");
    setTimeLeft(activePattern.inhale);
    setShowSettings(false);
  };

  const stopBreathing = () => {
    setPhase("ready");
    setTimeLeft(0);
    setCycleCount(0);
  };

  const updateCustomValue = (
    field: "inhale" | "hold" | "exhale",
    delta: number
  ) => {
    setCustomPattern((prev) => ({
      ...prev,
      [field]: Math.min(
        LIMITS[field].max,
        Math.max(LIMITS[field].min, prev[field] + delta)
      ),
    }));
    setSelectedPatternId("custom");
  };

  // --- Visual & Atmospheric Helpers ---

  // Get background gradient based on phase
  const getAtmosphere = () => {
    switch (phase) {
      case "inhale":
        return "bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-slate-900 dark:to-cyan-950";
      case "hold":
        return "bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-indigo-950";
      case "exhale":
        return "bg-gradient-to-br from-fuchsia-50 to-rose-100 dark:from-slate-900 dark:to-purple-950";
      default: // ready
        return "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900";
    }
  };

  const getInstruction = () => {
    switch (phase) {
      case "ready":
        return "Ready to breathe?";
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
    }
  };

  const getSubText = () => {
    switch (phase) {
      case "ready":
        return activePattern.description;
      case "inhale":
        return "Fill your lungs slowly...";
      case "hold":
        return "Relax your shoulders...";
      case "exhale":
        return "Let go of tension...";
    }
  };

  // Animation calculation
  const getCircleStyles = () => {
    const duration =
      phase === "inhale"
        ? activePattern.inhale
        : phase === "exhale"
        ? activePattern.exhale
        : 0; // Hold is static or subtle pulse handled by CSS animation

    const scale = phase === "inhale" || phase === "hold" ? 1.5 : 1.0;

    return {
      transition: `transform ${duration}s cubic-bezier(0.4, 0.0, 0.2, 1)`,
      transform: `scale(${scale})`,
    };
  };

  // Ring colors
  const getRingColor = (opacity: number) => {
    // Adjust colors based on phase if desired, or keep a nice neutral/calm one
    if (phase === "hold") return `rgba(167, 139, 250, ${opacity})`; // Violet for hold
    if (phase === "inhale") return `rgba(56, 189, 248, ${opacity})`; // Sky blue for inhale
    if (phase === "exhale") return `rgba(232, 121, 249, ${opacity})`; // Pink/Purple for exhale
    return `rgba(148, 163, 184, ${opacity})`; // Slate for ready
  };

  return (
    <div
      className={`relative h-full w-full overflow-hidden flex flex-col items-center justify-between transition-colors duration-[2000ms] ease-in-out ${getAtmosphere()}`}
      ref={containerRef}
    >
      {/* Background Ambience (Optional: Add floating particles or subtle overlay here) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>

      {/* --- Top Bar: Presets & Controls --- */}
      <div className="z-20 w-full p-4 flex justify-center items-center relative">
        <div
          className={`transition-all duration-500 ${
            phase !== "ready"
              ? "opacity-0 -translate-y-4 pointer-events-none"
              : "opacity-100"
          }`}
        >
          <SettingsButton
            onClick={() => setShowSettings(true)}
            activePatternName={activePattern.name}
          />
        </div>
      </div>

      {/* --- Settings Modal --- */}
      {showSettings && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700 shadow-2xl rounded-3xl w-full max-w-sm overflow-hidden flex flex-col max-h-[80vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <Wind size={20} className="text-purple-500" /> Breathing Method
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-5 space-y-4">
              {/* Presets Grid */}
              <div className="grid grid-cols-1 gap-3">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatternId(p.id)}
                    className={`relative p-4 rounded-2xl text-left transition-all duration-200 border-2 group ${
                      selectedPatternId === p.id
                        ? "bg-purple-50 border-purple-500 dark:bg-purple-900/20 dark:border-purple-500"
                        : "bg-slate-50 border-transparent hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span
                        className={`font-bold ${
                          selectedPatternId === p.id
                            ? "text-purple-700 dark:text-purple-300"
                            : "text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        {p.name}
                      </span>
                      <span className="text-xs font-mono opacity-60">
                        {p.inhale}-{p.hold}-{p.exhale}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {p.description}
                    </p>
                  </button>
                ))}

                {/* Custom Option */}
                <button
                  onClick={() => setSelectedPatternId("custom")}
                  className={`relative p-4 rounded-2xl text-left transition-all duration-200 border-2 ${
                    selectedPatternId === "custom"
                      ? "bg-purple-50 border-purple-500 dark:bg-purple-900/20 dark:border-purple-500"
                      : "bg-slate-50 border-transparent hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1 text-slate-700 dark:text-slate-200">
                    <User size={16} /> Custom Rhythm
                  </div>
                </button>
              </div>

              {/* Custom Controls (Conditional) */}
              {selectedPatternId === "custom" && (
                <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-4 space-y-4 animate-in fade-in slide-in-from-top-4">
                  {(["inhale", "hold", "exhale"] as const).map((step) => (
                    <div
                      key={step}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 w-16">
                        {step}
                      </span>
                      <div className="flex items-center gap-3">
                        <IconButton
                          icon={ChevronDown}
                          onClick={() => updateCustomValue(step, -1)}
                          disabled={customPattern[step] <= LIMITS[step].min}
                        />
                        <span className="w-8 text-center font-mono font-bold text-lg text-slate-700 dark:text-slate-200">
                          {customPattern[step]}s
                        </span>
                        <IconButton
                          icon={ChevronUp}
                          onClick={() => updateCustomValue(step, 1)}
                          disabled={customPattern[step] >= LIMITS[step].max}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <button
                onClick={() => {
                  setShowSettings(false);
                }}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Main Visualizer --- */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full z-10">
        {/* Breathing Circle Group */}
        <div className="relative flex items-center justify-center w-80 h-80">
          {/* Outer Ripples (Echoes) */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-current opacity-20"
              style={{
                borderColor: getRingColor(0.2),
                transform: `scale(${
                  phase === "inhale" || phase === "hold"
                    ? 1.5 + i * 0.1
                    : 1.0 + i * 0.05
                })`,
                transition: `transform ${
                  phase === "inhale"
                    ? activePattern.inhale
                    : activePattern.exhale
                }s cubic-bezier(0.4, 0, 0.2, 1), border-color 1s ease`,
              }}
            />
          ))}

          {/* Core Circle */}
          <div
            className="w-48 h-48 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-sm z-10 relative overflow-hidden"
            style={{
              ...getCircleStyles(),
              backgroundColor: getRingColor(0.15),
              boxShadow: `0 0 60px ${getRingColor(0.2)}`,
            }}
          >
            {/* Inner "Liquid" Fill - height change based on progress could be cool in future, for now standard fill */}
            <div
              className="absolute inset-0 bg-current opacity-20 transition-colors duration-1000"
              style={{ color: getRingColor(1) }}
            />

            {/* Timer Text */}
            <span className="relative z-20 text-4xl font-bold text-slate-700 dark:text-white tabular-nums drop-shadow-sm">
              {phase !== "ready" ? timeLeft : ""}
            </span>
          </div>

          {/* Static ring for reference */}
          <div className="absolute w-48 h-48 rounded-full border-2 border-slate-200 dark:border-slate-700 opacity-20 pointer-events-none" />
        </div>

        {/* Text Instructions */}
        <div className="mt-12 text-center h-24 flex flex-col items-center justify-center px-4">
          <h2
            key={phase} // Animate on change
            className="text-3xl md:text-4xl font-light text-slate-800 dark:text-white mb-2 animate-in fade-in slide-in-from-bottom-2 duration-700"
          >
            {getInstruction()}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium max-w-sm animate-pulse-slow">
            {getSubText()}
          </p>
          {phase !== "ready" && (
            <p className="text-xs text-slate-400 mt-2 font-mono opacity-60">
              Cycle: {cycleCount}
            </p>
          )}
        </div>
      </div>

      {/* --- Footer Controls --- */}
      <div className="z-20 mb-12 sm:mb-16">
        {phase === "ready" ? (
          <button
            onClick={startBreathing}
            className="group relative flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            <Play size={20} className="fill-current" />
            <span>Begin</span>
            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-4 group-hover:ring-white/10 transition-all" />
          </button>
        ) : (
          <button
            onClick={stopBreathing}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <Square size={16} className="fill-current opacity-50" />
            <span>End Session</span>
          </button>
        )}
      </div>
    </div>
  );
};
