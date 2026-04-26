/**
 * BreathBot Page - Full-screen chat interface with PRAN's AI recovery companion
 * Displays sidebar, sticky chat header, scrollable message area, and fixed input footer
 * Manages message state with useState; simulates bot replies via setTimeout
 * Returns complete page layout with all chat sub-components
 */
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
  ChatContainer,
  QuickActions,
  ChatInput
} from '../components/BreathBotComponents';

/**
 * Initial static messages shown when the page first loads
 * Contains the opening bot greeting, user reply, and bot follow-up
 * Each message has id, sender, text, and time fields
 * Returns array of 3 message objects
 */
const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Hello! I'm BreathBot, your recovery companion. Quitting is a journey of a thousand breaths, and I'm here for every single one. How are you feeling right now?",
    time: '09:41 AM',
  },
  {
    id: 2,
    sender: 'user',
    text: "I'm feeling a bit restless. It's been about 3 days since my last cigarette and the morning routine is tough.",
    time: '09:42 AM',
  },
  {
    id: 3,
    sender: 'bot',
    text: "Three days is a huge milestone! That's when your nicotine levels have fully left your body—your restlessness is actually your body healing itself.\n\nWhy don't we try a 2-minute \"Box Breathing\" exercise together? It helps reset that morning anxiety.",
    time: '09:42 AM',
  },
];

/**
 * Simulated bot replies for new user messages
 * Cycles through these responses when user sends any message
 * Provides varied, encouraging responses to keep conversation natural
 * Returns array of reply strings
 */
const BOT_REPLIES = [
  "You're doing great. Try a breathing exercise — inhale for 4 counts, hold for 4, exhale for 4. Repeat 3 times. 💙",
  "Every craving lasts only 3–5 minutes. You've already beaten hundreds of them. This one is no different.",
  "Remember why you started. Your lungs are already healing — 72 hours in, your bronchial tubes are relaxing.",
  "Let's try the 5-4-3-2-1 grounding technique: name 5 things you can see, 4 you can touch, 3 you can hear.",
];

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
  /**
   * State for the full list of chat messages
   * Initialized with the 3 static opening messages
   * Updated when user sends a message or bot replies
   * Returns array of message objects
   */
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  /**
   * State for the current text in the chat input field
   * Controlled input value, cleared after each send
   * Takes string value from input onChange
   * Returns string
   */
  const [inputValue, setInputValue] = useState('');

  /**
   * State to track if bot is currently "typing"
   * Used to prevent multiple simultaneous bot replies
   * Set true when user sends, false after bot reply arrives
   * Returns boolean
   */
  const [isBotTyping, setIsBotTyping] = useState(false);

  /**
   * Sends a new user message and triggers a simulated bot reply
   * Adds user message immediately, then adds bot reply after 1.2s delay
   * Takes optional text override (for quick action buttons)
   * Returns void
   */
  const handleSend = (textOverride) => {
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

    // Simulate bot typing delay then add reply
    setTimeout(() => {
      const replyText = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
    }, 1200);
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

  return (
    <div className="bg-surface text-on-surface min-h-screen flex">
      {/* Reused Sidebar with breathbot active */}
      <Sidebar activeMenu="breathbot" />

      {/* Main chat canvas — full height flex column */}
      <div className="md:ml-64 flex-1 flex flex-col min-h-screen">

        {/* Sticky Chat Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md flex justify-between items-center h-20 px-8 border-b border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Bot avatar icon */}
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2D5AEE] border border-blue-100">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                robot_2
              </span>
            </div>
            {/* Bot name + status */}
            <div>
              <h2 className="font-bold text-on-surface text-base font-h3">BreathBot</h2>
              <p className="text-xs text-secondary font-label-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
                Always here to listen
              </p>
            </div>
          </div>

          {/* More options button */}
          <button className="p-2 rounded-full hover:bg-surface-container transition-colors text-outline">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </header>

        {/* Scrollable chat messages area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <ChatContainer messages={messages} />

          {/* Bot typing indicator */}
          {isBotTyping && (
            <div className="px-6 pb-2 max-w-4xl mx-auto w-full">
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
                  <span className="material-symbols-outlined text-[#2D5AEE] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    robot_2
                  </span>
                </div>
                <div
                  className="px-5 py-4 rounded-2xl rounded-tl-none border border-blue-100 flex items-center gap-1"
                  style={{ background: 'linear-gradient(135deg, #f3f2ff 0%, #e6e8ff 100%)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#2D5AEE] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#2D5AEE] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#2D5AEE] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fixed footer: quick actions + input */}
        <footer className="bg-white/80 backdrop-blur-xl px-6 py-5 border-t border-slate-100">
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
