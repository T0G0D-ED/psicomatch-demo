import { useState } from 'react';
import { CalendarCheck, Menu, Sprout, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ViewType } from '../../types';
import { Button } from '../ui/Button';

export function Navbar() {
  const { activeView, navigateTo, bookings, setIsBookingsDrawerOpen } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; view: ViewType }[] = [
    { label: 'Inicio', view: 'landing' },
    { label: 'Match Empático', view: 'match' },
    { label: 'Especialistas', view: 'directory' },
    { label: 'Soy Psicólogo', view: 'b2b' },
  ];

  const handleNav = (view: ViewType) => {
    navigateTo(view);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNav('landing')}
          className="flex items-center gap-2.5 text-left group"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage text-calm group-hover:bg-sage-strong transition-colors">
            <Sprout className="h-5 w-5" />
          </span>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-ink">
              PsicoMatch
            </span>
            <span className="hidden sm:block text-[11px] font-medium text-ink-secondary leading-none">
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
                onClick={() => handleNav(item.view)}
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
            className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-canvas px-4 py-2 text-xs font-semibold text-ink hover:bg-sage/60 transition-colors"
          >
            <CalendarCheck className="h-4 w-4 text-calm" />
            <span>Mis reservas</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sage-strong px-1.5 text-[11px] font-bold text-ink">
              {bookings.length}
            </span>
          </button>
          <Button size="md" variant="primary" onClick={() => handleNav('match')}>
            Encontrar apoyo
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setIsBookingsDrawerOpen(true)}
            aria-label="Ver mis reservas simuladas"
            className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-canvas px-3 py-1.5 text-xs font-semibold text-ink"
          >
            <CalendarCheck className="h-4 w-4 text-calm" />
            <span>{bookings.length}</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-canvas text-ink"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="border-t border-border-soft bg-surface px-4 py-4 md:hidden animate-fade-up">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNav(item.view)}
                className={`rounded-xl px-4 py-2.5 text-left text-sm font-semibold ${
                  activeView === item.view
                    ? 'bg-sage text-ink'
                    : 'text-ink-secondary hover:bg-subtle'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <Button fullWidth onClick={() => handleNav('match')}>
                Hacer Match Empático
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
