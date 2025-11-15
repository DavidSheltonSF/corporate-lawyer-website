'use client';

import React, { ReactNode, useState } from 'react';

interface Props {
  additionalStyles: string;
  children: ReactNode;
}

export function DraggableCarousel({ additionalStyles, children }: Props) {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [inStart, setInStart] = useState(true);
  const [inEnd, setInEnd] = useState(false);

  const carouselContainer = document.querySelector('.drag-carousel-container') as HTMLElement;

  function handleMouseDown(e: React.MouseEvent<HTMLElement>) {
    setIsDown(true);
    setStartX(e.pageX - carouselContainer.offsetLeft);
    setScrollLeft(carouselContainer.scrollLeft);
  }

  function handleMouseUp() {
    setIsDown(false);
  }

  // Its important too.
  // Without this event handler, if the mouse leave the contaien while grabbing the container will keep active (isDown)
  function handleMouseLeave() {
    setIsDown(false);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!isDown) return;
    let x = e.pageX - carouselContainer.offsetLeft;
    let walk = (x - startX) * 1.5;
    carouselContainer.scrollLeft = scrollLeft - walk;
  }

  function checkPosition() {
    const currentScrollLeft = carouselContainer.scrollLeft;
    const visibleWidth = carouselContainer.clientWidth;
    const totalWidth = carouselContainer.scrollWidth;

    const isInStart = currentScrollLeft < 160;
    setInStart(isInStart ? true : false);

    const isInEnd = currentScrollLeft + 5 >= totalWidth - visibleWidth;
    setInEnd(isInEnd ? true : false);
  }

  return (
    <div className="relative w-full h-full">
      <div
        className={`drag-carousel-container flex items-center overflow-x-auto no-scrollbar active:cursor-grab ${additionalStyles}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onScroll={checkPosition}
      >
        {children}
      </div>
      <div
        className={`bounce-x-animation absolute left-[8px] top-[50%] translate-y-[-50%] ${
          inStart ? 'hidden' : ''
        }`}
      >
        <img className="size-[80px] max-md:size-[56px]" src="icons/arrow-back.svg" alt="" />
      </div>
      <div
        className={`bounce-x-animation absolute right-0 top-[50%] translate-y-[-50%] ${
          inEnd ? 'hidden' : ''
        }`}
      >
        <img className="size-[80px] max-md:size-[56px]" src="icons/arrow-forward.svg" alt="" />
      </div>
    </div>
  );
}
