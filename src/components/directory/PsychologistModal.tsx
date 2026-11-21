import { MapPin, ShieldCheck, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { psychologists } from '../../data/psychologists';
import { formatCLP } from '../../utils/formatters';
import { BookingFlow } from '../booking/BookingFlow';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

export function PsychologistModal() {
  const { selectedPsychologistId, closePsychologist } = useApp();

  const psychologist = psychologists.find((p) => p.id === selectedPsychologistId);

  return (
    <Modal
      isOpen={Boolean(psychologist)}
      onClose={closePsychologist}
      title={psychologist?.name}
      maxWidthClass="max-w-5xl"
    >
      {psychologist && (
        <div className="p-6 sm:p-8 grid gap-8 lg:grid-cols-12">
          {/* Left Column: Ethical Profile, Letter & Reviews */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-start gap-4 pr-8">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sage-strong text-lg font-bold text-ink">
                {psychologist.initials}
              </span>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-hover">
                  {psychologist.approach}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                  {psychologist.name}
                </h2>
                <p className="text-sm text-ink-secondary">{psychologist.specialty}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-ink-secondary">
                  <span className="inline-flex items-center gap-1 font-semibold text-ink">
                    <Star className="h-3.5 w-3.5 fill-rating text-rating" />
                    {psychologist.rating} ({psychologist.reviewCount} reseñas)
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-calm" />
                    {psychologist.credentials}
                  </span>
                  {psychologist.instagramHandle && (
                    <span className="font-medium text-calm">{psychologist.instagramHandle}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Modalities & Communes */}
            <div className="flex flex-wrap items-center gap-2">
              {psychologist.tagLabels.map((lbl) => (
                <Badge key={lbl} tone="sage">
                  {lbl}
                </Badge>
              ))}
              <Badge tone="neutral">
                <MapPin className="h-3 w-3" />
                {psychologist.communes.join(', ')} · {psychologist.modalities.join(' / ')}
              </Badge>
              <Badge tone="terracotta">{formatCLP(psychologist.priceClp)} / sesión</Badge>
            </div>

            {/* Presentation Letter */}
            <div className="rounded-2xl bg-subtle/80 p-5 space-y-2">
              <h3 className="text-sm font-semibold text-ink">Carta de presentación</h3>
              <p className="text-sm leading-relaxed text-ink-secondary italic">
                &ldquo;{psychologist.bioLetter}&rdquo;
              </p>
            </div>

            {/* Audience */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-ink">¿Con quiénes trabaja habitualmente?</h3>
              <div className="flex flex-wrap gap-2">
                {psychologist.targetAudience.map((aud) => (
                  <span
                    key={aud}
                    className="rounded-xl border border-border-soft bg-canvas px-3 py-1.5 text-xs font-medium text-ink"
                  >
                    {aud}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Patient Reviews */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-ink">
                Experiencias recientes de pacientes
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {psychologist.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-xl border border-border-soft bg-canvas p-4 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink">{rev.author}</span>
                      <span className="inline-flex items-center gap-0.5 font-semibold text-ink">
                        <Star className="h-3 w-3 fill-rating text-rating" />
                        {rev.rating}.0
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-muted">
                      {rev.communeOrMode} · {rev.dateLabel}
                    </p>
                    <p className="text-xs leading-relaxed text-ink-secondary">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Simulated Booking Flow */}
          <div className="lg:col-span-5">
            <BookingFlow psychologist={psychologist} onCloseModal={closePsychologist} />
          </div>
        </div>
      )}
    </Modal>
  );
}
