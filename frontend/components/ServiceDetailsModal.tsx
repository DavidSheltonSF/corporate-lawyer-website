import { servicesDetails } from '@/frontend/data/servicesDetails';

interface Props {
  serviceAreaId: string;
}

export function ServiceDetailsModal({ serviceAreaId }: Props) {
  const area = servicesDetails[serviceAreaId];
  return (
    <div>
      <h3 className="font-bold text-2xl self-center">{area?.title}</h3>
      <div className="flex flex-col gap-[8px] my-[16px] size-full scroll-hidden p-[8px] rounded-xl">
        <p className="text-xl">Prestamos os seguintes serviços:</p>
        <ul className="flex list-disc list-inside flex-col gap-[8px]">
          {area?.services.map((service: any, index: number) => {
            return <li key={index}>{service}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
