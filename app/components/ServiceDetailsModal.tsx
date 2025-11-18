import { useState } from "react";
import { ServiceDetails } from "../types/ServiceDetails";


export function ServiceDetailsModel({title, services}: ServiceDetails) {

  const [displayed, setDisplayed] = useState(true);

  function handleClickOk() {
    setDisplayed(false)
  }

  return (
    <div
      className={`flex flex-col fixed left-[50%] translate-x-[-50%] top-[10vh] lg:top-[15vh]  w-[80%] lg:w-[30rem] min-h-[25rem] rounded-xl p-[16px] text-color-white font-bold bg-color-black-dark border border-color-secondary ${!displayed ? 'hidden' : ''}`}
    >
      <h3 className="font-bold text-2xl self-center">{title}</h3>
      <div className="flex flex-col gap-[8px] my-[16px] size-full scroll-hidden p-[8px] rounded-xl">
        <p className="text-xl">Prestamos os seguintes serviços:</p>
        <ul className="flex list-disc list-inside flex-col gap-[8px]">
         {
          services.map((service, index) => {
            return <li key={index}>{service}</li>
          })
         }
        </ul>
      </div>
      <button className="self-end w-full lg:w-[88px] rounded-full lg:rounded-md bg-color-secondary text-color-black font-bold py-[8px] cursor-pointer hover:brightness-150"
      onClick={handleClickOk}>
        Ok
      </button>
    </div>
  );
}