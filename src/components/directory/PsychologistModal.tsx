import { useEffect, useState } from 'react';
import { ArrowRight, MapPin, ShieldCheck, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { psychologists } from '../../data/psychologists';
import { formatCLP } from '../../utils/formatters';
import { BookingFlow } from '../booking/BookingFlow';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

export function PsychologistModal() {
  const { selectedPsychologistId, modalInitialFocus, closePsychologist } = useApp();
  const [mobileTab, setMobileTab] = useState<'profile' | 'booking'>(modalInitialFocus);

  useEffect(() => {
    setMobileTab(modalInitialFocus);
  }, [selectedPsychologistId, modalInitialFocus]);

  const psychologist = psychologists.find((p) => p.id === selectedPsychologistId);

  return (
    <Modal
      isOpen={Boolean(psychologist)}
      onClose={closePsychologist}
      title={psychologist?.name}
      maxWidthClass="max-w-5xl"
    >
      {psychologist && (
        <div>
          {/* Mobile Compact Sticky Header + Segmented Tabs */}
          <div className="sticky top-0 z-10 border-b border-border-soft bg-surface/95 backdrop-blur-md px-4 pt-2 pb-3 lg:hidden space-y-3">
            <div className="flex items-center gap-3 pr-11">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage-strong text-sm font-bold text-ink">
                {psychologist.initials}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-serif text-lg font-bold text-ink">
                  {psychologist.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-ink-secondary">
                  <span className="truncate">{psychologist.approach}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-0.5 font-semibold text-ink shrink-0">
                    <Star className="h-3 w-3 fill-rating text-rating" />
                    {psychologist.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 rounded-xl bg-subtle p-1">
              <button
                type="button"
                onClick={() => setMobileTab('profile')}
                className={`min-h-[40px] rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  mobileTab === 'profile'
                    ? 'bg-surface text-ink shadow-xs'
                    : 'text-ink-secondary'
                }`}
              >
                Perfil y reseñas
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('booking')}
                className={`min-h-[40px] rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  mobileTab === 'booking'
                    ? 'bg-calm text-white shadow-xs'
                    : 'text-ink-secondary'
                }`}
              >
                Agendar sesión
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 grid gap-6 lg:gap-8 lg:grid-cols-12">
            {/* Left Column: Ethical Profile, Letter & Reviews */}
            <div
              className={`${
                mobileTab === 'profile' ? 'block' : 'hidden'
              } min-w-0 lg:block lg:col-span-7 space-y-5 sm:space-y-6`}
            >
              {/* Desktop Header */}
              <div className="hidden lg:flex items-start gap-4 pr-8">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sage-strong text-lg font-bold text-ink">
                  {psychologist.initials}
                </span>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary-hover">
                    {psychologist.approach}
                  </p>
                  <h2 className="font-serif text-3xl font-bold text-ink">
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

              {/* Mobile quick credentials row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-secondary lg:hidden">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-calm shrink-0" />
                  {psychologist.credentials}
                </span>
                {psychologist.instagramHandle && (
                  <span className="font-medium text-calm">{psychologist.instagramHandle}</span>
                )}
              </div>

              {/* Modalities & Communes */}
              <div className="flex flex-wrap items-center gap-2">
                {psychologist.tagLabels.map((lbl) => (
                  <Badge key={lbl} tone="sage">
                    {lbl}
                  </Badge>
                ))}
                <Badge tone="neutral">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {psychologist.communes.join(', ')} · {psychologist.modalities.join(' / ')}
                </Badge>
                <Badge tone="terracotta">{formatCLP(psychologist.priceClp)} / sesión</Badge>
              </div>

              {/* Presentation Letter */}
              <div className="rounded-2xl bg-subtle/80 p-4 sm:p-5 space-y-2">
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

              {/* Mobile CTA to switch directly to Booking tab */}
              <div className="lg:hidden rounded-2xl border border-border-soft bg-sage p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-base font-bold text-ink">{formatCLP(psychologist.priceClp)}</p>
                  <p className="text-[11px] font-medium text-primary-hover">Sin suscripciones mensuales</p>
                </div>
                <Button variant="primary" size="md" onClick={() => setMobileTab('booking')}>
                  <span>Elegir horario</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Button>
              </div>
            </div>

            {/* Right Column: Interactive Simulated Booking Flow */}
            <div
              className={`${
                mobileTab === 'booking' ? 'block' : 'hidden'
              } min-w-0 lg:block lg:col-span-5`}
            >
              <BookingFlow psychologist={psychologist} onCloseModal={closePsychologist} />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
