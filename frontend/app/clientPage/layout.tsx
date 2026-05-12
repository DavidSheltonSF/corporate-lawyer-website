import { SelectedCaseProvider } from '@/contexts/cases/SelectedCaseProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <SelectedCaseProvider>{children}</SelectedCaseProvider>
    </div>
  );
}
