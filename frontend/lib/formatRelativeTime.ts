export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSeconds < 10) {
    return 'Agora mesmo';
  }

  if (diffSeconds < 60) {
    return `${diffSeconds} segundos atrás`;
  }

  const minutes = Math.floor(diffSeconds / 60);

  if (minutes < 60) {
    return `${minutes} ${minutes > 1 ? 'minutos' : 'minuto'} atrás`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${hours > 1 ? 'horas' : 'hora'} atrás`;
  }

  const days = Math.floor(hours / 24);

  return `${days} ${days > 1 ? 'days' : 'day'} atrás`;
}
