interface Props {
  id: string;
  name: string;
  defaultValue?: string;
  width: string;
  height: string;
  paddingX: string;
  paddingY: string;
}

export function Input(props: Props) {
  const {
    id,
    name,
    defaultValue,
    width = 'auto',
    height = '40px',
    paddingX = '8px',
    paddingY = '8px',
  } = props;
  return (
    <input
      className="border h-[40px] w-full rounded-sm px-[8px]"
      style={{
        width,
        height,
        paddingInline: paddingX,
        paddingBlock: paddingY,
      }}
      id={id}
      name={name}
      type="text"
      defaultValue={defaultValue}
    />
  );
}
