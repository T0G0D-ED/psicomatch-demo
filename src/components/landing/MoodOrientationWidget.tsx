import { useState } from 'react';
import { ArrowRight, Compass, Star } from 'lucide-react';
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
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-border-soft bg-surface p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary-hover">
              Orientación inmediata · Sin tecnicismos
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-ink">
              ¿Cómo te sientes hoy?
            </h2>
            <p className="mt-1 text-sm text-ink-secondary">
              Elige lo que mejor describe tu momento actual para ver qué especialistas de PsicoMatch pueden ayudarte hoy.
            </p>
          </div>
          <Badge tone="sage" className="self-start sm:self-center">
            <Compass className="h-3.5 w-3.5 text-calm" />
            Atajo al directorio
          </Badge>
        </div>

        {/* 5 Mood Chips */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {moodOptions.map((mood) => {
            const isSelected = mood.id === activeMood.id;
            return (
              <button
                key={mood.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedId(mood.id)}
                className={`rounded-2xl p-4 text-left transition-all ${
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

        {/* Instant Marketplace Recommendation + Specialist Previews */}
        <div className="rounded-2xl bg-sage p-5 sm:p-6 space-y-5 animate-fade-up">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-hover">
                Orientación recomendada para: {activeMood.label}
              </p>
              <p className="text-sm sm:text-base text-ink leading-relaxed">
                {activeMood.recommendation}
              </p>
            </div>
            <Button
              variant="calm"
              size="md"
              className="shrink-0"
              onClick={() =>
                applyMoodPreset(
                  activeMood.suggestedTags,
                  `Orientación según tu momento: ${activeMood.label}`
                )
              }
            >
              <span>{activeMood.ctaLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* 2 Recommended Psychologist Quick Previews */}
          <div className="grid gap-3 md:grid-cols-2">
            {recommended.map((psy) => (
              <div
                key={psy.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border-soft bg-surface p-3.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-strong text-xs font-bold text-ink">
                    {psy.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-ink">{psy.name}</p>
                      <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-ink">
                        <Star className="h-3 w-3 fill-rating text-rating" />
                        {psy.rating}
                      </span>
                    </div>
                    <p className="truncate text-xs text-ink-secondary">
                      {psy.approach} · {psy.communes.join(', ')} · {formatCLP(psy.priceClp)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="shrink-0"
                  onClick={() => openPsychologist(psy.id)}
                >
                  Ver perfil
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
