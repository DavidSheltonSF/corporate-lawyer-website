export function Footer() {
  return (
    <footer>
      <div className="flex flex-col h-[50vh] bg-color-primary">
        <div className="flex justify-center items-center h-[65%]">
          <img className="size-[240px]" src="website-logo.webp" alt="" />
        </div>
        <div className="flex justify-center items-center gap-[24px] lg:gap-[16px] h-[15%] border-y border-color-secondary">
          <a href="#">
            <img className="size-[40px]" src="icons/instagram.svg" alt="" />
          </a>
          <a href="#">
            <img className="size-[40px]" src="icons/facebook.png" alt="" />
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