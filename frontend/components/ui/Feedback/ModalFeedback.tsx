interface Props {
  title: string;
  message?: string;
}

export function ModalFeedback({ title, message }: Props) {
  return (
    <div className="flex flex-col items-center size-ful pt-[80px] px-[24px] text-center gap-[16px]">
      <h1>{title}</h1>
      <h3>{message}</h3>
    </div>
  );
}
