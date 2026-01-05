import { Chat } from "@google/genai";

// Gen AI features are currently disabled.
// import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
// declare const process: { env: { API_KEY: string } };
// const apiKey = process.env.API_KEY || '';
// const ai = new GoogleGenAI({ apiKey });

export const createWellnessChat = (): Chat => {
  // Return a mock chat object
  return {} as unknown as Chat;
};

export const generateDailyWisdom = async (_topic?: string): Promise<{ title: string; content: string }> => {
  // Return static content
  return {
    title: "Peaceful Moment",
    content: "AI features are currently paused for maintenance. Take a deep breath and enjoy the quiet moment."
  };
};

export const sendMessageToChat = async (_chat: Chat, _message: string): Promise<string> => {
  // Return static response
  return "Lavender is currently taking a nap. (AI features are temporarily disabled).";
};