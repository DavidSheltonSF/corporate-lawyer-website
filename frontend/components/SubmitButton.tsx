import { useFormStatus } from 'react-dom';
import { Button } from './ui/Button/Button';
import { ButtonVariant } from './ui/Button/ButtonVariant';
import { LoadingMessage } from './LoadingMessage';

interface Props {
  label: string;
  loadingLabel: string;
}
export function SubmitButton({ label, loadingLabel }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button variant={ButtonVariant.PRIMARY} type="submit" className="w-full">
      {pending ? <LoadingMessage message={loadingLabel} /> : label}
    </Button>
  );
}
