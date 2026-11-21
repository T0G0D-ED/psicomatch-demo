export function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')} CLP`;
}

export function generateBookingCode(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `PM-${num}`;
}

export function formatTimeNow(): string {
  return new Date().toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
