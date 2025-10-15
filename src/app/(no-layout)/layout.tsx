function NoLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex flex-1">{children}</main>;
}
export default NoLayout;
