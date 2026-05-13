interface Props {
  title: string;
  processNumber: string;
}

export function CaseCardHeader({ title, processNumber }: Props) {
  return (
    <header className="flex flex-col gap-[8px]">
      <h2 className="font-bold">{title}</h2>
      <span className="small-text opacity-70">nº {processNumber}</span>
    </header>
  );
}
