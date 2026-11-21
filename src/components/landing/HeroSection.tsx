import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { psychologists } from '../../data/psychologists';
import { formatCLP } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function HeroSection() {
  const { navigateTo, openPsychologist } = useApp();
  const featured = psychologists[0]; // Ps. Angélica González

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="rounded-[28px] bg-sage px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary-hover">
              Un espacio seguro · Región de Valparaíso
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-[1.12] tracking-tight text-ink">
              No tienes que llevártelo todo por dentro.
            </h1>
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-ink-secondary">
              Encuentra acompañamiento psicológico en lenguaje simple, sin etiquetas confusas ni tecnicismos. Atención online o presencial en{' '}
              <strong className="font-semibold text-ink">
                Viña del Mar, Valparaíso, Quilpué y Quillota
              </strong>
              , sin suscripciones mensuales.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button size="lg" variant="primary" onClick={() => navigateTo('match')}>
                <span>Hacer Match Empático (2 min)</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => navigateTo('directory')}>
                Explorar especialistas
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-medium text-ink-secondary">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-calm" />
                Profesionales verificados (SIS)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-calm" />
                Online y presencial V Región
              </span>
            </div>
          </div>

          {/* Right Column Trust Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border-soft bg-surface p-6 sm:p-7 shadow-card space-y-5">
              <Badge tone="terracotta">Personas antes que etiquetas</Badge>

              <div className="space-y-1.5">
                <h2 className="font-serif text-2xl font-semibold text-ink">
                  Tu puerta de entrada amable
                </h2>
                <p className="text-sm text-ink-secondary">
                  Te ayudamos a elegir especialista aunque no sepas qué área psicológica necesitas.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-ink-secondary">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-calm" />
                  <span>Orientación cotidiana sin diagnósticos ni términos clínicos complejos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-calm" />
                  <span>Flexibilidad total: presencial en tu comuna o videollamada privada.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-calm" />
                  <span>Sin contratos ni membresías mensuales: solo pagas tu sesión.</span>
                </li>
              </ul>

              {/* Clickable Featured Specialist Mini-Preview */}
              <button
                type="button"
                onClick={() => openPsychologist(featured.id)}
                className="w-full rounded-xl border border-border-soft bg-subtle/80 p-3.5 text-left hover:bg-sage/60 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-strong text-sm font-bold text-ink">
                    {featured.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                        {featured.name}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink shrink-0">
                        <Star className="h-3.5 w-3.5 fill-rating text-rating" />
                        {featured.rating}
                      </span>
                    </div>
                    <p className="truncate text-xs text-ink-secondary">
                      {featured.approach} · {featured.communes.join(' y ')} · {formatCLP(featured.priceClp)}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
