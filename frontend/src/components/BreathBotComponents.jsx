/**
 * BreathBotComponents - All BreathBot page components
 * Contains: ChatBubble, ProgressCard, ChatContainer, QuickActions, ChatInput
 * Used by: BreathBot.jsx page
 */
import { useEffect, useRef } from 'react';

const BOT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr57V-srkfLr-lh8KE5gVDKfyQZRVtZP5Cc5ua26BCNonTiyVqsKhqADKEmIJjOxVUAx46K5hJvX7c3l1idhW1HARq3pLXn0q2lDaTPtkfahGfhT_nfLatjZ-0eHKUxncQW-ZjWQtFHJIIKC03sWTY7zMT_ryCwmI6KL5qpg4VJZAWMn4NKZcf9hCbu22nsJZkkLbfeezBmpiOYhsa7Dw5hr50rJg6kjnSS3_bUE-eqYMOS93AKmlu1THL2NqezPoRUYzg1z37bsQ';
const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_fH5ShukOI5aH-_0WYMIFXJhiVwYwnQs16T3cyax70gWZKamw7X6UiSEexIiGuvo0uzFrC4ci5SoxCjy9ZeXdlHNtPSowEADB8IMvCgserzHVnKGI1QUIfck0Z8qCoRsDEIx8UAsUtcpEA7eYnZTbc9PqrBhSGPYcHjtN6S6C6d5SQOjadIMf0GnavXeEl4iUot4njj9lYgbk7JdSkgsw79qr_Jl95fz7DW8nnpQ5puYsjEepYVnkWKFIT1GSVXRLKmWQcoMy9e0';

/**
 * ChatBubble - Single chat message bubble for bot or user
 */
export function ChatBubble({ message }) {
  const { sender, text, time } = message;
  const isBot = sender === 'bot';

  if (isBot) {
    return (
      <div className="flex gap-4 max-w-[85%]">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary-fixed shadow-sm bg-white">
          <img src={BOT_AVATAR} alt="BreathBot Avatar" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-1">
          <div
            className="p-5 rounded-2xl rounded-tl-none shadow-sm text-on-surface-variant border border-blue-100"
            style={{ background: 'linear-gradient(135deg, #f3f2ff 0%, #e6e8ff 100%)' }}
          >
            <p className="text-[15px] leading-relaxed whitespace-pre-line">{text}</p>
          </div>
          <span className="text-[11px] text-outline font-label-sm px-1">{time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row-reverse gap-4 max-w-[85%] self-end">
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-surface-container-highest shadow-sm">
        <img src={USER_AVATAR} alt="User profile" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="bg-white p-5 rounded-2xl rounded-tr-none shadow-[0px_4px_20px_rgba(45,90,238,0.1)] text-on-surface border border-slate-100">
          <p className="text-[15px] leading-relaxed">{text}</p>
        </div>
        <span className="text-[11px] text-outline font-label-sm px-1">{time}</span>
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
    moneySaved: '$42.00',
  };

  return (
    <div className="ml-14 max-w-sm">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0px_10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-on-surface font-h3">Your Path</span>
          <span className="text-secondary font-bold text-xs font-label-sm">
            Day {progress.currentDay} of {progress.totalDays}
          </span>
        </div>

        <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full progress-gradient"
            style={{ width: `${progress.percent}%` }}
          />
        </div>

        <p className="text-xs text-outline font-label-sm">
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
              ? 'border border-[#2D5AEE] text-[#2D5AEE] bg-blue-50 hover:bg-blue-100'
              : 'border border-outline-variant text-on-surface-variant hover:border-[#2D5AEE] hover:text-[#2D5AEE] bg-white'
          }`}
        >
          {action}
        </button>
      ))}
    </div>
  );
}

/**
 * ChatInput - Message input bar with mic icon and send button
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
          className="w-full h-14 pl-6 pr-14 rounded-full border border-slate-200 focus:border-[#2D5AEE] focus:outline-none focus:ring-0 text-base bg-slate-50 placeholder:text-slate-400 transition-all"
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-[#2D5AEE] transition-colors"
          tabIndex={-1}
        >
          <span className="material-symbols-outlined">mic</span>
        </button>
      </div>

      <button
        onClick={onSend}
        className="w-14 h-14 bg-[#2D5AEE] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined">send</span>
      </button>
    </div>
  );
}
