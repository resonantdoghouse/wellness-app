import React, { useState } from "react";
import { EmotionCategory, EmotionData } from "../types";
import { ArrowLeft } from "lucide-react";
import { useDocumentTitle } from "../src/hooks/useDocumentTitle";

const emotionsData: EmotionData[] = [
  {
    category: EmotionCategory.JOY,
    color: "bg-yellow-200 hover:bg-yellow-300 text-yellow-800",
    subEmotions: [
      { name: "Excited", definition: "Feeling very enthusiastic and eager." },
      {
        name: "Grateful",
        definition: "Feeling or showing an appreciation of kindness.",
      },
      { name: "Peaceful", definition: "Free from disturbance; tranquil." },
      {
        name: "Proud",
        definition:
          "Feeling deep pleasure or satisfaction as a result of one's own achievements.",
      },
      {
        name: "Optimistic",
        definition: "Hopeful and confident about the future.",
      },
      {
        name: "Playful",
        definition: "Fond of games and amusement; lighthearted.",
      },
    ],
  },
  {
    category: EmotionCategory.SADNESS,
    color: "bg-blue-200 hover:bg-blue-300 text-blue-800",
    subEmotions: [
      {
        name: "Lonely",
        definition: "Sad because one has no friends or company.",
      },
      {
        name: "Depressed",
        definition: "In a state of general unhappiness or despondency.",
      },
      {
        name: "Guilty",
        definition:
          "A feeling of having done wrong or failed in an obligation.",
      },
      {
        name: "Disappointed",
        definition:
          "Sad or displeased because someone or something has failed to fulfill one's hopes.",
      },
      {
        name: "Hurt",
        definition: "Distress or offense caused by another person.",
      },
    ],
  },
  {
    category: EmotionCategory.ANGER,
    color: "bg-red-200 hover:bg-red-300 text-red-800",
    subEmotions: [
      {
        name: "Frustrated",
        definition: "Feeling or expressing distress and annoyance.",
      },
      { name: "Annoyed", definition: "Slightly angry; irritated." },
      {
        name: "Defensive",
        definition: "Very anxious to challenge or avoid criticism.",
      },
      { name: "Furious", definition: "Extremely angry." },
      {
        name: "Jealous",
        definition: "Feeling or showing envy of someone or their achievements.",
      },
    ],
  },
  {
    category: EmotionCategory.FEAR,
    color: "bg-purple-200 hover:bg-purple-300 text-purple-800",
    subEmotions: [
      {
        name: "Anxious",
        definition: "Experiencing worry, unease, or nervousness.",
      },
      {
        name: "Insecure",
        definition: "Not confident or assured; uncertain and anxious.",
      },
      {
        name: "Overwhelmed",
        definition: "Buried or drowned beneath a huge mass.",
      },
      { name: "Scared", definition: "Fearful; frightened." },
    ],
  },
  {
    category: EmotionCategory.SURPRISE,
    color: "bg-orange-200 hover:bg-orange-300 text-orange-800",
    subEmotions: [
      { name: "Confused", definition: "Unable to think clearly; bewildered." },
      { name: "Amazed", definition: "Greatly surprised; astonished." },
      { name: "Shocked", definition: "Caused to feel surprised and upset." },
    ],
  },
  {
    category: EmotionCategory.DISGUST,
    color: "bg-green-200 hover:bg-green-300 text-green-800",
    subEmotions: [
      {
        name: "Disapproving",
        definition: "Possessing or displaying a lack of approval.",
      },
      {
        name: "Disappointed",
        definition:
          "Displeased because someone has failed to fulfill one's hopes.",
      },
      { name: "Awful", definition: "Very bad or unpleasant." },
    ],
  },
];

export const EmotionSelector: React.FC = () => {
  useDocumentTitle("Emotion Selector");
  const [selectedCategory, setSelectedCategory] = useState<EmotionData | null>(
    null
  );
  const [selectedSubEmotion, setSelectedSubEmotion] = useState<string | null>(
    null
  );

  const handleCategoryClick = (emotion: EmotionData) => {
    setSelectedCategory(emotion);
    setSelectedSubEmotion(null);
  };

  const resetSelection = () => {
    setSelectedCategory(null);
    setSelectedSubEmotion(null);
  };

  return (
    <div className="h-full p-6 animate-fade-in flex flex-col items-center text-slate-700 dark:text-slate-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-300 mb-2">
          Emotion Explorer
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Naming your feelings is the first step to processing them. How are you
          feeling right now?
        </p>
      </div>

      <div className="w-full max-w-3xl min-h-[400px] flex flex-col items-center justify-center relative">
        {selectedCategory && (
          <button
            onClick={resetSelection}
            className="absolute top-0 left-0 flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Categories
          </button>
        )}

        {!selectedCategory ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full mt-8">
            {emotionsData.map((emotion) => (
              <button
                key={emotion.category}
                onClick={() => handleCategoryClick(emotion)}
                className={`${emotion.color} h-32 rounded-2xl text-xl font-bold shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center border border-transparent dark:border-white/10`}
              >
                {emotion.category}
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full mt-12 animate-fade-in">
            <h3
              className={`text-2xl font-bold mb-6 text-center px-4 py-2 rounded-lg inline-block mx-auto ${
                selectedCategory.color.split(" ")[0]
              } bg-opacity-20`}
            >
              {selectedCategory.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCategory.subEmotions.map((sub) => (
                <div
                  key={sub.name}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedSubEmotion === sub.name
                      ? "border-purple-400 bg-purple-50 dark:bg-purple-900/30"
                      : "border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-500 bg-white dark:bg-slate-800"
                  }`}
                  onClick={() => setSelectedSubEmotion(sub.name)}
                >
                  <div className="font-bold text-lg text-slate-800 dark:text-slate-200">
                    {sub.name}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {sub.definition}
                  </div>
                </div>
              ))}
            </div>
            {selectedSubEmotion && (
              <div className="mt-8 p-6 bg-purple-50 dark:bg-slate-800/50 rounded-2xl border border-purple-100 dark:border-slate-700 text-center animate-fade-in">
                <p className="text-purple-900 dark:text-purple-200 font-medium">
                  It's okay to feel{" "}
                  <span className="font-bold">
                    {selectedSubEmotion.toLowerCase()}
                  </span>
                  . Acknowledging this emotion allows it to pass through you
                  like a wave.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
