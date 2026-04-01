interface Props {
  height: string;
  width: string;
  color?: string;
}

export function ArrowDropUp(props: Props) {
  const { height = '56px', width = '56px', color = 'black' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill={color}
    >
      <path d="m280-400 200-200 200 200H280Z" />
    </svg>
  );
}
