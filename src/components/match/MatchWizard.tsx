import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Info, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { matchQuestions } from '../../data/matchQuestions';
import type { MatchAnswers, MatchOption } from '../../types';
import { Button } from '../ui/Button';

export function MatchWizard() {
  const { matchAnswers, applyMatchAnswers, navigateTo } = useApp();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<MatchAnswers>(matchAnswers ?? {});

  const currentQuestion = matchQuestions[stepIndex];
  const currentAnswer = answers[currentQuestion.category];
  const progressPercent = Math.round(((stepIndex + 1) / matchQuestions.length) * 100);
  const isLastStep = stepIndex === matchQuestions.length - 1;

  const handleSelectOption = (option: MatchOption) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.category]: option,
    }));
  };

  const handleNext = () => {
    if (!currentAnswer) return;
    if (isLastStep) {
      applyMatchAnswers(answers);
    } else {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex === 0) {
      navigateTo('landing');
    } else {
      setStepIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigateTo('landing')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-secondary hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al inicio</span>
        </button>
        <button
          type="button"
          onClick={() => navigateTo('directory')}
          className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          Saltar e ir al directorio →
        </button>
      </div>

      <div className="rounded-[28px] border border-border-soft bg-surface p-6 sm:p-10 shadow-floating space-y-7 animate-fade-up">
        {/* Progress Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-primary-hover">
              <Sparkles className="h-3.5 w-3.5" />
              Orientación en lenguaje simple
            </span>
            <span className="text-xs font-semibold text-ink-secondary">
              Paso {stepIndex + 1} de {matchQuestions.length} · {progressPercent}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-sage">
            <div
              className="h-full rounded-full bg-calm transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink leading-tight">
            {currentQuestion.question}
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary">
            {currentQuestion.subtitle}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3" role="radiogroup" aria-label={currentQuestion.question}>
          {currentQuestion.options.map((option) => {
            const isSelected = currentAnswer?.id === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectOption(option)}
                className={`w-full rounded-2xl p-4 sm:p-5 text-left transition-all flex items-start gap-4 ${
                  isSelected
                    ? 'bg-sage border-2 border-calm shadow-xs'
                    : 'bg-canvas border border-border-soft hover:bg-subtle/70'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isSelected
                      ? 'border-calm bg-calm text-white'
                      : 'border-border-soft bg-surface'
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                </span>
                <div className="space-y-1">
                  <p className="text-sm sm:text-base font-semibold text-ink">
                    {option.label}
                  </p>
                  <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                    {option.helperText}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <Button variant="ghost" size="lg" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
            <span>{stepIndex === 0 ? 'Inicio' : 'Anterior'}</span>
          </Button>
          <Button
            variant="primary"
            size="lg"
            disabled={!currentAnswer}
            onClick={handleNext}
          >
            <span>
              {isLastStep ? 'Ver especialistas compatibles' : 'Continuar'}
            </span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Non-diagnostic Disclaimer */}
        <div className="flex items-start gap-2.5 rounded-xl bg-subtle/80 px-4 py-3 text-xs text-ink-secondary">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-calm" />
          <p>
            Esta orientación te ayuda a elegir profesional según tus preferencias; no constituye un diagnóstico clínico ni reemplaza atención médica de urgencia.
          </p>
        </div>
      </div>
    </section>
  );
}
