import '@/styles/globals.css';
import '@/styles/animations.css';
import { PublicNavbar } from '@/components/layout/Navbar/PublicNavbar';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicNavbar />
      <main className="flex-1">{children}</main>
    </>
  );
}
