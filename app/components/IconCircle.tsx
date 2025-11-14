interface Props {
  iconPath: string;
  isOverParent?: boolean;
  additionalStyles?: string;
}

export function IconCircle(props: Props) {
  const { iconPath, isOverParent , additionalStyles} = props;

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-color-secondary  overflow-hidden mt-[16px] cursor-pointer ${
        isOverParent ? 'shadow-[var(--bright-yellow-shadow)]' : ''
      } ${additionalStyles}`}
    >
      <img
        className={`size-[68%] hover:invert  ${isOverParent ? 'invert' : ''}`}
        src={iconPath}
        alt=""
      />
    </div>
  );
}
