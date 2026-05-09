interface Props {
  firstName: string;
  lastName: string;
}

export function ClientModalHeader({ firstName, lastName }: Props) {
  return (
    <header className="w-full bg-color-primary p-[16px] border-t border-white/50">
      <h1 className="text-3xl text-color-white font-bold ">
        {firstName} {lastName}
      </h1>
    </header>
  );
}
