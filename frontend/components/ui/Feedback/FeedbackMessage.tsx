interface Props {
  status: 'error' | 'ok' | 'other';
  message?: string;
}

export function FeedbackMessage({ status, message }: Props) {
  switch (status) {
    case 'ok':
      return (
        <span className="text-[1.2rem] font-bold text-center text-[var(--color-green)]">
          {message || 'Operação concluída com sucesso!'}
        </span>
      );
    case 'error':
      return (
        <span className="text-[1.2rem] font-bold text-center text-[var(--color-red)]">
          {message}
        </span>
      );

    default:
      return <span className="text-[1.2rem] font-bold text-center">{message}</span>;
  }
}
