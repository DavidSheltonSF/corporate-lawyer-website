import { Children, ReactNode, useState } from 'react';
import { CarouselButton } from './CarouselButton';

interface Props {
  children: ReactNode;
}

export function Carousel({ children }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const childrenCount = Children.count(children);
  const maxIndex = childrenCount - 1

  function moveRight() {
    if (slideIndex === maxIndex) {
      return;
    }

    setSlideIndex(slideIndex + 1);
  }

  function moveLeft() {
    if (slideIndex === 0) {
      return;
    }

    setSlideIndex(slideIndex - 1);
  }

  function handleTouchStart(e: React.TouchEvent<HTMLElement>) {
    const carousel = e.currentTarget;

    //first touch
    const touch = e.touches[0];

    //element position
    const boxRect = carousel.getBoundingClientRect();

    const xInside = touch.clientX - boxRect.left;

    setTouchStart(xInside);
    setTouchEnd(xInside);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLElement>) {
    const carousel = e.currentTarget;

    //first touch
    const touch = e.touches[0];

    //element position
    const carouselPosition = carousel.getBoundingClientRect();

    const xInside = touch.clientX - carouselPosition.left;

    setTouchEnd(xInside);
  }

  function handleTouchEnd() {
    if (touchEnd - touchStart > 50) {
      moveLeft();
    }

    if (touchStart - touchEnd > 50) {
      moveRight();
    }
  }

  return (
    <div className="relative flex items-center justify-center self-center w-full lg:w-[616px]">
      <div
        className="carousel-wrapper h-[580px] w-full md:w-[70%] lg:w-[400px] border border-color-secondary bg-black rounded-xl overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex size-full transition-[transform] duration-300"
          style={{
            transform: `translateX(calc(-${slideIndex} * 100%))`,
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
        <CarouselButton onClickHandler={moveLeft} inert={slideIndex === 0}>
          <img className="size-full" src="icons/arrow-back.svg" alt="" />
        </CarouselButton>
      </div>
      <div className={`absolute right-[8px] top-[50%] translate-y-[-50%]`}>
        <CarouselButton onClickHandler={moveRight} inert={slideIndex === maxIndex}>
          <img className="size-full" src="icons/arrow-forward.svg" alt="" />
        </CarouselButton>
      </div>
      <div className="absolute left-1/2 translate-x-[-50%] bottom-[16px] flex gap-[16px]">
        {Array.from({ length: childrenCount }).map((indicator, index) => {
          return (
            <div
              className={`size-[20px] transition-all duration-800 rounded-full cursor-pointer ${
                index === slideIndex ? 'bg-color-secondary brightness-110' : 'bg-gray-300 opacity-50'
              }`}
              onClick={() => {
                setSlideIndex(index)
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
