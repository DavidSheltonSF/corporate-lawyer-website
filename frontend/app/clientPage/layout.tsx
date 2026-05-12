import { SelectedCaseProvider } from '@/contexts/cases/SelectedCaseProvider';
import { SelectedClientProvider } from '@/contexts/clients/SelectedClientProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <SelectedClientProvider>
        <SelectedCaseProvider>{children}</SelectedCaseProvider>
      </SelectedClientProvider>
    </div>
  );
}
