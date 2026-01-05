import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import { createWellnessChat, sendMessageToChat } from '../services/geminiService';
import { Chat } from '@google/genai';

export const WellnessChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Chat session on mount
    const chat = createWellnessChat();
    setChatSession(chat);

    // Initial greeting
    setMessages([
      {
        id: 'init-1',
        role: 'model',
        text: "Hello. I'm Lavender, your wellness companion. I'm here to listen without judgment. How are you feeling today?",
        timestamp: new Date(),
      }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !chatSession) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToChat(chatSession, userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-3xl shadow-sm border border-purple-50 overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-purple-50 p-4 border-b border-purple-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700">
             <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-purple-900">Lavender</h3>
            <p className="text-xs text-purple-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-100">
          <AlertCircle size={12} />
          <span>Not a medical service</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
              msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-white border border-purple-100 text-purple-600'
            }`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-purple-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-purple-50 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-white border border-purple-100 text-purple-600 flex items-center justify-center">
               <Bot size={16} />
             </div>
             <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-purple-50 shadow-sm">
               <div className="flex gap-1">
                 <span className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                 <span className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                 <span className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-purple-50">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share what's on your mind..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-purple-300 transition-colors shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};