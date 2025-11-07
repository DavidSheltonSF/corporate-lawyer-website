import { SubNavbar } from './components/SubNavbar';
import { SubNavbarItem } from './components/SubNavbarItem';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans bg-color-white">
      <header className="w-full">
        <div className="flex items-end bg-[url(/hero-image.png)] w-full h-[728px] bg-cover bg-center">
          <h1 className="text-[64px] font-bold text-white w-[936px] ml-[160px] mb-[40px]">
            ESCRITÓRIO DE ADVOCACIA MEDEIROS E SANTIAGO
          </h1>
        </div>
      </header>
      <main className="w-full">
        <SubNavbar />
      </main>
    </div>
  );
}
