interface Props {
  iconPath: string;
  isOverParent?: boolean;
  additionalStyles?: string;
}

export function IconCircle(props: Props) {
  const { iconPath, isOverParent, additionalStyles } = props;

  function handleMouseOver(e: React.MouseEvent<HTMLElement>) {
    const iconImage = e.currentTarget.querySelector('.icon-image');
    iconImage?.classList.add('invertedImage');
  }

  function handleMouseOut(e: React.MouseEvent<HTMLElement>) {
    const iconImage = e.currentTarget.querySelector('.icon-image');
    iconImage?.classList.remove('invertedImage');
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-color-secondary  overflow-hidden mt-[16px] cursor-pointer ${
        isOverParent ? 'shadow-[var(--bright-yellow-shadow)]' : ''
      } ${additionalStyles}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <img
        className={`icon-image size-[68%] hover:invert  ${isOverParent ? 'invert' : ''}`}
        src={iconPath}
        alt=""
      />
    </div>
  );
}
