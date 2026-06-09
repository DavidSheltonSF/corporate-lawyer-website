import '@/styles/globals.css';
import '@/styles/animations.css';
import { ClientNavbar } from '@/components/layout/Navbar/ClientNavbar';
import { ModalRenderer } from '@/components/renderer/ModalRenderer';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClientNavbar />
      <ModalRenderer/>
      <main className="flex-1 p-[40px]">{children}</main>
    </>
  );
}
