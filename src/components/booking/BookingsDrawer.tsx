import { CalendarCheck, MapPin, Trash2, Video } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCLP } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

export function BookingsDrawer() {
  const {
    isBookingsDrawerOpen,
    setIsBookingsDrawerOpen,
    bookings,
    cancelBooking,
    navigateTo,
  } = useApp();

  return (
    <Modal
      isOpen={isBookingsDrawerOpen}
      onClose={() => setIsBookingsDrawerOpen(false)}
      title="Mis reservas simuladas"
      maxWidthClass="max-w-2xl"
    >
      <div className="p-6 sm:p-8 space-y-6">
        <div className="space-y-1 pr-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-hover">
            Historial local de la demo
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Mis reservas simuladas ({bookings.length})
          </h2>
          <p className="text-sm text-ink-secondary">
            Guardadas localmente en tu navegador. Puedes cancelar cualquiera para liberar el horario.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-border-soft bg-canvas p-8 text-center space-y-4">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage text-calm">
              <CalendarCheck className="h-6 w-6" />
            </span>
            <div className="space-y-1">
              <p className="font-semibold text-ink">Aún no tienes sesiones agendadas</p>
              <p className="text-sm text-ink-secondary">
                Explora el directorio o realiza el Match Empático para simular tu primera reserva.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setIsBookingsDrawerOpen(false);
                navigateTo('directory');
              }}
            >
              Explorar especialistas
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-border-soft bg-canvas p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="match">{booking.code}</Badge>
                    <Badge tone="terracotta">Sin suscripciones</Badge>
                  </div>
                  <h3 className="text-base font-semibold text-ink">
                    {booking.psychologistName}
                  </h3>
                  <p className="text-xs text-ink-secondary">
                    {booking.slotLabel} · {formatCLP(booking.priceClp)} · Paciente: {booking.patientName}
                  </p>
                  <p className="inline-flex items-center gap-1 text-xs font-medium text-calm">
                    {booking.modality === 'Online' ? (
                      <Video className="h-3.5 w-3.5" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5" />
                    )}
                    <span>
                      {booking.modality}
                      {booking.commune ? ` · ${booking.commune}` : ''}
                    </span>
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => cancelBooking(booking.id)}
                  className="self-start sm:self-center text-primary-hover hover:bg-accent-soft"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Cancelar</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
