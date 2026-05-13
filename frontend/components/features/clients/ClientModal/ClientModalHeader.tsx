interface Props {
  firstName: string;
  lastName: string;
}

export function ClientModalHeader({ firstName, lastName }: Props) {
  return (
    <header className="w-full p-[16px] border-b border-black/50">
      <h1 className="text-3xl font-bold ">
        {firstName} {lastName}
      </h1>
    </header>
  );
}
