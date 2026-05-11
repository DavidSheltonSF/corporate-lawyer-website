interface Props {
  title: string;
  processNumber: string;
}

export function CaseCardHeader({ title, processNumber }: Props) {
  return (
    <header className="flex flex-col gap-[8px]">
      <h3 className="font-bold">{title}</h3>
      <span className="small-text opacity-70">nº {processNumber}</span>
    </header>
  );
}
