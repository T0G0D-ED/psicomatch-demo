import { RotateCcw, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { psychologists } from '../../data/psychologists';
import { filterPsychologists, scorePsychologists } from '../../utils/matchScoring';
import { Button } from '../ui/Button';
import { FilterBar } from './FilterBar';
import { PsychologistCard } from './PsychologistCard';

export function DirectoryView() {
  const {
    matchAnswers,
    clearMatch,
    navigateTo,
    directoryFilters,
    moodPresetTags,
    resetDirectoryFilters,
  } = useApp();

  const scored = scorePsychologists(psychologists, matchAnswers);
  const filtered = filterPsychologists(scored, directoryFilters, moodPresetTags);

  const matchSummaryParts: string[] = [];
  if (matchAnswers?.audience) matchSummaryParts.push(matchAnswers.audience.label);
  if (matchAnswers?.need) matchSummaryParts.push(matchAnswers.need.label);
  if (matchAnswers?.modality) matchSummaryParts.push(matchAnswers.modality.label);
  if (matchAnswers?.budget) matchSummaryParts.push(matchAnswers.budget.label);

  return (
    <section className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8 space-y-4 sm:space-y-6">
      {/* Header / Context Banner */}
      {matchAnswers ? (
        <div className="rounded-2xl sm:rounded-3xl bg-sage p-4 sm:p-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-calm">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              Resultados ordenados por afinidad empática
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink leading-tight">
              {filtered.length > 0
                ? `Encontramos ${filtered.length} especialista${filtered.length === 1 ? '' : 's'} afines a tu momento`
                : 'Ningún perfil cumple todos los filtros actuales'}
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {matchSummaryParts.join(' · ')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 shrink-0">
            <Button
              variant="secondary"
              size="md"
              className="w-full sm:w-auto"
              onClick={() => navigateTo('match')}
            >
              Ajustar respuestas
            </Button>
            <Button
              variant="ghost"
              size="md"
              className="w-full sm:w-auto"
              onClick={clearMatch}
            >
              Ver todos sin orden de match
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-primary-hover">
              Exposición ética · Región de Valparaíso
            </p>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-ink leading-tight">
              {directoryFilters.presetLabel ?? 'Directorio de Especialistas'}
            </h1>
            <p className="text-xs sm:text-base text-ink-secondary max-w-2xl">
              Perfiles claros en lenguaje humano, sin suscripciones mensuales obligatorias.
            </p>
          </div>
          <Button
            variant="calm"
            size="md"
            className="w-full sm:w-auto shrink-0"
            onClick={() => navigateTo('match')}
          >
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>¿No sabes a quién elegir? Hacer Match</span>
          </Button>
        </div>
      )}

      {/* Filter Bar */}
      <FilterBar totalShown={filtered.length} totalAvailable={psychologists.length} />

      {/* Grid or Friendly Empty State */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <PsychologistCard key={item.psychologist.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl sm:rounded-3xl border border-border-soft bg-surface p-6 sm:p-10 text-center space-y-4 shadow-card">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
            No encontramos especialistas con esa combinación exacta
          </h2>
          <p className="mx-auto max-w-md text-sm text-ink-secondary">
            Puedes ampliar la comuna, cambiar a modalidad Online o dejar el rango de tarifa sin filtro para ver a toda nuestra red regional.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
              onClick={resetDirectoryFilters}
            >
              <RotateCcw className="h-4 w-4 shrink-0" />
              <span>Restablecer todos los filtros</span>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
