export function Footer() {
  return (
    <footer>
      <div className="flex flex-col h-[50vh] bg-color-primary">
        <div className="flex justify-center items-center h-[65%]">
          <img
            className="size-[240px]"
            src="/website-logo.webp"
            alt="Medeiros e Santiago"
            loading="lazy"
          />
        </div>
        <div className="flex justify-center items-center gap-[24px] lg:gap-[16px] h-[15%] border-y border-color-secondary">
          <a href="#">
            <img
              className="size-[40px]"
              src="/icons/instagram.svg"
              alt="Vá para nossa página do Instagram"
              loading="lazy"
            />
          </a>
          <a href="#">
            <img
              className="size-[40px]"
              src="/icons/facebook.png"
              alt="Vá para nossa página do Facebook"
              loading="lazy"
            />
          </a>
        </div>
        <div className="flex justify-center items-center gap-[24px] h-[20%] font-bold text-[var(--white-color)] text-[1rem]">
          <a href="#">privacidade</a>
          <a href="#">Contate-nos</a>
        </div>
      </div>
    </footer>
  );
}
