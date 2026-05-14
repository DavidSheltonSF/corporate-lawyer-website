import { ModalRenderer } from '@/components/renderer/ModalRenderer';
import { AuthenticatedUserContext } from '@/contexts/AuthenticatedUserContext';
import { AuthenticatedUserProvider } from '@/contexts/AuthenticatedUserProvider';
import { SelectedCaseProvider } from '@/contexts/cases/SelectedCaseProvider';
import { SelectedClientProvider } from '@/contexts/clients/SelectedClientProvider';
import { ModalProvider } from '@/contexts/modals/ModalProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <AuthenticatedUserProvider>
        <ModalProvider>
          <ModalRenderer />
          <SelectedClientProvider>
            <SelectedCaseProvider>{children}</SelectedCaseProvider>
          </SelectedClientProvider>
        </ModalProvider>
      </AuthenticatedUserProvider>
    </div>
  );
}
