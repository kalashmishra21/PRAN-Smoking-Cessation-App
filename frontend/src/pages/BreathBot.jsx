/**
 * BreathBot Page - Full-screen chat interface with PRAN's AI recovery companion
 * Displays sidebar, sticky chat header, scrollable message area, and fixed input footer
 * Fetches real chat history and sends messages to backend API
 * Returns complete page layout with all chat sub-components
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import {
  ChatContainer,
  QuickActions,
  ChatInput
} from '../components/BreathBotComponents';
import { chatAPI } from '../services/api';

let cachedMessages = null;

/**
 * Formats the current time as HH:MM AM/PM string
 * Used to timestamp new messages when they are sent
 * Takes no parameters
 * Returns formatted time string
 */
const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const BreathBot = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const authenticated = isAuthenticated();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(() => cachedMessages || []);
  const [inputValue, setInputValue] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [loading, setLoading] = useState(() => !cachedMessages);

  // Redirect if not authenticated (after auth loading completes)
  useEffect(() => {
    if (!authLoading && !authenticated) {
      navigate('/auth', { replace: true });
    }
  }, [authenticated, authLoading, navigate]);

  // Fetch chat history on mount (only if authenticated)
  useEffect(() => {
    if (!authLoading && authenticated) {
      fetchChatHistory({ background: Boolean(cachedMessages) });
    }
  }, [authLoading, authenticated]);

  /**
   * Fetch chat history from backend
   * Loads previous conversation messages
   */
  const fetchChatHistory = async ({ background = false } = {}) => {
    try {
      if (!background) setLoading(true);
      const response = await chatAPI.getChatHistory();
      
      // Transform backend data to match UI format
      const formattedMessages = response.chat_history.map((msg) => ({
        id: msg._id,
        sender: msg.sender,
        text: msg.message,
        time: formatTime(msg.timestamp),
      }));
      
      setMessages(formattedMessages);
      cachedMessages = formattedMessages;
    } catch (err) {
      console.error('Failed to fetch chat history:', err);
      // Start with welcome message if no history
      const fallbackMessages = [
        {
          id: 1,
          sender: 'bot',
          text: "Hello! I'm BreathBot, your recovery companion. Quitting is a journey of a thousand breaths, and I'm here for every single one. How are you feeling right now?",
          time: getCurrentTime(),
        }
      ];
      setMessages(fallbackMessages);
      cachedMessages = fallbackMessages;
    } finally {
      if (!background) setLoading(false);
    }
  };

  /**
   * Format timestamp to readable time string
   */
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Sends a new user message and gets bot reply from backend
   * Adds user message immediately, then fetches bot reply from API
   * Takes optional text override (for quick action buttons)
   * Returns void
   */
  const handleSend = async (textOverride) => {
    const text = textOverride || inputValue.trim();
    if (!text || isBotTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsBotTyping(true);

    try {
      // Send message to backend and get bot response
      const response = await chatAPI.sendMessage(text);
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.bot_response.message,
        time: formatTime(response.bot_response.timestamp),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Failed to send message:', err);
      
      // Fallback response on error
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: "I'm having trouble connecting right now. Please try again in a moment. 🔄",
        time: getCurrentTime(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  /**
   * Handles quick action button selection
   * Sends the selected action label as a user message
   * Takes action string as parameter
   * Returns void
   */
  const handleQuickAction = (action) => {
    handleSend(action);
  };

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex">
        <Sidebar activeMenu="breathbot" />
        <div className="md:ml-64 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-on-surface-variant">Loading chat...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex">
      {/* Reused Sidebar with breathbot active */}
      <Sidebar activeMenu="breathbot" />

      {/* Main chat canvas — full height flex column */}
      <div className="md:ml-64 flex-1 flex flex-col min-h-screen">

        {/* Sticky Chat Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 backdrop-blur-md flex justify-between items-center h-20 px-8 border-b border-slate-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Bot avatar icon */}
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center text-[#2D5AEE] dark:text-blue-400 border border-blue-100 dark:border-blue-800">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                robot_2
              </span>
            </div>
            {/* Bot name + status */}
            <div>
              <h2 className="font-bold text-on-surface dark:text-gray-100 text-base font-h3">BreathBot</h2>
              <p className="text-xs text-secondary dark:text-green-400 font-label-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary dark:bg-green-400 inline-block" />
                Always here to listen
              </p>
            </div>
          </div>
        </header>

        {/* Scrollable chat messages area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <ChatContainer messages={messages} />

          {/* Bot typing indicator */}
          {isBotTyping && (
            <div className="px-6 pb-2 max-w-4xl mx-auto w-full">
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-800">
                  <span className="material-symbols-outlined text-[#2D5AEE] dark:text-blue-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    robot_2
                  </span>
                </div>
                <div
                  className="px-5 py-4 rounded-2xl rounded-tl-none border border-blue-100 dark:border-blue-800 flex items-center gap-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2D5AEE] dark:bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#2D5AEE] dark:bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#2D5AEE] dark:bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fixed footer: quick actions + input */}
        <footer className="bg-white dark:bg-gray-900 backdrop-blur-xl px-6 py-5 border-t border-slate-100 dark:border-gray-700">
          <div className="max-w-4xl mx-auto flex flex-col gap-3">
            {/* Quick reply buttons */}
            <QuickActions onSelect={handleQuickAction} />

            {/* Text input + send */}
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={() => handleSend()}
            />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BreathBot;
