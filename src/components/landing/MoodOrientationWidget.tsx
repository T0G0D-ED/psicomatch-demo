import { useState } from 'react';
import { ArrowRight, ChevronRight, Compass, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { moodOptions } from '../../data/moodOptions';
import { psychologists } from '../../data/psychologists';
import { formatCLP } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function MoodOrientationWidget() {
  const { applyMoodPreset, openPsychologist } = useApp();
  const [selectedId, setSelectedId] = useState<string>(moodOptions[1].id); // Ansioso/a por defecto

  const activeMood = moodOptions.find((m) => m.id === selectedId) ?? moodOptions[0];

  const recommended = psychologists
    .filter((p) => activeMood.suggestedTags.some((t) => p.tags.includes(t)))
    .slice(0, 2);

  return (
    <section className="mx-auto max-w-7xl px-3 pt-5 sm:px-6 sm:pt-8 lg:px-8">
      <div className="rounded-2xl sm:rounded-[28px] border border-border-soft bg-surface p-4 sm:p-8 shadow-card space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-primary-hover">
              Orientación inmediata · Sin tecnicismos
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-ink">
              ¿Cómo te sientes hoy?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-ink-secondary">
              Elige lo que mejor describe tu momento actual para ver qué especialistas de PsicoMatch pueden ayudarte hoy.
            </p>
          </div>
          <Badge tone="sage" className="self-start sm:self-center">
            <Compass className="h-3.5 w-3.5 text-calm shrink-0" />
            Atajo al directorio
          </Badge>
        </div>

        {/* 5 Mood Chips — Horizontal Snap Rail on Mobile, 5-Col Grid on Desktop */}
        <div>
          <p className="mb-2 text-[11px] font-medium text-ink-muted lg:hidden">
            Desliza y toca cómo te sientes →
          </p>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-2.5 pb-1 -mx-1 px-1 no-scrollbar lg:grid lg:grid-cols-5 lg:overflow-visible lg:mx-0 lg:px-0 lg:pb-0">
            {moodOptions.map((mood) => {
              const isSelected = mood.id === activeMood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(mood.id)}
                  className={`shrink-0 snap-start min-w-[152px] sm:min-w-[172px] lg:min-w-0 rounded-2xl p-3.5 sm:p-4 text-left transition-all ${
                    isSelected
                      ? 'bg-sage-strong border-2 border-calm shadow-xs'
                      : 'bg-surface border border-border-soft hover:bg-subtle/70'
                  }`}
                >
                  <p className="text-sm font-semibold text-ink">{mood.label}</p>
                  <p className="mt-0.5 text-xs text-ink-secondary">{mood.hint}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Instant Marketplace Recommendation + Specialist Previews */}
        <div className="rounded-2xl bg-sage p-4 sm:p-6 space-y-4 sm:space-y-5 animate-fade-up">
          <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1 max-w-2xl">
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-primary-hover">
                Orientación recomendada para: {activeMood.label}
              </p>
              <p className="text-sm sm:text-base text-ink leading-relaxed">
                {activeMood.recommendation}
              </p>
            </div>
            <Button
              variant="calm"
              size="md"
              className="w-full lg:w-auto lg:shrink-0"
              onClick={() =>
                applyMoodPreset(
                  activeMood.suggestedTags,
                  `Orientación según tu momento: ${activeMood.label}`
                )
              }
            >
              <span>{activeMood.ctaLabel}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Button>
          </div>

          {/* 2 Recommended Psychologist Quick Previews */}
          <div className="grid gap-3 md:grid-cols-2">
            {recommended.map((psy) => (
              <button
                key={psy.id}
                type="button"
                onClick={() => openPsychologist(psy.id)}
                className="w-full min-w-0 overflow-hidden flex items-center justify-between gap-3 rounded-xl border border-border-soft bg-surface p-3.5 text-left hover:border-border-warm hover:bg-subtle/50 active:scale-[0.99] transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-strong text-xs font-bold text-ink">
                    {psy.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                        {psy.name}
                      </p>
                      <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-ink shrink-0">
                        <Star className="h-3 w-3 fill-rating text-rating" />
                        {psy.rating}
                      </span>
                    </div>
                    <p className="truncate text-xs text-ink-secondary">
                      {psy.approach} · {psy.communes.join(', ')}
                    </p>
                    <p className="text-xs font-semibold text-calm mt-0.5">
                      {formatCLP(psy.priceClp)} · {psy.modalities.join(' / ')}
                    </p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-subtle px-3 py-1.5 text-xs font-semibold text-ink group-hover:bg-sage-strong transition-colors">
                  <span className="hidden sm:inline">Ver perfil</span>
                  <ChevronRight className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
