export interface StepOption {
  value: string;
  label: string;
  description: string | null;
}

export interface StepRecommendationItem {
  cocktailId: number;
  cocktailName: string;
  cocktailNameKo: string;
  cocktailImgUrl: string;
  alcoholStrength: string;
}

export interface StepRecommendation {
  currentStep: number;
  stepTitle: string;
  options: StepOption[];
  recommendations?: StepRecommendationItem[];
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  userId?: string;
  message: string;
  sender: 'USER' | 'CHATBOT';
  type?: string; // optional, 기본 text
  stepData?: StepRecommendation | null;
  createdAt: string; // timestamp
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
