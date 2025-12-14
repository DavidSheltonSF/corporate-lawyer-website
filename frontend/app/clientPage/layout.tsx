export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return <div lang="en">
    {children}
    {modal}
  </div>;
}