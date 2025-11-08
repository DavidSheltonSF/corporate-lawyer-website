import { useState } from 'react';

interface Props {
  title: string;
  image: string;
  content: string;
}

export function ServiceCard(props: Props) {
  const { title, image, content } = props;
  const [isOver, setIsOver] = useState(false);

  function handleMouseOver() {
    setIsOver(true);
  }

  function handleMouseLeave() {
    setIsOver(false);
  }

  return (
    <article
      className="flex flex-col w-[calc((100%-160px)/3)] h-[440px] shrink-0"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <header className="flex justify-center">
        <div
          className={`flex items-center justify-center rounded-full bg-color-secondary h-[144px] w-[144px] mt-[16px] hover:cursor-pointer ${
            isOver ? 'shadow-[var(--bright-yellow-shadow)]' : ''
          }`}
        >
          <img className={`size-[50%] ${isOver ? 'invert' : ''}`} src={image} alt="" />
        </div>
      </header>
      <main className="flex flex-col items-center text-center gap-[16px]">
        <h1 className="text-3xl font-bold mt-[16px]">{title}</h1>
        <p className="w-[92%] text-xl">{content}</p>
      </main>
    </article>
  );
}
