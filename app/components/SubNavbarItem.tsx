import React from "react";
import styles from "./SubNavBar.module.css"

interface Props {
  index: number;
  name: string;
  selected: number
  setSelected: any
}

export function SubNavbarItem(props: Props) {
  const { index, name, selected, setSelected } = props

  function handleClick(e: React.MouseEvent<HTMLElement>){
    setSelected(index);
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLElement>) {
    const navItem = e.currentTarget;
    const navSelectionBar = navItem.querySelector(`.${styles.NavSelectionBar}`) as HTMLElement | null

    if (navSelectionBar && !isSelected) {
      navSelectionBar.classList.add(styles.Active)
    }
  }

  function handleMouseOut(e: React.MouseEvent<HTMLElement>) {
    const navItem = e.currentTarget; 
    const navSelectionBar = navItem.querySelector(`.${styles.NavSelectionBar}`)  as HTMLElement | null;

    if (navSelectionBar && !isSelected) {
      navSelectionBar.classList.remove(styles.Active)
    }
  
  }

  const isSelected = index === selected;
  return (
     <li className="flex flex-col justify-between items-between h-full" onClick={handleClick} onMouseOver={handleMouseEnter} onMouseOut={handleMouseOut}>
       <span className="text-color-white text-[24px] mt-[5px]">
        {name}
        </span>
      <span className={`bg-color-primary w-full h-[4px] appear-animation ${styles.NavSelectionBar} ${ isSelected ? styles.Active : ''}`}>
      </span>
    </li>
  )
}