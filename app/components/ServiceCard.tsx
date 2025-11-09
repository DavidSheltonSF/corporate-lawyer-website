import { useState } from 'react';
import { IconCircle } from './IconCircle';

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
        <IconCircle iconPath={image} size="144px" isOverParent={isOver}/>

      </header>
      <main className="flex flex-col items-center text-center gap-[16px]">
        <h1 className="text-3xl font-bold mt-[16px]">{title}</h1>
        <p className="w-[92%] text-xl">{content}</p>
      </main>
    </article>
  );
}
