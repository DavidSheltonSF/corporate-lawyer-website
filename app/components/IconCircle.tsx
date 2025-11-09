interface Props {
  iconPath: string;
  isOverParent?: boolean;
  size: string;
}

export function IconCircle(props: Props) {
  const { iconPath, isOverParent, size } = props;

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-color-secondary  overflow-hidden mt-[16px] cursor-pointer ${
        isOverParent ? 'shadow-[var(--bright-yellow-shadow)]' : ''
      }`}
      style={{ width: size, height: size }}
    >
      <img
        className={`size-[68%] hover:invert  ${isOverParent ? 'invert' : ''}`}
        src={iconPath}
        alt=""
      />
    </div>
  );
}
