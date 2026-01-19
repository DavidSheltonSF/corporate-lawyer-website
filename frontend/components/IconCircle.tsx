import { useContext } from 'react';
import { ServicesModalContext } from '../contexts/modals/ServicesModalContext';
import { servicesDetails } from '@/data/servicesDetails';

interface Props {
  serviceAreaId: string;
  additionalStyles?: string;
}

export function IconCircle(props: Props) {
  const { serviceAreaId, additionalStyles } = props;

  const serviceArea = servicesDetails[serviceAreaId];
  const { iconPath } = serviceArea;

  const { setIsOpen, setServiceAreaId } = useContext<any | null>(ServicesModalContext);

  function handleMouseOver(e: React.MouseEvent<HTMLElement>) {
    const iconImage = e.currentTarget.querySelector('.icon-image');
    iconImage?.classList.add('invertedImage');
  }

  function handleMouseOut(e: React.MouseEvent<HTMLElement>) {
    const iconImage = e.currentTarget.querySelector('.icon-image');
    iconImage?.classList.remove('invertedImage');
  }

  function handleClick() {
    setIsOpen(true);
    setServiceAreaId(serviceAreaId);
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-color-secondary  overflow-hidden cursor-pointer transition-[box-shadow] duration-400 ease-in-out  group-hover:shadow-[var(--bright-yellow-shadow)] ${additionalStyles}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    >
      <img
        className={`icon-image size-[68%] transition-[filter] duration-300 hover:invert  group-hover:invert`}
        src={iconPath}
        alt=""
        loading="lazy"
      />
    </div>
  );
}
