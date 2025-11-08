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

  return (
    <div
      className={`drag-carousel-container flex items-center overflow-x-auto gap-[80px] no-scrollbar active:cursor-grab px-[80px] ${additionalStyles}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
