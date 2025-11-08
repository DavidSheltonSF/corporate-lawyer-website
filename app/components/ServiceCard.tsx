interface Props {
  title: string;
  image: string;
  content: string;
}

export function ServiceCard(props: Props) {
  const {title, image, content} = props;

  return (
    <article className="flex flex-col w-[480px] h-[480px] border shrink-0">
      <header className="flex justify-center border">
        <div className="flex items-center justify-center rounded-full bg-color-secondary h-[160px] w-[160px] mt-[16px]">
          <img className="size-[50%]" src={image} alt="" />
        </div>
      </header>
      <main className="flex flex-col items-center text-center gap-[16px]">
        <h1 className="text-3xl font-bold mt-[16px]">{title}</h1>
        <p className="w-[92%]">
          {content}
        </p>
      </main>
    </article>
  );
}
