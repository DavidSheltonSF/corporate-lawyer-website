export function Navbar(){
  return <nav className="absolute top-0 flex justify-between items-center bg-color-black w-full h-[80px] px-[40px]">
    <div>
      <a href="#">
        <img className="size-[72px]" src="./website-logo-with-circle.png" alt="website-logo"/>
      </a>
    </div>
    <div>
      <ul className="flex items-center gap-[24px] text-color-white">
        <a href="#">Início</a>
        <a href="#">Contato</a>
        <a href="#">Blog</a>
        <a href="#">Página do Cliente</a>
      </ul>
    </div>
  </nav>
}