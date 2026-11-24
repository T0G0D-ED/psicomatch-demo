import { CalendarCheck, Sprout } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ViewType } from '../../types';
import { Button } from '../ui/Button';

export function Navbar() {
  const { activeView, navigateTo, bookings, setIsBookingsDrawerOpen } = useApp();

  const navItems: { label: string; view: ViewType }[] = [
    { label: 'Inicio', view: 'landing' },
    { label: 'Match Empático', view: 'match' },
    { label: 'Especialistas', view: 'directory' },
    { label: 'Soy Psicólogo', view: 'b2b' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 sm:py-3.5 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2 sm:gap-2.5 text-left group min-h-[40px]"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage text-calm group-hover:bg-sage-strong transition-colors">
            <Sprout className="h-5 w-5" />
          </span>
          <div>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-ink">
              PsicoMatch
            </span>
            <span className="block text-[10px] sm:text-[11px] font-medium text-ink-secondary leading-none">
              Región de Valparaíso
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => navigateTo(item.view)}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsBookingsDrawerOpen(true)}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-border-soft bg-canvas px-4 py-2 text-xs font-semibold text-ink hover:bg-sage/60 transition-colors"
          >
            <CalendarCheck className="h-4 w-4 text-calm" />
            <span>Mis reservas</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sage-strong px-1.5 text-[11px] font-bold text-ink">
              {bookings.length}
            </span>
          </button>
          <Button size="md" variant="primary" onClick={() => navigateTo('match')}>
            Encontrar apoyo
          </Button>
        </div>

        {/* Mobile Compact Right Action (navigation lives in MobileBottomNav) */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsBookingsDrawerOpen(true)}
            aria-label="Ver mis reservas simuladas"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-border-soft bg-canvas px-3.5 py-1.5 text-xs font-semibold text-ink active:bg-sage/60 transition-colors"
          >
            <CalendarCheck className="h-4 w-4 text-calm" />
            <span>Mis reservas</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sage-strong px-1.5 text-[11px] font-bold text-ink">
              {bookings.length}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
