/**
 * BreathBotComponents - All BreathBot page components
 * Contains: ChatBubble, ProgressCard, ChatContainer, QuickActions, ChatInput
 * Used by: BreathBot.jsx page
 */
import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * ChatBubble - Single chat message bubble for bot or user
 */
export function ChatBubble({ message }) {
  const { user } = useAuth();
  const { sender, text, time } = message;
  const isBot = sender === 'bot';

  // Get user profile image
  const userAvatar = user?.profile_image 
    ? `http://localhost:5000${user.profile_image}`
    : 'https://ui-avatars.com/api/?name=User&background=2D5AEE&color=fff&size=128';

  if (isBot) {
    return (
      <div className="flex gap-4 max-w-[85%]">
        {/* Simple bot icon instead of human image */}
        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center text-[#2D5AEE] dark:text-blue-400 border-2 border-blue-100 dark:border-blue-800 flex-shrink-0">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '24px' }}>
            robot_2
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div
            className="p-5 rounded-2xl rounded-tl-none shadow-sm text-on-surface-variant dark:text-gray-300 border border-blue-100 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900"
          >
            <p className="text-[15px] leading-relaxed whitespace-pre-line">{text}</p>
          </div>
          <span className="text-[11px] text-outline dark:text-gray-500 font-label-sm px-1">{time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row-reverse gap-4 max-w-[85%] self-end">
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-surface-container-highest dark:border-gray-700 shadow-sm">
        <img 
          src={userAvatar} 
          alt="User profile" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://ui-avatars.com/api/?name=User&background=2D5AEE&color=fff&size=128';
          }}
        />
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl rounded-tr-none shadow-[0px_4px_20px_rgba(45,90,238,0.1)] dark:shadow-[0px_4px_20px_rgba(0,0,0,0.5)] text-on-surface dark:text-gray-100 border border-slate-100 dark:border-gray-700">
          <p className="text-[15px] leading-relaxed">{text}</p>
        </div>
        <span className="text-[11px] text-outline dark:text-gray-500 font-label-sm px-1">{time}</span>
      </div>
    </div>
  );
}

/**
 * ProgressCard - Inline recovery progress card shown inside chat
 */
export function ProgressCard() {
  const progress = {
    currentDay: 3,
    totalDays: 30,
    percent: 10,
    moneySaved: '₹42.00',
  };

  return (
    <div className="ml-14 max-w-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-slate-100 dark:border-gray-700 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0px_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-on-surface dark:text-gray-100 font-h3">Your Path</span>
          <span className="text-secondary dark:text-green-400 font-bold text-xs font-label-sm">
            Day {progress.currentDay} of {progress.totalDays}
          </span>
        </div>

        <div className="w-full h-3 bg-surface-container-high dark:bg-gray-700 rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full progress-gradient"
            style={{ width: `${progress.percent}%` }}
          />
        </div>

        <p className="text-xs text-outline dark:text-gray-400 font-label-sm">
          You've saved {progress.moneySaved} so far. Keep going!
        </p>
      </div>
    </div>
  );
}

/**
 * ChatContainer - Scrollable chat messages area
 */
export function ChatContainer({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const shouldShowProgressCard = (index) => index === 2;

  return (
    <section className="flex-grow overflow-y-auto px-6 py-8" style={{ scrollbarWidth: 'thin' }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex justify-center">
          <span className="bg-surface-container-low px-4 py-1 rounded-full text-outline text-[12px] font-label-sm uppercase tracking-widest">
            Today
          </span>
        </div>

        {messages.map((msg, index) => (
          <div key={msg.id}>
            <ChatBubble message={msg} />
            {shouldShowProgressCard(index) && <div className="mt-4"><ProgressCard /></div>}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>
    </section>
  );
}

/**
 * QuickActions - Row of quick reply suggestion buttons
 */
export function QuickActions({ onSelect }) {
  const actions = [
    "I'm having a craving",
    'Tell me a success story',
    'Help me breathe',
    'Health stats',
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
      {actions.map((action, index) => (
        <button
          key={action}
          onClick={() => onSelect(action)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            index === 0
              ? 'border border-[#2D5AEE] dark:border-blue-400 text-[#2D5AEE] dark:text-blue-400 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800'
              : 'border border-outline-variant dark:border-gray-600 text-on-surface-variant dark:text-gray-300 hover:border-[#2D5AEE] dark:hover:border-blue-400 hover:text-[#2D5AEE] dark:hover:text-blue-400 bg-white dark:bg-gray-800'
          }`}
        >
          {action}
        </button>
      ))}
    </div>
  );
}

/**
 * ChatInput - Message input bar with send button (NO VOICE)
 */
export function ChatInput({ value, onChange, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-grow relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="w-full h-14 pl-6 pr-6 rounded-full border border-slate-200 dark:border-gray-600 focus:border-[#2D5AEE] dark:focus:border-blue-400 focus:outline-none focus:ring-0 text-base bg-slate-50 dark:bg-gray-800 text-on-surface dark:text-gray-100 placeholder:text-slate-400 dark:placeholder:text-gray-500 transition-all"
        />
      </div>

      <button
        onClick={onSend}
        className="w-14 h-14 bg-[#2D5AEE] dark:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined">send</span>
      </button>
    </div>
  );
}
