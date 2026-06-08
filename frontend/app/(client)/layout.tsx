import '@/styles/globals.css';
import '@/styles/animations.css';
import { ClientNavbar } from '@/components/layout/Navbar/ClientNavbar';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClientNavbar />
      <main className="flex-1">{children}</main>
    </>
  );
}
