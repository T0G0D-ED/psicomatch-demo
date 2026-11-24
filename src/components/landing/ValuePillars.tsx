import { ArrowRight, Compass, HeartHandshake, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

export function ValuePillars() {
  const { navigateTo } = useApp();

  const pillars = [
    {
      step: '01 · ORIENTACIÓN',
      icon: Compass,
      title: 'Match Empático sin tecnicismos',
      desc: 'Traduce lo que estás sintiendo en 4 preguntas simples para sugerirte profesionales compatibles, sin jerga clínica.',
    },
    {
      step: '02 · TRANSPARENCIA',
      icon: HeartHandshake,
      title: 'Exposición ética y humana',
      desc: 'Conoce la carta de presentación de cada psicólogo, sus horarios reales, comunas en la V Región y valoraciones verificadas.',
    },
    {
      step: '03 · FLEXIBILIDAD TOTAL',
      icon: Sparkles,
      title: 'Sin contratos ni suscripciones',
      desc: 'Elige atención presencial u online según tu ritmo y presupuesto. Solo pagas la sesión que decides agendar.',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-3 pt-6 space-y-6 sm:px-6 sm:pt-10 sm:space-y-10 lg:px-8">
      {/* 3 Pillars */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {pillars.map(({ step, icon: Icon, title, desc }) => (
          <div
            key={step}
            className="rounded-2xl border border-border-soft bg-surface p-5 sm:p-6 shadow-card space-y-2.5 sm:space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary-hover">
                {step}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage text-calm">
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-ink">{title}</h3>
            <p className="text-sm leading-relaxed text-ink-secondary">{desc}</p>
          </div>
        ))}
      </div>

      {/* B2B Callout Strip */}
      <div className="rounded-2xl sm:rounded-[28px] bg-dark px-5 py-6 sm:px-10 sm:py-10 text-white">
        <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-sand">
              Para psicólogos independientes y recién egresados
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
              Pacientes perfilados, $0 costo fijo y solo 7% por sesión efectiva.
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              Si ejerces en Viña del Mar, Valparaíso, Quilpué, Quillota u online, únete sin pagar mensualidades ni competir por anuncios.
            </p>
          </div>
          <div className="shrink-0">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigateTo('b2b')}
            >
              <span>Soy Psicólogo · Postular</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
