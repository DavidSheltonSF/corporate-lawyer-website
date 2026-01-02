interface Props {
  title: string;
}

export function DashboardCardSkeleton({ title }: Props) {
  return (
    <div
      className={`flex flex-col animate-pulse bg-color-primary-light h-[160px] rounded-xl py-[16px] flex-[0_1_300px]`}
    >
      <h1 className="ml-[24px] font-bold text-[1.5rem]">{title}</h1>
      <div className="flex flex-col gap-[16px] bg-color-primary h-[90%] px-[24px] py-[8px]">
        <span className="animate-pulse  w-full h-[16px] bg-gray-300"></span>
        <span className="animate-pulse  w-full h-[16px] bg-gray-300"></span>
      </div>
    </div>
  );
}
