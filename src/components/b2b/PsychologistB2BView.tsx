import React, { useState } from 'react';
import { ArrowLeft, Calculator, CheckCircle2, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { B2BApplication, Modality, ValparaisoCommune } from '../../types';
import { formatCLP } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const ALL_COMMUNES: ValparaisoCommune[] = [
  'Viña del Mar',
  'Valparaíso',
  'Quilpué',
  'Quillota',
];

export function PsychologistB2BView() {
  const { navigateTo, b2bApplications, addB2BApplication } = useApp();

  // Interactive 7% transparency calculator
  const [calcFee, setCalcFee] = useState(30000);
  const commission = Math.round(calcFee * 0.07);
  const psychologistReceives = calcFee - commission;

  // Simulated application form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [university, setUniversity] = useState('');
  const [selectedCommunes, setSelectedCommunes] = useState<ValparaisoCommune[]>(['Quilpué']);
  const [selectedModalities, setSelectedModalities] = useState<Modality[]>(['Online', 'Presencial']);
  const [suggestedPriceClp, setSuggestedPriceClp] = useState('30000');
  const [plainFocus, setPlainFocus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedApp, setSubmittedApp] = useState<B2BApplication | null>(null);

  const toggleCommune = (c: ValparaisoCommune) => {
    setSelectedCommunes((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const toggleModality = (m: Modality) => {
    setSelectedModalities((prev) =>
      prev.includes(m)
        ? prev.length > 1
          ? prev.filter((item) => item !== m)
          : prev
        : [...prev, m]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !registrationNumber.trim() || !plainFocus.trim()) {
      setErrorMsg('Completa tu nombre, correo, registro profesional y descripción en lenguaje simple.');
      return;
    }

    const app: B2BApplication = {
      id: `b2b-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      registrationNumber: registrationNumber.trim(),
      university: university.trim() || 'Universidad acreditada',
      communes: selectedCommunes,
      modalities: selectedModalities,
      suggestedPriceClp: Number(suggestedPriceClp) || 30000,
      plainFocus: plainFocus.trim(),
      createdAt: new Date().toISOString(),
    };

    addB2BApplication(app);
    setSubmittedApp(app);
    setErrorMsg('');
  };

  return (
    <section className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8 space-y-5 sm:space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => navigateTo('landing')}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-ink-secondary hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a pacientes</span>
        </button>
        {b2bApplications.length > 0 && (
          <Badge tone="sage">
            {b2bApplications.length} postulación{b2bApplications.length === 1 ? '' : 'es'} simulada{b2bApplications.length === 1 ? '' : 's'}
          </Badge>
        )}
      </div>

      {/* Main Dark Botanical B2B Value Prop Card */}
      <div className="overflow-hidden rounded-2xl sm:rounded-[28px] border border-border-soft bg-surface shadow-card">
        <div className="bg-dark px-4 py-6 sm:px-10 sm:py-10 text-white space-y-5 sm:space-y-6">
          <div className="max-w-3xl space-y-2">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-sand">
              Propuesta B2B · Región de Valparaíso
            </p>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Visibilidad ética y pacientes perfilados, sin costos fijos.
            </h1>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Pensado para psicólogos independientes y recién egresados. Alineamos incentivos: no pagas membresías ni publicidad; solo aplicamos una comisión del 7% por cada sesión agendada y efectiva.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="rounded-xl sm:rounded-2xl bg-sage p-3 sm:p-5 text-ink">
              <p className="font-serif text-xl sm:text-3xl font-bold">$0 CLP</p>
              <p className="mt-1 text-[11px] sm:text-xs font-medium text-ink-secondary leading-snug">
                Costo fijo mensual
              </p>
            </div>
            <div className="rounded-xl sm:rounded-2xl bg-sage p-3 sm:p-5 text-ink">
              <p className="font-serif text-xl sm:text-3xl font-bold">7%</p>
              <p className="mt-1 text-[11px] sm:text-xs font-medium text-ink-secondary leading-snug">
                Solo por sesión efectiva
              </p>
            </div>
            <div className="rounded-xl sm:rounded-2xl bg-sage p-3 sm:p-5 text-ink">
              <p className="font-serif text-xl sm:text-3xl font-bold">8–12</p>
              <p className="mt-1 text-[11px] sm:text-xs font-medium text-ink-secondary leading-snug">
                Sesiones promedio
              </p>
            </div>
          </div>
        </div>

        {/* Lower Split: Transparency Calculator + Onboarding Form */}
        <div className="grid gap-6 sm:gap-8 p-4 sm:p-10 lg:grid-cols-12">
          {/* Left: 7% Calculator & Ethical Benefits */}
          <div className="min-w-0 lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="rounded-2xl border border-border-soft bg-canvas p-4 sm:p-5 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Calculator className="h-4 w-4 text-calm" />
                <span>Simulador transparente (7%)</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="calc-fee" className="text-ink-secondary">
                    Tu tarifa por sesión:
                  </label>
                  <span className="font-bold text-ink">{formatCLP(calcFee)}</span>
                </div>
                <input
                  id="calc-fee"
                  type="range"
                  min={20000}
                  max={50000}
                  step={2000}
                  value={calcFee}
                  onChange={(e) => setCalcFee(Number(e.target.value))}
                  className="h-2 w-full accent-calm cursor-pointer"
                />
              </div>

              <div className="space-y-2 rounded-xl bg-surface p-3.5 sm:p-4 border border-border-soft text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Tú recibes (93%)</span>
                  <strong className="text-calm">{formatCLP(psychologistReceives)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Comisión PsicoMatch (7%)</span>
                  <span className="font-medium text-ink">{formatCLP(commission)}</span>
                </div>
                <div className="border-t border-border-soft pt-2 flex justify-between text-xs">
                  <span className="text-ink-secondary">Si no atiendes ese mes</span>
                  <strong className="text-primary-hover">$0 CLP</strong>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-ink-secondary">
              <div className="flex items-start gap-2.5">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-calm" />
                <span>
                  <strong className="text-ink">Pacientes ya orientados:</strong> llegan entendiendo tu enfoque antes de la primera sesión.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-calm" />
                <span>
                  <strong className="text-ink">Exposición ética:</strong> ordenamiento por compatibilidad humana, nunca por quién paga más en anuncios.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-calm" />
                <span>
                  <strong className="text-ink">Espacio para nuevos egresados:</strong> destaca tu formación y disponibilidad real en la V Región.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Pioneer Application Form */}
          <div className="min-w-0 lg:col-span-7">
            {submittedApp ? (
              <div className="rounded-2xl border border-calm/30 bg-sage p-5 sm:p-8 space-y-4 animate-fade-up">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-calm text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-calm">
                      Postulación simulada recibida
                    </p>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                      ¡Gracias por sumarte, {submittedApp.fullName}!
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Registramos tu postulación simulada en esta demo con tarifa sugerida de{' '}
                  <strong className="text-ink">{formatCLP(submittedApp.suggestedPriceClp)}</strong> (modelo 0% costo fijo · 7% por sesión efectiva).
                </p>
                <div className="rounded-xl bg-surface p-4 border border-border-soft text-xs text-ink-secondary space-y-1">
                  <p>
                    <strong>Registro:</strong> {submittedApp.registrationNumber} · {submittedApp.university}
                  </p>
                  <p>
                    <strong>Modalidades:</strong> {submittedApp.modalities.join(' y ')}
                  </p>
                  <p>
                    <strong>Comunas:</strong>{' '}
                    {submittedApp.communes.length > 0 ? submittedApp.communes.join(', ') : 'Solo Online'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <Button
                    variant="primary"
                    className="w-full sm:w-auto"
                    onClick={() => setSubmittedApp(null)}
                  >
                    Enviar otra postulación demo
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto"
                    onClick={() => navigateTo('directory')}
                  >
                    Ver directorio público
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                    Postula como especialista pionero
                  </h2>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Formulario simulado · No envía datos a servidores externos.
                  </p>
                </div>

                <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="b2b-name" className="text-xs font-semibold text-ink">
                      Nombre completo
                    </label>
                    <input
                      id="b2b-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Ps. Angélica González"
                      className="min-h-[44px] w-full rounded-xl border border-border-soft bg-canvas px-3.5 py-2.5 text-base sm:text-sm text-ink placeholder:text-ink-muted focus:border-calm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="b2b-email" className="text-xs font-semibold text-ink">
                      Correo profesional
                    </label>
                    <input
                      id="b2b-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="angelica@ejemplo.cl"
                      className="min-h-[44px] w-full rounded-xl border border-border-soft bg-canvas px-3.5 py-2.5 text-base sm:text-sm text-ink placeholder:text-ink-muted focus:border-calm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="b2b-sis" className="text-xs font-semibold text-ink">
                      N° Registro SIS
                    </label>
                    <input
                      id="b2b-sis"
                      type="text"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      placeholder="Ej. SIS 489120"
                      className="min-h-[44px] w-full rounded-xl border border-border-soft bg-canvas px-3.5 py-2.5 text-base sm:text-sm text-ink placeholder:text-ink-muted focus:border-calm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="b2b-uni" className="text-xs font-semibold text-ink">
                      Universidad de egreso
                    </label>
                    <input
                      id="b2b-uni"
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="Ej. UNAB / UV / PUCV"
                      className="min-h-[44px] w-full rounded-xl border border-border-soft bg-canvas px-3.5 py-2.5 text-base sm:text-sm text-ink placeholder:text-ink-muted focus:border-calm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-ink">Modalidad de atención</p>
                    <div className="flex gap-2">
                      {(['Online', 'Presencial'] as const).map((m) => {
                        const active = selectedModalities.includes(m);
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => toggleModality(m)}
                            className={`min-h-[44px] flex-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                              active
                                ? 'border-calm bg-sage text-ink'
                                : 'border-border-soft bg-canvas text-ink-secondary'
                            }`}
                          >
                            {m}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="b2b-price" className="text-xs font-semibold text-ink">
                      Tarifa sugerida por sesión (CLP)
                    </label>
                    <input
                      id="b2b-price"
                      type="number"
                      min={15000}
                      max={80000}
                      step={1000}
                      value={suggestedPriceClp}
                      onChange={(e) => setSuggestedPriceClp(e.target.value)}
                      className="min-h-[44px] w-full rounded-xl border border-border-soft bg-canvas px-3.5 py-2 text-base sm:text-sm text-ink focus:border-calm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-ink">
                    Comunas presenciales en Región de Valparaíso
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_COMMUNES.map((com) => {
                      const active = selectedCommunes.includes(com);
                      return (
                        <button
                          key={com}
                          type="button"
                          onClick={() => toggleCommune(com)}
                          className={`min-h-[38px] rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                            active
                              ? 'border-calm bg-calm text-white'
                              : 'border-border-soft bg-canvas text-ink-secondary hover:bg-subtle'
                          }`}
                        >
                          {com}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="b2b-focus" className="text-xs font-semibold text-ink">
                    ¿Cómo explicas tu enfoque a un paciente en palabras simples?
                  </label>
                  <textarea
                    id="b2b-focus"
                    rows={3}
                    value={plainFocus}
                    onChange={(e) => setPlainFocus(e.target.value)}
                    placeholder="Ej. Acompaño a jóvenes y adultos con ansiedad o sobrecarga, entregando herramientas prácticas desde la escucha cercana."
                    className="w-full rounded-xl border border-border-soft bg-canvas px-3.5 py-2.5 text-base sm:text-sm text-ink placeholder:text-ink-muted focus:border-calm focus:outline-none resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs font-semibold text-primary-hover" role="alert">
                    {errorMsg}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                  <span className="text-xs text-ink-secondary">
                    Sin pujas publicitarias · Validación ética de título
                  </span>
                  <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                    Enviar postulación simulada
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
