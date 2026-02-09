import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface FormData {
  name: string;
  email: string;
  phone?: string;
  creditChallenge?: string;
  creditScore?: string;
  message?: string;
  source?: string;
}

interface ChatBotProps {
  formData: FormData;
}

const INACTIVITY_WARNING_MS = 90_000; // 1:30
const INACTIVITY_END_MS = 120_000;    // 2:00

const ChatBot: React.FC<ChatBotProps> = ({ formData }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Send summary email and redirect
  const endConsultation = useCallback(
    async (reason: 'inactivity' | 'manual') => {
      if (isEnded) return;
      setIsEnded(true);
      clearTimers();

      try {
        await fetch('/.netlify/functions/chat-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formData,
            transcript: messages,
            endReason: reason,
          }),
        });
      } catch (err) {
        console.error('Failed to send summary:', err);
      }

      setTimeout(() => {
        navigate('/merci');
      }, 3000);
    },
    [formData, messages, isEnded, navigate]
  );

  // Clear all timers
  const clearTimers = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
  };

  // Reset inactivity timers
  const resetInactivityTimer = useCallback(() => {
    clearTimers();
    setShowWarning(false);

    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
    }, INACTIVITY_WARNING_MS);

    inactivityTimerRef.current = setTimeout(() => {
      endConsultation('inactivity');
    }, INACTIVITY_END_MS);
  }, [endConsultation]);

  // Initial greeting on mount
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const fetchGreeting = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [], formData }),
        });
        const data = await response.json();
        if (data.reply) {
          setMessages([{ role: 'assistant', content: data.reply }]);
        }
      } catch (err) {
        console.error('Failed to get greeting:', err);
        setMessages([
          {
            role: 'assistant',
            content:
              'Bienvenue! Je suis votre conseiller en crédit. Comment puis-je vous aider aujourd\'hui?',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGreeting();
  }, [formData]);

  // Start inactivity timer after first AI message
  useEffect(() => {
    if (messages.length > 0 && !isEnded) {
      resetInactivityTimer();
    }
    return () => clearTimers();
  }, [messages, isEnded, resetInactivityTimer]);

  // Send a user message
  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isLoading || isEnded) return;

    setShowWarning(false);
    const userMessage: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, formData }),
      });
      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Désolé, une erreur est survenue. Pouvez-vous reformuler votre question?',
        },
      ]);
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
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            {msg.role === 'assistant' ? (
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center">
                <span className="text-white text-xs font-bold">IA</span>
              </div>
            ) : (
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {formData.name?.charAt(0)?.toUpperCase() || 'V'}
                </span>
              </div>
            )}

            {/* Message bubble */}
            <div
              className={`max-w-[75%] ${
                msg.role === 'user'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
              } px-5 py-3.5 rounded-2xl`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center">
              <span className="text-white text-xs font-bold">IA</span>
            </div>
            <div className="bg-white border border-gray-200 shadow-sm px-5 py-3.5 rounded-2xl">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Inactivity warning */}
        {showWarning && !isEnded && (
          <div className="text-center">
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 inline-block px-4 py-2 rounded-lg">
              Êtes-vous toujours là? La consultation se terminera bientôt par inactivité.
            </p>
          </div>
        )}

        {/* End message */}
        {isEnded && (
          <div className="text-center">
            <p className="text-sm text-gray-500 bg-gray-50 border border-gray-200 inline-block px-4 py-2 rounded-lg">
              La consultation est terminée. Redirection en cours...
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || isEnded}
            placeholder={isEnded ? 'Consultation terminée' : 'Écrivez votre message...'}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 disabled:bg-gray-50 text-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || isEnded || !inputValue.trim()}
            className="px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>

        {/* End consultation button */}
        {!isEnded && messages.length > 0 && (
          <button
            onClick={() => endConsultation('manual')}
            className="mt-3 w-full text-xs text-gray-400 hover:text-red-600 transition-colors py-2 tracking-wide uppercase"
          >
            Terminer la consultation
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
