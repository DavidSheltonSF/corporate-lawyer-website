import Image from "next/image";

export default function loading() {
  return (
    <div className="bg-color-primary-light h-[100vh] flex justify-center items-center">
      <div className="size-[90px] overflow-hidden rounded-full bg-white">
        <Image src="/logo-loading.webp" priority alt="Icone de carregamento" />
      </div>
    </div>
  );
}
