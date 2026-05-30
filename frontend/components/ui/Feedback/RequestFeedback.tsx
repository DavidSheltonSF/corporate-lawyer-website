import { RequestState } from '@/types/RequestState';
import { FeedbackMessage } from './FeedbackMessage';

interface Props {
  requestState: RequestState | null;
}

export function RequestFeedback({ requestState }: Props) {
  if (!requestState) {
    return null;
  }

  switch (requestState?.status) {
    case 'loading':
      return <FeedbackMessage status="other" message="Carregando..." />;

    case 'ok':
      return <FeedbackMessage status="ok" message={requestState.message} />;

    case 'error':
      return <FeedbackMessage status="error" message={requestState.message} />;

    default:
      return null;
  }
}
