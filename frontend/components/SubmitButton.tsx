import { useFormStatus } from 'react-dom';
import { Button } from './ui/Button/Button';
import { ButtonVariant } from './ui/Button/ButtonVariant';
import { LoadingMessage } from './LoadingMessage';

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant={ButtonVariant.PRIMARY} type="submit" className="w-full">
      {pending ? <LoadingMessage /> : 'Entrar'}
    </Button>
  );
}
