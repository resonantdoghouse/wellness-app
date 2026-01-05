import React, { useState, useEffect } from 'react';
import { generateDailyWisdom } from '../services/geminiService';
import { BookOpen, RefreshCw, Sun } from 'lucide-react';

export const DailyWisdom: React.FC = () => {
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState<string>('');

  const fetchWisdom = async (customTopic?: string) => {
    setLoading(true);
    const result = await generateDailyWisdom(customTopic);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchWisdom();
  }, []);

  const topics = ['Reducing Anxiety', 'Better Sleep', 'Self-Compassion', 'Mindfulness', 'Gratitude'];

  return (
    <div className="h-full p-6 animate-fade-in flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-900 mb-2 flex items-center justify-center gap-2">
          <Sun className="text-yellow-500" /> Daily Wisdom
        </h2>
        <p className="text-slate-600">Gentle insights generated just for you.</p>
      </div>

      <div className="w-full max-w-3xl">
        {/* Topic Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => { setTopic(t); fetchWisdom(t); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                topic === t 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-purple-100 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-purple-50 min-h-[300px] relative overflow-hidden">
          {loading ? (
             <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
               <div className="flex flex-col items-center gap-4">
                 <RefreshCw className="animate-spin text-purple-400" size={40} />
                 <p className="text-slate-400 font-medium tracking-wide">Reflecting...</p>
               </div>
             </div>
          ) : (
            <>
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <BookOpen size={100} className="text-purple-900" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-purple-900 mb-6 relative z-10 leading-tight">
                {data?.title}
              </h3>
              <div className="prose prose-purple prose-lg text-slate-600 relative z-10 leading-relaxed">
                {data?.content.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-purple-100 flex justify-between items-center text-sm text-slate-400">
                 <span>AI Generated Content</span>
                 <button 
                   onClick={() => fetchWisdom(topic)}
                   className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                 >
                   <RefreshCw size={14} /> New Insight
                 </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};