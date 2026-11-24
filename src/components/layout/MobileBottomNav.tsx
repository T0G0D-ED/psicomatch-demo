import { Briefcase, Home, MessageCircleHeart, Search, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ViewType } from '../../types';

export function MobileBottomNav() {
  const { activeView, navigateTo, isChatOpen, setIsChatOpen } = useApp();

  const items: Array<{
    id: string;
    label: string;
    icon: typeof Home;
    view?: ViewType;
  }> = [
    { id: 'landing', label: 'Inicio', icon: Home, view: 'landing' },
    { id: 'match', label: 'Match', icon: Sparkles, view: 'match' },
    { id: 'directory', label: 'Explorar', icon: Search, view: 'directory' },
    { id: 'b2b', label: 'Soy Ps.', icon: Briefcase, view: 'b2b' },
  ];

  return (
    <nav
      aria-label="Navegación rápida móvil"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border-soft bg-surface/95 backdrop-blur-md pb-safe shadow-[0_-4px_20px_rgba(26,38,30,0.06)]"
    >
      <div className="grid grid-cols-5 items-center min-h-[58px] px-1">
        {items.map(({ id, label, icon: Icon, view }) => {
          const isActive = !isChatOpen && activeView === view;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                setIsChatOpen(false);
                if (view) navigateTo(view);
              }}
              className={`flex flex-col items-center justify-center gap-0.5 py-1.5 text-[11px] font-semibold transition-colors ${
                isActive ? 'text-primary' : 'text-ink-secondary'
              }`}
            >
              <span
                className={`flex h-7 w-11 items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-accent-soft text-primary' : ''
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="leading-none">{label}</span>
            </button>
          );
        })}

        {/* 24/7 Assistant Button */}
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          aria-label="Abrir Asistente 24/7"
          className={`relative flex flex-col items-center justify-center gap-0.5 py-1.5 text-[11px] font-semibold transition-colors ${
            isChatOpen ? 'text-calm' : 'text-ink-secondary'
          }`}
        >
          <span
            className={`relative flex h-7 w-11 items-center justify-center rounded-full transition-colors ${
              isChatOpen ? 'bg-sage text-calm' : ''
            }`}
          >
            <MessageCircleHeart className="h-4 w-4" />
            <span
              className="absolute top-1 right-2.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-surface"
              aria-hidden="true"
            />
          </span>
          <span className="leading-none">Asistente</span>
        </button>
      </div>
    </nav>
  );
}
