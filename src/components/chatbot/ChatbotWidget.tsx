import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircleHeart, PhoneCall, RotateCcw, Send, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  chatbotResponses,
  INITIAL_QUICK_REPLY_IDS,
  matchFreeTextToBotReply,
} from '../../data/chatbotResponses';
import type { ChatbotAction, ChatMessage } from '../../types';
import { formatTimeNow } from '../../utils/formatters';

function createInitialMessages(): ChatMessage[] {
  return [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Hola 👋 Soy el asistente de orientación 24/7 de PsicoMatch. Estoy aquí para resolver tus dudas en lenguaje simple, sin juicios ni tecnicismos. ¿En qué te ayudo hoy?',
      timestamp: formatTimeNow(),
    },
  ];
}

export function ChatbotWidget() {
  const { isChatOpen, setIsChatOpen, navigateTo } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(createInitialMessages);
  const [quickReplyIds, setQuickReplyIds] = useState<string[]>(INITIAL_QUICK_REPLY_IDS);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isChatOpen]);

  useEffect(() => {
    if (!isChatOpen || typeof window === 'undefined') return;
    if (window.innerWidth >= 768) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isChatOpen]);

  const handleActionClick = (action: ChatbotAction) => {
    navigateTo(action.targetView);
    setIsChatOpen(false);
  };

  const handleQuickReply = (responseId: string) => {
    const item = chatbotResponses.find((r) => r.id === responseId);
    if (!item || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: item.userMessage,
      timestamp: formatTimeNow(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    window.setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: item.botReply,
        action: item.followUpAction,
        timestamp: formatTimeNow(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setQuickReplyIds(item.nextQuickReplyIds);
      setIsTyping(false);
    }, 320);
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: formatTimeNow(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    window.setTimeout(() => {
      const matched = matchFreeTextToBotReply(trimmed);
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: matched.text,
        action: matched.action,
        timestamp: formatTimeNow(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 350);
  };

  const handleReset = () => {
    setMessages(createInitialMessages());
    setQuickReplyIds(INITIAL_QUICK_REPLY_IDS);
  };

  const visibleReplies = quickReplyIds
    .map((id) => chatbotResponses.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  if (!isChatOpen) {
    /* Floating button visible only on md+ desktop; mobile uses the thumb-zone MobileBottomNav tab */
    return (
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="inline-flex items-center gap-2.5 rounded-full bg-dark px-5 py-3.5 text-sm font-semibold text-white shadow-floating hover:bg-forest transition-all"
        >
          <MessageCircleHeart className="h-5 w-5 text-sand" />
          <span>¿Dudas? Asistente 24/7</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 md:inset-auto md:bottom-6 md:right-6 flex flex-col bg-surface md:w-[400px] md:max-h-[82vh] md:rounded-3xl md:border md:border-border-soft md:shadow-floating overflow-hidden animate-sheet-up md:animate-fade-up"
      role="dialog"
      aria-label="Asistente Virtual 24/7 PsicoMatch"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-dark px-4 py-3.5 sm:px-5 sm:py-4 text-white shrink-0">
        <div>
          <p className="text-sm font-semibold">Asistente PsicoMatch 24/7</p>
          <p className="text-xs text-ink-muted flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            En línea · Guía sin tecnicismos
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleReset}
            title="Reiniciar conversación"
            aria-label="Reiniciar conversación"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-muted hover:bg-forest hover:text-white transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsChatOpen(false)}
            aria-label="Cerrar asistente"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-muted hover:bg-forest hover:text-white transition-colors"
          >
            <X className="h-5 w-5 md:h-4 md:w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-canvas p-4 md:min-h-[220px] md:max-h-[320px]"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-calm text-white rounded-br-sm'
                  : 'bg-surface border border-border-soft text-ink rounded-bl-sm shadow-2xs'
              }`}
            >
              <p>{msg.text}</p>
              {msg.action && (
                <button
                  type="button"
                  onClick={() => handleActionClick(msg.action!)}
                  className="mt-2.5 inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-primary-hover transition-colors"
                >
                  <span>{msg.action.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </button>
              )}
            </div>
            <span className="mt-1 px-1 text-[10px] text-ink-muted">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="inline-flex items-center gap-1.5 rounded-2xl border border-border-soft bg-surface px-3.5 py-2.5 text-xs text-ink-secondary">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-calm" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-calm [animation-delay:0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-calm [animation-delay:0.3s]" />
          </div>
        )}
      </div>

      {/* Quick Replies */}
      <div className="border-t border-border-soft bg-surface px-4 py-3 space-y-2 shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">
          Respuestas rápidas
        </p>
        <div className="flex flex-wrap gap-1.5">
          {visibleReplies.map((qr) => (
            <button
              key={qr.id}
              type="button"
              onClick={() => handleQuickReply(qr.id)}
              className="min-h-[36px] rounded-full border border-border-soft bg-sage px-3 py-1.5 text-xs font-medium text-ink hover:bg-sage-strong transition-colors text-left"
            >
              {qr.triggerLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Text Input */}
      <form
        onSubmit={handleSendText}
        className="flex items-center gap-2 border-t border-border-soft bg-surface px-3 py-2.5 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu duda (ej. precios, Quilpué...)"
          aria-label="Escribe una consulta al asistente"
          className="min-h-[44px] flex-1 rounded-full border border-border-soft bg-canvas px-4 py-2 text-base md:text-xs text-ink placeholder:text-ink-muted focus:border-calm focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Enviar mensaje"
          disabled={!inputText.trim() || isTyping}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover disabled:opacity-40 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      {/* Crisis Helpline Footer */}
      <div className="flex items-center gap-2 bg-accent-soft px-4 py-2.5 pb-safe md:pb-2 text-[11px] font-medium text-primary-hover shrink-0">
        <PhoneCall className="h-3.5 w-3.5 shrink-0" />
        <span>¿Emergencia emocional? Llama gratis al *4141 (MINSAL Chile).</span>
      </div>
    </div>
  );
}
