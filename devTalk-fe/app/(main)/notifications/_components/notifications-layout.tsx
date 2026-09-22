type Props = {
  children: React.ReactNode;
};

export function NotificationsLayout({ children }: Props) {
  return (
    <div className="bg-background min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">{children}</div>
    </div>
  );
}
