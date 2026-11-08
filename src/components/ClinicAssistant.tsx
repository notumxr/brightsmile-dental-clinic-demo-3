import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Calendar,
  Phone,
  Sparkles,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  MapPin,
  Clock,
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { ChatMessage, CLINIC_DATA } from '../types.ts';

interface ClinicAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

const QUICK_PROMPTS = [
  "What services do you offer?",
  "What are your opening hours?",
  "Where are you located?",
  "How can I request an appointment?",
  "What is your phone number?",
  "Do you do teeth whitening?"
];

export const ClinicAssistant: React.FC<ClinicAssistantProps> = ({
  isOpen,
  onToggle,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        `Hello and welcome to BrightSmile Dental Clinic! I am an AI assistant for this fictional demonstration project. I can assist you with our approved clinic information: location (25 King Street, Manchester, UK), opening hours (Mon–Fri 9:00–18:00, Sat 9:00–13:00, Sun closed), services (check-ups, cleaning, fillings, whitening, consultations), and how to request an appointment. For any other inquiries, please contact the clinic directly at 0161 000 0000. How may I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showBooking: true,
      showPhone: true,
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSafetyPolicy, setShowSafetyPolicy] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Handle external prompts triggered from other components
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Build conversation history payload
      const historyPayload = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showBooking: data.metadata?.showBooking ?? true,
        showPhone: data.metadata?.showPhone ?? true,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat request failed:', err);
      // Fallback message strictly adhering to calling clinic rule
      const fallbackMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          "I do not have that information in this demonstration. Please contact the clinic directly at 0161 000 0000 for accurate information, or submit our Request an Appointment form.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showBooking: true,
        showPhone: true,
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          `Chat cleared. I am the AI assistant for BrightSmile Dental Clinic demo at 25 King Street, Manchester (Hours: Mon–Fri 9:00–18:00, Sat 9:00–13:00, Sun Closed). For questions outside these approved details, please contact the clinic directly at 0161 000 0000. How can I assist you?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showBooking: true,
        showPhone: true,
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (FAB) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-5 right-5 z-50 bg-teal-700 hover:bg-teal-800 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          aria-label="Open BrightSmile Clinic Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-teal-100 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-teal-700"></span>
          </div>
          <span className="hidden sm:inline font-semibold text-xs tracking-wide">
            Clinic Assistant
          </span>
        </button>
      )}

      {/* Floating Assistant Widget Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-200">
          {/* Header */}
          <div className="bg-teal-800 text-white px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-teal-100">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">BrightSmile Assistant</h3>
                <p className="text-[11px] text-teal-200 flex items-center gap-1">
                  <span>25 King St, Manchester</span>
                  <span>·</span>
                  <span>Mon–Fri 9–18 · Sat 9–13</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSafetyPolicy((prev) => !prev)}
                title="Assistant safety policy"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  showSafetyPolicy ? 'bg-teal-900 text-white' : 'text-teal-200 hover:text-white hover:bg-teal-700'
                }`}
                aria-label="Assistant safety policy"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearChat}
                title="Restart chat"
                className="p-1.5 text-teal-200 hover:text-white hover:bg-teal-700 rounded-lg transition-colors cursor-pointer"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                title="Close assistant"
                className="p-1.5 text-teal-200 hover:text-white hover:bg-teal-700 rounded-lg transition-colors cursor-pointer"
                aria-label="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Safety Notice & Policy Banner */}
          <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200/90 text-[11px] text-slate-600 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5 truncate">
              <ShieldAlert className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span className="truncate">Answers from approved clinic facts only.</span>
            </div>
            <button
              onClick={() => setShowSafetyPolicy((prev) => !prev)}
              className="text-[10px] font-semibold text-teal-700 hover:text-teal-800 underline shrink-0 cursor-pointer"
            >
              {showSafetyPolicy ? 'Hide rules' : 'Safety rules'}
            </button>
          </div>

          {/* Collapsible Safety Rules Overlay Panel */}
          {showSafetyPolicy && (
            <div className="bg-teal-50/95 border-b border-teal-200 p-3.5 text-xs text-teal-950 space-y-2 shrink-0 animate-in fade-in duration-150">
              <div className="flex items-center justify-between font-bold text-teal-900 text-[11px]">
                <span>Assistant Safety & Information Rules</span>
                <button
                  onClick={() => setShowSafetyPolicy(false)}
                  className="text-teal-700 hover:text-teal-900"
                >
                  ✕
                </button>
              </div>
              <ul className="space-y-1 text-[11px] text-teal-900/90">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>Approved facts only:</strong> 5 services (check-ups, cleaning, fillings, whitening, consultations).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>No inventions:</strong> Never invents prices, doctors, insurance policies, or availability.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>No medical advice:</strong> Never diagnoses conditions or recommends specific treatments/medicines.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>Appointment requests:</strong> Directs to the internal request form on this page.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>Unknown inquiries:</strong> Directs visitor to call the clinic at 0161 000 0000.</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-teal-200/70 text-[10px] text-teal-900/80 italic font-medium">
                Demo website for demonstration purposes only. This is not a real clinic, does not provide medical advice, and does not create real appointments.
              </div>
            </div>
          )}

          {/* Quick Action Suggestion Chips */}
          <div className="p-2.5 bg-white border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto custom-scrollbar shrink-0">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap shrink-0 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 border border-slate-200 hover:border-teal-200 rounded-lg px-2.5 py-1 transition-colors cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar bg-slate-50/50">
            {messages.map((message) => {
              const isAssistant = message.role === 'assistant';

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      isAssistant
                        ? 'bg-white text-slate-800 border border-slate-200/90 shadow-xs rounded-tl-sm'
                        : 'bg-teal-700 text-white rounded-tr-sm shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>

                    {/* Integrated Quick Action Cards for Assistant */}
                    {isAssistant && (message.showBooking || message.showPhone) && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                        {message.showBooking && (
                          <a
                            href="#request-appointment"
                            onClick={() => onToggle()}
                            className="bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-[11px] px-2.5 py-1.5 rounded-lg border border-teal-200 flex items-center justify-between transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-teal-700" />
                              <span>Request an Appointment</span>
                            </span>
                            <ArrowRight className="w-3 h-3 text-teal-600" />
                          </a>
                        )}

                        {message.showPhone && (
                          <a
                            href={`tel:${CLINIC_DATA.phone}`}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] px-2.5 py-1.5 rounded-lg border border-slate-200 flex items-center justify-between transition-colors"
                          >
                            <span className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-teal-700" />
                              <span>Call Clinic: {CLINIC_DATA.phone}</span>
                            </span>
                            <ArrowRight className="w-3 h-3 text-slate-500" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {message.timestamp}
                  </span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-2xl px-3.5 py-2.5 w-fit shadow-xs">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-[11px]">Assistant is replying...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Clinic Info Footer Strip */}
          <div className="px-3.5 py-1.5 bg-slate-100/80 border-t border-slate-200/60 text-[10px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-teal-600" />
              <span>25 King St</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-teal-600" />
              <span>Mon–Fri 9–18 · Sat 9–13</span>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-teal-600" />
              <span>{CLINIC_DATA.phone}</span>
            </span>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about hours, services, booking..."
              disabled={isLoading}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 placeholder:text-slate-400 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
