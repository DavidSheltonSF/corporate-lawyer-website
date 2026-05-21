interface Props {
  title?: string;
  processNumber?: string;
}

export function CaseModalHeader({ title, processNumber }: Props) {
  return (
    <header className="flex flex-col gap-[8px] w-full p-[24px] border-divider">
      <h1 className="text-3xl font-bold ">{title}</h1>
      <div className="flex flex-1">
        <span className="text-muted">nº {processNumber}</span>
      </div>
    </header>
  );
}
