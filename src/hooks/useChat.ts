import { useState, useCallback } from 'react';
import { Message } from '../types';
import { getCurrentTimestamp, generateUniqueId } from '../utils';
import { MESSAGE_DELAY } from '../constants';

interface UseChatProps {
  initialMessages: Message[];
  chatId: string;
}

interface UseChatReturn {
  messages: Message[];
  message: string;
  isTyping: boolean;
  setMessage: (text: string) => void;
  sendMessage: () => void;
}

export const useChat = ({ initialMessages, chatId }: UseChatProps): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(() => {
    if (message.trim()) {
      const newMsg: Message = {
        id: generateUniqueId(),
        text: message.trim(),
        senderId: 'user',
        timestamp: getCurrentTimestamp(),
        isRead: true,
      };
      
      setMessages(prev => [...prev, newMsg]);
      setMessage('');
      
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          const response: Message = {
            id: generateUniqueId(),
            text: "Thanks for your message! This is a demo response.",
            senderId: chatId,
            timestamp: getCurrentTimestamp(),
            isRead: true,
          };
          setMessages(prev => [...prev, response]);
        }, MESSAGE_DELAY.response + Math.random() * 1000);
      }, MESSAGE_DELAY.typing);
    }
  }, [message, chatId]);

  return {
    messages,
    message,
    isTyping,
    setMessage,
    sendMessage,
  };
};