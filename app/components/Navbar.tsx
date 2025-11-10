import { NavbarItem } from './NavbarItem';

export function Navbar() {
  return (
    <nav className="absolute top-0 flex justify-between items-center bg-[var(--black-color)]/48 w-full h-[80px] px-[40px]">
      <div>
        <a href="#">
          <img className="size-[72px]" src="./website-logo-with-circle-72px.webp" alt="website-logo" />
        </a>
      </div>
      <div>
        <ul className="flex items-center justify-center gap-[24px] text-color-white text-[24px]">
          <NavbarItem name="Início" link="#" />
          <NavbarItem name="Contato" link="#" />
          <NavbarItem name="Blog" link="#" />
          <NavbarItem name="Página do Cliente" link="#" />
        </ul>
      </div>
    </nav>
  );
}
