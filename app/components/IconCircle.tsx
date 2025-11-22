import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { servicesDetails } from '../data/servicesDetails';

interface Props {
  serviceAreaId: string;
  isOverParent?: boolean;
  additionalStyles?: string;
}

export function IconCircle(props: Props) {
  const { serviceAreaId, isOverParent, additionalStyles } = props;

  const serviceArea = servicesDetails[serviceAreaId];
  const { iconPath } = serviceArea;

  const { setModalIsOpen, setServiceAreaId } = useContext<any | null>(ModalContext);

  function handleMouseOver(e: React.MouseEvent<HTMLElement>) {
    const iconImage = e.currentTarget.querySelector('.icon-image');
    iconImage?.classList.add('invertedImage');
  }

  function handleMouseOut(e: React.MouseEvent<HTMLElement>) {
    const iconImage = e.currentTarget.querySelector('.icon-image');
    iconImage?.classList.remove('invertedImage');
  }

  function handleClick() {
    setModalIsOpen(true);
    setServiceAreaId(serviceAreaId);
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-color-secondary  overflow-hidden cursor-pointer ${
        isOverParent ? 'shadow-[var(--bright-yellow-shadow)]' : ''
      } ${additionalStyles}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    >
      <img
        className={`icon-image size-[68%] hover:invert  ${isOverParent ? 'invert' : ''}`}
        src={iconPath}
        alt=""
        loading="lazy"
      />
    </div>
  );
}
