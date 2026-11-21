import React, { useMemo, useState } from 'react';
import { CalendarCheck, CheckCircle2, Clock, ShieldCheck, Video, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Psychologist, SimulatedBooking } from '../../types';
import { formatCLP, generateBookingCode } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function BookingFlow({
  psychologist,
  onCloseModal,
}: {
  psychologist: Psychologist;
  onCloseModal: () => void;
}) {
  const { bookings, addBooking, setIsBookingsDrawerOpen } = useApp();

  const bookedSlotIds = useMemo(
    () =>
      new Set(
        bookings
          .filter((b) => b.psychologistId === psychologist.id)
          .map((b) => b.slotId)
      ),
    [bookings, psychologist.id]
  );

  const firstFreeSlot = psychologist.availableSlots.find(
    (s) => s.available && !bookedSlotIds.has(s.id)
  );

  const [selectedSlotId, setSelectedSlotId] = useState<string>(firstFreeSlot?.id ?? '');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<SimulatedBooking | null>(null);

  const selectedSlot = psychologist.availableSlots.find((s) => s.id === selectedSlotId);

  const handleQuickFill = () => {
    setPatientName('Camila Valenzuela');
    setPatientEmail('camila.valenzuela@ejemplo.cl');
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setErrorMsg('Selecciona un horario disponible para continuar.');
      return;
    }
    if (bookedSlotIds.has(selectedSlot.id)) {
      setErrorMsg('Ese horario acaba de ser reservado. Por favor elige otro.');
      return;
    }
    if (!patientName.trim() || !patientEmail.trim()) {
      setErrorMsg('Ingresa tu nombre y correo para simular la confirmación de reserva.');
      return;
    }

    const newBooking: SimulatedBooking = {
      id: `${Date.now()}-${selectedSlot.id}`,
      code: generateBookingCode(),
      psychologistId: psychologist.id,
      psychologistName: psychologist.name,
      psychologistApproach: psychologist.approach,
      slotId: selectedSlot.id,
      slotLabel: `${selectedSlot.dayLabel} · ${selectedSlot.timeLabel} hrs`,
      modality: selectedSlot.modality,
      commune: selectedSlot.commune,
      priceClp: psychologist.priceClp,
      sessionMinutes: psychologist.sessionMinutes,
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    addBooking(newBooking);
    setConfirmedBooking(newBooking);
  };

  if (confirmedBooking) {
    return (
      <div className="rounded-2xl border border-calm/30 bg-sage p-6 space-y-5 animate-fade-up">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-calm text-white">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-calm">
              Reserva simulada confirmada · {confirmedBooking.code}
            </p>
            <h3 className="font-serif text-xl font-bold text-ink">
              ¡Tu hora quedó agendada!
            </h3>
          </div>
        </div>

        <div className="rounded-xl bg-surface p-4 border border-border-soft space-y-2 text-sm">
          <p className="font-semibold text-ink">{confirmedBooking.psychologistName}</p>
          <p className="text-ink-secondary">
            Horario: <strong className="text-ink">{confirmedBooking.slotLabel}</strong> ({confirmedBooking.sessionMinutes} min)
          </p>
          <p className="text-ink-secondary">
            Modalidad:{' '}
            <strong className="text-ink">
              {confirmedBooking.modality}
              {confirmedBooking.commune ? ` (${confirmedBooking.commune})` : ''}
            </strong>
          </p>
          <p className="text-ink-secondary">
            Valor sesión: <strong className="text-ink">{formatCLP(confirmedBooking.priceClp)}</strong>
          </p>
          <p className="text-xs text-ink-secondary pt-1">
            Enviamos el comprobante simulado a <strong>{confirmedBooking.patientEmail}</strong>.
          </p>
        </div>

        <Badge tone="terracotta">Sin suscripciones mensuales · Pago único por sesión</Badge>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <Button
            variant="calm"
            size="md"
            fullWidth
            onClick={() => {
              onCloseModal();
              setIsBookingsDrawerOpen(true);
            }}
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Ver en Mis reservas</span>
          </Button>
          <Button variant="secondary" size="md" fullWidth onClick={onCloseModal}>
            Seguir explorando
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border-soft bg-canvas p-5 sm:p-6 space-y-5"
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-ink">Agendar sesión</h3>
          <p className="text-xs text-ink-secondary">
            Elige un día y horario disponible (simulación sin cobro real)
          </p>
        </div>
        <Badge tone="sage">
          <Clock className="h-3 w-3" />
          {psychologist.sessionMinutes} min
        </Badge>
      </div>

      {/* Available Slots Grid */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-ink">Horarios disponibles</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {psychologist.availableSlots.map((slot) => {
            const isTaken = bookedSlotIds.has(slot.id);
            const isSelected = selectedSlotId === slot.id && !isTaken;
            return (
              <button
                key={slot.id}
                type="button"
                disabled={isTaken}
                onClick={() => {
                  setSelectedSlotId(slot.id);
                  setErrorMsg('');
                }}
                className={`rounded-xl p-3 text-left transition-all border ${
                  isTaken
                    ? 'bg-subtle/60 border-border-soft text-ink-muted line-through cursor-not-allowed'
                    : isSelected
                    ? 'bg-calm text-white border-calm shadow-xs'
                    : 'bg-surface text-ink border-border-soft hover:border-calm'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{slot.dayLabel}</span>
                  <span>{slot.timeLabel} hrs</span>
                </div>
                <div
                  className={`mt-1 inline-flex items-center gap-1 text-[11px] ${
                    isSelected ? 'text-white/90' : 'text-ink-secondary'
                  }`}
                >
                  {slot.modality === 'Online' ? (
                    <Video className="h-3 w-3" />
                  ) : (
                    <MapPin className="h-3 w-3" />
                  )}
                  <span>
                    {slot.modality}
                    {slot.commune ? ` · ${slot.commune}` : ''}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Patient Info Inputs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-ink">Tus datos para la reserva</p>
          <button
            type="button"
            onClick={handleQuickFill}
            className="text-xs font-semibold text-calm hover:underline"
          >
            Rellenar datos demo
          </button>
        </div>

        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Nombre completo (ej. Camila Valenzuela)"
          aria-label="Tu nombre"
          className="w-full rounded-xl border border-border-soft bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-calm focus:outline-none"
        />
        <input
          type="email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          placeholder="Correo de confirmación (ej. camila@ejemplo.cl)"
          aria-label="Tu correo electrónico"
          className="w-full rounded-xl border border-border-soft bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-calm focus:outline-none"
        />
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Opcional: ¿hay algo breve que te gustaría contar antes de la sesión?"
          aria-label="Nota opcional para el especialista"
          className="w-full rounded-xl border border-border-soft bg-surface px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-calm focus:outline-none resize-none"
        />
      </div>

      {/* Session Summary Highlighting No Subscriptions */}
      <div className="rounded-xl border border-border-soft bg-surface p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-secondary">Resumen de sesión</span>
          <span className="font-bold text-ink">{formatCLP(psychologist.priceClp)}</span>
        </div>
        {selectedSlot ? (
          <p className="text-xs text-ink-secondary">
            {selectedSlot.dayLabel} a las {selectedSlot.timeLabel} hrs · {selectedSlot.modality}
            {selectedSlot.commune ? ` (${selectedSlot.commune})` : ''}
          </p>
        ) : (
          <p className="text-xs text-primary-hover">
            No quedan horarios libres en esta simulación (puedes liberar uno en Mis reservas).
          </p>
        )}
        <div className="pt-1">
          <Badge tone="terracotta">
            <ShieldCheck className="h-3.5 w-3.5" />
            Sin suscripciones mensuales · Solo pagas esta sesión
          </Badge>
        </div>
      </div>

      {errorMsg && (
        <p className="text-xs font-semibold text-primary-hover" role="alert">
          {errorMsg}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={!selectedSlot}>
        Confirmar reserva simulada
      </Button>
    </form>
  );
}
