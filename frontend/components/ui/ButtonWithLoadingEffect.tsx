import { Button } from './Button/Button';
import { ButtonVariant } from './Button/ButtonVariant';
import { LoadingMessage } from '../LoadingMessage';
import { PropsWithClassName } from '@/types/PropsWithClassName';

interface Props {
  label: string;
  loadingLabel: string;
  isLoading: boolean;
  onClick: () => void;
}
export function ButtonWithLoadingEffect({
  label,
  loadingLabel,
  isLoading,
  className,
  onClick,
}: PropsWithClassName<Props>) {
  return (
    <Button onClick={onClick} variant={ButtonVariant.PRIMARY} type="submit" className={className}>
      {isLoading ? <LoadingMessage message={loadingLabel} /> : label}
    </Button>
  );
}
