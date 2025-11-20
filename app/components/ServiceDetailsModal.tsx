interface Props {
  modalData: Record<string, any>;
}

export function ServiceDetailsModal({modalData }: Props) {

  const { title, services } = modalData;

  return (
    <div>
      <h3 className="font-bold text-2xl self-center">{title}</h3>
      <div className="flex flex-col gap-[8px] my-[16px] size-full scroll-hidden p-[8px] rounded-xl">
        <p className="text-xl">Prestamos os seguintes serviços:</p>
        <ul className="flex list-disc list-inside flex-col gap-[8px]">
          {services.map((service: any, index: number) => {
            return <li key={index}>{service}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
