interface Props {
  status: 'error' | 'ok';
  message: string;
}

export function FeedbackMessage({ status, message }: Props) {
  let color = '';
  switch (status) {
    case 'ok':
      color = 'var(--color-green)';
      break;

    case 'error':
      color = 'var(--color-red)';
      break;

    default:
      color = 'black';
      break;
  }

  return (
    <span
      className="text-[1.2rem] font-bold text-center"
      style={{
        color,
      }}
    >
      {message}
    </span>
  );
}
