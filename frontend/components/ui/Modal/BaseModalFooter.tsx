import { Button } from '../Button/Button';
import { ButtonVariant } from '../Button/ButtonVariant';

interface Props {
  formId?: string;
  onConfirm?: () => void;
  onClose: () => void;
  closeText: string;
  confirmText: string;
  confirmButtonVariant: ButtonVariant;
}

export function BaseModalFooter(props: Props) {
  const { formId, onConfirm, onClose, confirmText, closeText, confirmButtonVariant } = props;

  const showConfirmButton = onConfirm || formId;

  return (
    <footer className="flex-1 py-[16px] px-[24px]">
      <div className="flex flex-col min-lg:flex-row justify-end items-center gap-[8px] min-lg:gap-[16px]">
        <Button className="hidden min-lg:block h-fit" variant={ButtonVariant.SECONDARY} onClick={() => onClose()}>
          {closeText}
        </Button>
        {showConfirmButton && (
          <Button
            className="w-full min-lg:w-fit h-fit"
            form={formId}
            type={formId ? 'submit' : 'button'}
            variant={confirmButtonVariant}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        )}
      </div>
    </footer>
  );
}
