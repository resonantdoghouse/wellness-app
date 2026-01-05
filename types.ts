export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum EmotionCategory {
  JOY = 'Joy',
  SADNESS = 'Sadness',
  ANGER = 'Anger',
  FEAR = 'Fear',
  SURPRISE = 'Surprise',
  DISGUST = 'Disgust',
}

export interface SubEmotion {
  name: string;
  definition: string;
}

export interface EmotionData {
  category: EmotionCategory;
  color: string;
  subEmotions: SubEmotion[];
}

export interface Article {
  title: string;
  content: string;
  category: string;
}

export enum AppRoute {
  HOME = '/',
  BREATHE = '/breathe',
  MEDITATE = '/meditate',
  EMOTIONS = '/emotions',
}