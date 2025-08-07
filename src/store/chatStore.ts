import { create } from 'zustand';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  
  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
  
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
  
  clearMessages: () => {
    set({ messages: [] });
  },
}));