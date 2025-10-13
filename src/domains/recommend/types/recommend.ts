import { RefObject } from 'react';

export interface StepOption {
  value: string;
  label: string;
  description: string | null;
}

export interface RecommendationItem {
  cocktailId: number;
  cocktailName?: string;
  cocktailNameKo: string;
  cocktailImgUrl: string;
  alcoholStrength?: string;
}

export interface StepRecommendation {
  currentStep: number;
  stepTitle: string;
  options: StepOption[];
  recommendations?: RecommendationItem[];
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  userId?: string;
  message: string;
  sender: 'USER' | 'CHATBOT';
  type?: string;
  stepData?: StepRecommendation | null;
  createdAt: string;
  tempTyping?: boolean;
}

export interface ChatHistoryItem {
  id: string;
  timestamp: string;
  userId: string;
  message: string;
  sender: 'USER' | 'CHATBOT';
  stepData?: StepRecommendation | null;
}

export interface TextPayload {
  message: string;
  userId: string;
}

export interface stepPayload extends TextPayload {
  currentStep: number;
  selectedAlcoholStrength?: string;
  selectedAlcoholBaseType?: string;
  selectedCocktailType?: string;
}

export interface ChatListProps {
  messages: ChatMessage[];
  userCurrentStep: number;
  onSelectedOption: (value: string) => void;
  isBotTyping?: boolean;
  chatRef?: RefObject<HTMLDivElement | null>;
}
