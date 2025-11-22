import { Children, ReactNode, useState } from 'react';
import { CarouselButton } from './CarouselButton';

interface Props {
  children: ReactNode;
}

export function Carousel({ children }: Props) {
  const [index, setIndex] = useState(0);

  const maxIndex = Children.count(children) - 1;

  function moveRight() {
    if (index === maxIndex) {
      return;
    }

    setIndex(index + 1);
  }

  function moveLeft() {
    if (index === 0) {
      return;
    }

    setIndex(index - 1);
  }

  return (
    <div className="relative flex items-center justify-center self-center w-full lg:w-[616px]">
      <div className="h-[580px] w-full md:w-[70%] lg:w-[400px] border border-color-secondary bg-black rounded-xl overflow-hidden">
        <div
          className="flex size-full transition-[transform] duration-300"
          style={{
            transform: `translateX(calc(-${index} * 100%))`,
          }}
        >
          {Children.map(children, (child) => {
            return (
              <div className="flex justify-center items-center size-full shrink-0">{child}</div>
            );
          })}
        </div>
      </div>
      <div className={`absolute left-[8px] top-[50%] translate-y-[-50%]`}>
        <CarouselButton onClickHandler={moveLeft} inert={index === 0}>
          <img className="size-full" src="icons/arrow-back.svg" alt="" />
        </CarouselButton>
      </div>
      <div className={`absolute right-[8px] top-[50%] translate-y-[-50%]`}>
        <CarouselButton onClickHandler={moveRight} inert={index === maxIndex}>
          <img className="size-full" src="icons/arrow-forward.svg" alt="" />
        </CarouselButton>
      </div>
    </div>
  );
}
