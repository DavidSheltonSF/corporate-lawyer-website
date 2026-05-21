interface Props {
  title: string;
  message?: string;
}

export function ModalFeedback({ title, message }: Props) {
  return (
    <div className="flex flex-col text-center gap-[16px] py-[16px]">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
