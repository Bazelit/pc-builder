export default function BuildsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container mx-auto max-w-5xl">{children}</div>;
}
