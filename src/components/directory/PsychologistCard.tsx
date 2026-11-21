import { MapPin, Sparkles, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ScoredPsychologist } from '../../types';
import { formatCLP } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function PsychologistCard({ item }: { item: ScoredPsychologist }) {
  const { openPsychologist, bookings } = useApp();
  const { psychologist, matchScore, matchReasons } = item;

  const bookedSlotIds = new Set(
    bookings
      .filter((b) => b.psychologistId === psychologist.id)
      .map((b) => b.slotId)
  );
  const availableCount = psychologist.availableSlots.filter(
    (s) => s.available && !bookedSlotIds.has(s.id)
  ).length;

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-border-soft bg-surface p-6 shadow-card transition-all hover:border-border-warm">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-strong text-sm font-bold text-ink">
              {psychologist.initials}
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-ink leading-snug">
                {psychologist.name}
              </h3>
              <p className="text-xs text-ink-secondary leading-snug">
                {psychologist.approach} · {psychologist.specialty}
              </p>
            </div>
          </div>

          {matchScore !== null && (
            <Badge tone="match" className="shrink-0">
              <Sparkles className="h-3 w-3" />
              {matchScore}% Match
            </Badge>
          )}
        </div>

        {/* Match Reasons Callout when user came from Match Wizard */}
        {matchReasons.length > 0 && (
          <div className="rounded-xl bg-sage/80 px-3 py-2 text-xs text-ink">
            <span className="font-semibold text-calm">Por qué conecta contigo: </span>
            {matchReasons.join(' · ')}
          </div>
        )}

        {/* Bio excerpt */}
        <p className="text-sm leading-relaxed text-ink-secondary">
          {psychologist.plainLanguageFocus}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {psychologist.tagLabels.map((tag) => (
            <Badge key={tag} tone="sage">
              {tag}
            </Badge>
          ))}
          <Badge tone="neutral">{psychologist.modalities.join(' · ')}</Badge>
        </div>
      </div>

      {/* Bottom Metadata + Price + Actions */}
      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between gap-2 text-xs text-ink-secondary">
          <span className="inline-flex items-center gap-1.5 min-w-0">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-calm" />
            <span className="truncate">{psychologist.communes.join(' y ')}</span>
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-ink shrink-0">
            <Star className="h-3.5 w-3.5 fill-rating text-rating" />
            {psychologist.rating} ({psychologist.reviewCount})
          </span>
        </div>

        <div className="border-t border-border-soft pt-4 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-base sm:text-lg font-bold text-ink whitespace-nowrap">
              {formatCLP(psychologist.priceClp)}
            </p>
            <p className="text-[11px] font-medium text-primary-hover">
              Sin suscripciones · {availableCount} horas libres
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => openPsychologist(psychologist.id, 'profile')}
            >
              Ver perfil
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => openPsychologist(psychologist.id, 'booking')}
            >
              Agendar
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
