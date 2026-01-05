import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

import forestSound from "../src/assets/sounds/forest-ambience.mp3";
import rainSound from "../src/assets/sounds/rain.ogg";
import wavesSound from "../src/assets/sounds/waves.ogg";

import forestBg from "../src/assets/images/meditation-forest.jpg";
import rainBg from "../src/assets/images/meditation-rain.jpg";
import wavesBg from "../src/assets/images/meditation-waves.jpg";

const SOUNDS = {
  forest: forestSound,
  rain: rainSound,
  waves: wavesSound,
};

const BACKGROUNDS = {
  forest: forestBg,
  rain: rainBg,
  waves: wavesBg,
};

export const MeditationTimer: React.FC = () => {
  const [duration, setDuration] = useState(10 * 60); // Default 10 mins
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [isActive, setIsActive] = useState(false);
  const [backgroundType, setBackgroundType] = useState<
    "forest" | "rain" | "waves"
  >("forest");
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Audio Source Management
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = SOUNDS[backgroundType];
      audioRef.current.load();

      // Resume if it was playing or if timer is active (and we just switched tracks)
      if (isActive && !isMuted) {
        audioRef.current
          .play()
          .catch((e) => console.warn("Audio playback failed:", e));
      }
    }
  }, [backgroundType]);

  // Audio Play/Pause Management
  useEffect(() => {
    if (!audioRef.current) return;

    if (isActive && !isMuted) {
      audioRef.current
        .play()
        .catch((e) => console.warn("Audio playback failed:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isActive, isMuted]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const handleDurationChange = (minutes: number) => {
    setDuration(minutes * 60);
    setTimeLeft(minutes * 60);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="h-full flex flex-col items-center p-6 animate-fade-in max-w-4xl mx-auto w-full text-slate-700 dark:text-slate-200">
      <div className="w-full text-center mb-6">
        <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-300 mb-2">
          Meditation Timer
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Set your intention and focus on the present moment.
        </p>
      </div>

      <div className="relative w-full aspect-video max-h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8 group bg-slate-200 dark:bg-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform group-hover:scale-105"
          style={{ backgroundImage: `url(${BACKGROUNDS[backgroundType]})` }}
        ></div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} loop />

        {/* Volume Control */}
        <button
          onClick={toggleMute}
          className="absolute top-6 right-6 p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white/90 transition-all border border-white/10"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="text-7xl font-light tracking-widest font-mono mb-10 drop-shadow-lg select-none">
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={toggleTimer}
              className="w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 border border-white/40 shadow-lg"
            >
              {isActive ? (
                <Pause size={36} fill="white" />
              ) : (
                <Play size={36} className="ml-2" fill="white" />
              )}
            </button>
            <button
              onClick={resetTimer}
              className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 border border-white/20 shadow-md"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>

        {/* Ambient Selectors */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
          {["forest", "rain", "waves"].map((type) => (
            <button
              key={type}
              onClick={() => setBackgroundType(type as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide backdrop-blur-md transition-all border ${
                backgroundType === type
                  ? "bg-white/90 text-purple-900 border-white shadow-lg transform -translate-y-1"
                  : "bg-black/30 text-white/90 border-transparent hover:bg-black/50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full max-w-md">
        {[5, 10, 20, 30].map((min) => (
          <button
            key={min}
            onClick={() => handleDurationChange(min)}
            className={`py-3 rounded-xl text-sm font-semibold transition-all ${
              duration === min * 60
                ? "bg-purple-600 text-white shadow-lg ring-2 ring-purple-200 dark:ring-purple-900 ring-offset-2 dark:ring-offset-slate-900"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 border border-purple-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-500"
            }`}
          >
            {min} min
          </button>
        ))}
      </div>
    </div>
  );
};
