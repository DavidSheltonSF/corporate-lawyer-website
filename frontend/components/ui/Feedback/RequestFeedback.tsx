import { RequestState } from '@/types/RequestState';

interface Props {
  requestState: RequestState | null;
}

export function RequestFeedback({ requestState }: Props) {
  if (!requestState) {
    return null;
  }

  const { status, message } = requestState;

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
      {status === 'loading' ? 'Loading...' : message}
    </span>
  );
}
